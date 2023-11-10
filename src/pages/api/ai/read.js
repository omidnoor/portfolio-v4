import { queryPineconeVectorStoreAndQueryLLM } from "@/helper/api/pinecone/queryPineconeVectorStoreAndQueryLLM";
import { PineconeClient } from "@pinecone-database/pinecone";

export default async function handle(req, res) {
  try {
    console.log(`handle request from `);
    if (req.method !== "POST") {
      // Send 405 Method Not Allowed if a non-POST request is received
      return res.status(405).json({ error: "Method not allowed" });
    }
    console.log(`req.body: ${req}`);

    const indexName = process.env.PINECONE_INDEX || "";
    const { query } = req.body;
    console.log(`body: ${query}`);
    const client = new PineconeClient();
    await client.init({
      apiKey: process.env.PINECONE_API_KEY || "",
      environment: process.env.PINECONE_ENVIRONMENT || "",
    });

    console.log(`Calling queryPineconeVectorStoreAndQueryLLM`);

    const text = await queryPineconeVectorStoreAndQueryLLM(
      client,
      indexName,
      query,
    );

    console.log(`text: ${text}`);

    // Send the successful response back to the client
    return res.status(200).json({
      data: text,
    });
  } catch (error) {
    // Handle any errors that occurred during the process
    return res.status(500).json({ error: error.message });
  }
}
