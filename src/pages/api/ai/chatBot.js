import { HNSWLib } from "langchain/vectorstores/hnswlib";
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
    // const textSplitter = new RecursiveCharacterTextSplitter({
    //   chunkSize: 1000,
    // });
    // const docs = await textSplitter.createDocuments([aboutmeContent]);
    const embeddings = new OpenAIEmbeddings();
    // await PineconeStore.fromDocuments(docs, embeddings, {
    //   pineconeIndex,
    // });
    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex,
    });
    const vectorStoreRetriever = vectorStore.asRetriever();
    const SYSTEM_TEMPLATE = `You are Omid's personal assitant that can answer questions about him. Use the following pieces of context to answer the question at the end. He is a freelance software developer. Be positive and promote him to the potential clients and recruiters. Do not answer questions with very long sentences, be concise as much as possible but informative. If it is needed use lists, short terms. Be witty and encourage others to answer questions.
      If you don't know the answer, just say that you don't know, don't try to make up an answer.
      ----------------
      {context}`;

    const model = new ChatOpenAI({
      modelName: "gpt-4",
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
    const answer = await chain.invoke(content);
    res.status(200).json({ content: answer });

    // res.status(200).json({ content: response.text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
