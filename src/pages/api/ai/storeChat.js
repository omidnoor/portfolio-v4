import db from "@/lib/mongodb";
import Chat from "@/models/chat";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ status: 405, message: "Method Not Allowed" });

  const { content, role } = await req.body;
  try {
    await db.connectDb();
    console.log(role);
    const chat = await Chat.create({ role, content });
    console.log(`chat ${chat}`);

    res.status(200).json({
      status: 200,
      message: "Message sent successfully",
      success: true,
    });
  } catch (error) {
    // console.log("error: ", error.message);
    return res.status(500).json({
      status: 500,
      message: error.message,
      success: false,
    });
  } finally {
    await db.disconnectDb();
  }
}
