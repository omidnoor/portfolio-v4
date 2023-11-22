import { Schema, mongoose } from "mongoose";

const chatSchema = new Schema({
  content: {
    type: String,
    trim: true,
    maxLength: [500, "Message must be less than 500 characters"],
  },
  role: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.models.chat || mongoose.model("chat", chatSchema);

export default Chat;
