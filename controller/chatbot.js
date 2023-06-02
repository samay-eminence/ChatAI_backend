const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { PineconeStore } = require("langchain/vectorstores/pinecone");
const { createIndex } = require("../helper/pineconeClient");
const {getLinkData} = require("../helper/crawler")
const crawledUrl = require("../model/crawlData");
const { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } = require("../config");
const { getWebPageContent } = require("../helper/webLoader");


const ingestData = async (req, res) => {

    const {urls} = req.body;
  try {
   
    
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }
    const type = "web";
    let docs = [];

    // load web content

    // for (var i = 0, l = data; i < l; i++) 

    if (type === "web") {
      for (let url of urls) {
        for (let i = 0; i < url.links.length; i++) {
          
          docs = await getWebPageContent(url.links[i]);
           console.log("creating vector store...");
    /*create and store the embeddings in the vectorStore*/
    const embeddings = new OpenAIEmbeddings();
    const index = await createIndex(PINECONE_INDEX_NAME); //change to your own index name
    //embed the PDF documents
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      namespace: PINECONE_NAME_SPACE,
      textKey: "text",
    });
        }
      }    
     
      
     
      
    }
   


   
    return res.status(200).json({ status: true, message: "Ingested Successfully!", data: docs });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { ingestData };
