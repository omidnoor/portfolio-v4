import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/llm_chain";

export const queryPineconeVectorStoreAndQueryLLM = async (
  client,
  indexName,
  question,
) => {
  // 1. Start query process
  console.log(`Querying Pinecone vector store...`);
  // 2. Retrive Pinecone Index
  console.log(`Retrieving index from Pinecone ${indexName} `);
  console.log(` client: ${client}`);
  const index = await client.Index(indexName);
  console.log(` index: ${index}`);
  // 3. Create query embedding
  console.log(`Creating query embedding...`);
  const queryEmbedding = await new OpenAIEmbeddings().embedQuery(question);
  // 4. Query Pinecone index and return top 5 matrices
  let queryResponse = await index.query({
    queryRequest: {
      vector: queryEmbedding,
      topK: 5,
      includeMetadata: true,
      includeVectors: true,
    },
  });
  // 5. Log the number of matches found in the query response
  console.log(
    `Querying Pinecone vector store returned ${queryResponse.matches.length} matches`,
  );
  // 6. Log the question being asked
  console.log(`Question being asked: ${question}`);
  // if (queryResponse.matches.length > 0) {
  // 7. Create an OpenAI instance and load the QAStuffChain
  const model = new ChatOpenAI({ temperature: 0.9, streaming: true });
  const prompt = PromptTemplate.fromTemplate(question);
  const chain = new LLMChain({ llm: model, prompt });
  const res = await chain.call({});
  // const chain = loadQAStuffChain(model);
  // 8. Extract and concatenate the page content from matched documents
  const concatenatedPageContent = queryResponse.matches
    .map((match) => match.metadata.pageContent)
    .join(" ");
  const result = await chain.call({
    input_documents: [
      new Document({
        pageContent: concatenatedPageContent,
      }),
    ],
    question: question,
  });
  console.log(`Response: ${result}`);
  return result.text;
  // } else {
  //   console.log("No matches found");
  //   return "No matches found";
  // }
};
