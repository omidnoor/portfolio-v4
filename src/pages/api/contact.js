import connectDB from "@/lib/mongodb";
import Contact from "@/models/contact";
import mongoose from "mongoose";
import db from "@/lib/mongodb";

export default async function handler(req, res) {
  const { name, email, message } = await req.body;

  try {
    await db.connectDb();

    await Contact.create({ name, email, message });

    res.status(200).json({
      status: 200,
      message: "Message sent successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
      success: false,
    });
  } finally {
    await db.disconnectDb();
  }
}
