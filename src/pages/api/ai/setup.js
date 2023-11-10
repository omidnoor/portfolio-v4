// pages/api/ai/setup.js

import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { PineconeClient } from "@pinecone-database/pinecone";
import { createPineconeIndex } from "@/helper/api/pinecone/createPineconeIndex";
import { updatePinecone } from "@/helper/api/pinecone/updatePinecone";

// This should be a default export function
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  // Assuming 'indexName' is provided as an environment variable or is statically defined
  const indexName = process.env.PINECONE_INDEX || "default_index_name";

  const loader = new DirectoryLoader("./documents", {
    ".txt": (path) => new TextLoader(path),
    ".pdf": (path) => new PDFLoader(path),
    ".json": (path) => new JSONLoader(path),
    ".md": (path) => new TextLoader(path),
  });

  try {
    console.log("Loading documents...");
    const docs = await loader.load();
    console.log(`Loaded ${docs.length} documents`);

    const vectorDimension = 1536;
    const client = new PineconeClient();

    console.log("Initializing Pinecone client...");
    await client.init({
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_ENVIRONMENT,
    });

    console.log("Creating Pinecone index...");
    await createPineconeIndex(client, indexName, vectorDimension);

    console.log("Updating Pinecone index...");
    await updatePinecone(client, indexName, docs);

    console.log("Pinecone index updated successfully");
    return res.status(200).json({
      message: `Successfully created index ${indexName} and updated ${docs.length} documents in Pinecone`,
    });
  } catch (error) {
    console.error("Error in setup API:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
