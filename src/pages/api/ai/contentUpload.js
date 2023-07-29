import { CharacterTextSplitter } from "langchain/text_splitter";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeClient } from "@pinecone-database/pinecone";

export default async function (req, res) {
  if (req.method === "POST") {
    try {
      const aboutmeContent = req.body;
      if (!aboutmeContent) {
        return res.status(400).json({ message: "No Content" });
      }
      const splitter = new CharacterTextSplitter({
        separator: " ",
        chunkSize: 250,
        chunkOverlap: 30,
      });

      const splitTexts = await splitter.splitText(aboutmeContent);

      const client = new PineconeClient();

      await client.init({
        apiKey: process.env.PINECONE_API_KEY,
        environment: process.env.PINECONE_ENVIRONMENT,
      });
      const pineconeIndex = client.Index(process.env.PINECONE_INDEX);
      await PineconeStore.fromTexts(splitTexts, {}, new OpenAIEmbeddings(), {
        pineconeIndex,
      });
      console.log("Successfully uploaded to DB");
      return res.status(200).json({
        result: "Successfully uploaded to DB",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
