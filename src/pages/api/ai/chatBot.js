import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import * as fs from "fs";

import { StringOutputParser } from "langchain/schema/output_parser";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { formatDocumentsAsString } from "langchain/util/document";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "langchain/schema/runnable";
import { aboutmeContent } from "@/stores/aboutme";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method Not Allowed" });
      return;
    }
    const { chatId, role, content, isFirstMessage } = req.body;
    if (!content || !chatId || !role) {
      res.status(400).json({ error: "Bad Request" });
      return;
    }
    const client = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_ENVIRONMENT,
    });

    const pineconeIndex = client.Index(process.env.PINECONE_INDEX);
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
    });
    const docs = await textSplitter.createDocuments([aboutmeContent]);
    const embeddings = new OpenAIEmbeddings();
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex,
    });
    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex,
    });
    const vectorStoreRetriever = vectorStore.asRetriever();
    // const SYSTEM_TEMPLATE = `You are MemoAI, Omid's personal assitant that can answer questions about him. Use the following pieces of context to answer the question at the end. He is a freelance software and AI developer and. Be positive and promote him to the potential clients and recruiters. Do not answer questions with very long sentences, be concise as much as possible but informative. If it is needed use lists, short terms. Be witty and funny.
    //   If you don't know the answer, just say that you don't know, don't try to make up an answer.
    //   ----------------
    //   {context}`;

    const SYSTEM_TEMPLATE = `You are MemoAI, Omid's personal assistant. Your responses should be creative, engaging, and formatted using HTML and CSS for better readability and presentation in a chat interface. Use lists, short phrases, and appropriate styling to make the content visually appealing and easy to read. Be positive and promote Omid to potential clients and recruiters. Keep your answers concise, informative, and, if appropriate, witty and funny. If you don't know the answer, say so honestly. 

Example of a formatted response:
"<div style='color: blue;'>
    <p>Omid is an expert in <strong>software and AI development</strong>.</p>
    <ul>
        <li>Proficient in multiple programming languages</li>
        <li>Experienced in AI and machine learning</li>
    </ul>
</div>"

----------------
{context}`;

    const model = new ChatOpenAI({
      modelName: "gpt-4-1106-preview",
    });

    const messages = [
      SystemMessagePromptTemplate.fromTemplate(SYSTEM_TEMPLATE),
      HumanMessagePromptTemplate.fromTemplate("{question}"),
    ];
    const prompt = ChatPromptTemplate.fromMessages(messages);

    const chain = RunnableSequence.from([
      {
        context: vectorStoreRetriever.pipe(formatDocumentsAsString),
        question: new RunnablePassthrough(),
      },
      prompt,
      model,
      new StringOutputParser(),
    ]);
    // console.log(chain);
    let answer = await chain.invoke(content);
    answer = formatResponse(answer);
    console.log(answer);
    res.status(200).json({ content: answer });

    // res.status(200).json({ content: response.text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const formatResponse = (response) => {
  // Splitting by sentences or fixed length - basic example
  const sentences = response.match(/[^\.!\?]+[\.!\?]+/g) || [response];
  return sentences.join("\n\n");
};
