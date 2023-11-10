import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export const updatePinecone = async (client, indexName, docs) => {
  // 1. Retrive Pinecone Index
  const pineconeIndex = client.Index(indexName);
  // 2. Log the retieved index name
  console.log("Pinecone Index: " + indexName);
  // 3. Process each document in the docs array
  for (const doc of docs) {
    console.log("Processing document " + doc.metadata.source);
    // 4. Create a document
    const textPath = doc.metadata.source;
    const text = doc.pageContent;
    // 5. Create a recursiveChracterTextSplitter instance
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 50,
    });
    console.log("Splitting character into chunks...");
    // 6. Split the text into chunks
    const chunks = await textSplitter.createDocuments([text]);
    console.log(`Text splitted into chunks: ${chunks.length}`);
    console.log(
      `Calling OpenAI Embedding endpoint documents with ${chunks.length} text chunks...`,
    );
    // 7. Create OpenAI embeddings for documents
    const embeddingsArray = await new OpenAIEmbeddings({}).embedDocuments(
      chunks.map((chunk) => chunk.pageContent.replace(/\n/g, " ")),
    );

    console.log(
      `Creating ${chunks.length} embedding vectors with id, and metadata...`,
    );

    // 8 Create and upsert vectors in batches of 100
    const batchSize = 100;
    let batch = [];
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const vector = {
        id: `${textPath}_${i}`,
        values: embeddingsArray[i],
        metadata: {
          ...chunk.metadata,
          loc: JSON.stringify(chunk.metadata.loc),
          pageContent: chunk.pageContent,
          textPath: textPath,
        },
      };
      batch = [...batch, vector];
      if (batch.length === batchSize || i === chunks.length - 1) {
        await pineconeIndex.upsert({
          upsertRequest: {
            vectors: batch,
          },
        });
        batch = [];
      }
    }
  }
};
