export default async function handler(req, res) {
  const { content, chatId } = req.body;
  res.status(200).json({
    message: "Hello World!",
  });
}
