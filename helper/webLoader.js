const { PlaywrightWebBaseLoader } = require("langchain/document_loaders/web/playwright");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { convert } = require("html-to-text");
const {Document} = require("langchain/document")
const {CharacterTextSplitter} = require("langchain/text_splitter");


const getWebPageContent = async (url) => {

    

  const loader = new PlaywrightWebBaseLoader(url, {
    launchOptions: {
      headless: true,
    },
    gotoOptions: {
      waitUntil: "domcontentloaded",
    },
  });

  const rawDocs = await loader.load();/**
  * Loader uses `page.content()`;
  * as default evaluate function
  **/
  

  
  
 
  const html = `${rawDocs[0].pageContent}`;

  // console.log("RawwwwData",html);
  const text = convert(html);
  console.log("data---------",typeof(text));
  

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 2000,
    chunkOverlap: 200,
  });
  
  const docOutput = await splitter.splitDocuments([
    new Document({ pageContent: text }),
  ]);

  // console.log("gjhfghdsafg",docOutput);


 
  return docOutput;
};

module.exports = { getWebPageContent };
