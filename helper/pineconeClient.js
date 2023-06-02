const { PineconeClient } = require("@pinecone-database/pinecone");

if (!process.env.PINECONE_ENVIRONMENT || !process.env.PINECONE_API_KEY) {
  throw new Error("Pinecone environment or api key vars missing");
}

async function createIndex(index) {
  try {
    const pinecone = new PineconeClient();

    await pinecone.init({
      environment: process.env.PINECONE_ENVIRONMENT ?? "", //this is in the dashboard
      apiKey: process.env.PINECONE_API_KEY ?? "",
    });
    console.log(process.env.PINECONE_ENVIRONMENT, "++++++", process.env.PINECONE_API_KEY);
    return pinecone.Index(index);
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to initialize Pinecone Client");
  }
}

module.exports = { createIndex };
