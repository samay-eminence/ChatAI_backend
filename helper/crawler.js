const { chromium } = require("playwright");

const getLinkData = async (url, _id) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const mainUrl = new URL(url);
  const mainDomain = mainUrl.hostname;

  const visited = new Set();
  const routes = [];

  async function visitPage(url) {
    if (visited.has(url)) {
      return;
    }
    visited.add(url);

    const response = await page.goto(url,{timeout: 0});
    await response.finished();

    await page.waitForLoadState("networkidle");

    const currentRoutes = await page.$$eval("a", (links) => links.map((link) => link.href));

    // Filter and add routes that match the main URL domain and are not duplicates
    for (const route of currentRoutes) {
      try {
        const routeUrl = new URL(route);
        if (
          routeUrl.hostname === mainDomain &&
          !visited.has(route) &&
          !routes.some((r) => r.url === route) &&
          !route.includes("#")
        ) {
          console.log("Url",route);
          routes.push({ url: route, status: null, characterCount: null });
        }
      } catch (error) {
        console.error(`Invalid URL encountered: ${route}`);
      }
    }

    // Get page status and character count
    const pageStatus = await page.evaluate(() => ({
      characterCount: document.documentElement.textContent.length,
    }));

    const currentRoute = routes.find((r) => r.url === url);
    if (currentRoute) {
      currentRoute.status = response.status();
      currentRoute.characterCount = pageStatus.characterCount;
    }
    if (_id) {
      global.users.map((user) => {
        if (user.userId === _id.toString()) {
          global.io.to(user.socketId).emit("getLink", currentRoute);
        }
      });
    }

    // Recursive crawl for links found on the current page
    for (const route of currentRoutes) {
      if (routes.some((r) => r.url === route)) {
        await visitPage(route);
      }
    }
  }

  await visitPage(url);

  await browser.close();
  return routes;
};
module.exports = { getLinkData };
