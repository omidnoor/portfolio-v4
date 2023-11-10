export const createPineconeIndex = async (
  client,
  indexName,
  vectorDimension,
) => {
  console.log("createPineconeIndex called, creating index " + indexName);
  const existingIndexes = await client.listIndexes();

  if (!existingIndexes.includes(indexName)) {
    await client.createIndex({
      createRequest: {
        name: indexName,
        dimension: vectorDimension,
        metric: "cosine",
        waitUntilReady: true,
      },
    });
  } else {
    console.log(`Index ${indexName} already exists,`);
  }
};
