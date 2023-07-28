import { PineconeClient } from "@pinecone-database/pinecone";
import { VectorDBQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method Not Allowed" });
      return;
    }
    const { chatId, role, content, isFirstMessage } = req.body;
    // console.log(chatId, role, content, isFirstMessage);
    if (!content || !chatId || !role) {
      res.status(400).json({ error: "Bad Request" });
      return;
    }
    const client = new PineconeClient(process.env.PINECONE_API_KEY);
    await client.init({
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_ENVIRONMENT,
    });
    const pineconeIndex = client.Index(process.env.PINECONE_INDEX);
    const model = new OpenAI();

    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings(),
      {
        pineconeIndex,
      },
    );

    const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
      k: 8,
      // returnSourceDocuments: true,
    });

    const response = await chain.call({
      query: content,
    });
    // console.log(" response: ", response);
    res.status(200).json({ content: response.text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
