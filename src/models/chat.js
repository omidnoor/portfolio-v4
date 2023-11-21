import { Schema, mongoose } from "mongoose";

const chatSchema = new Schema({
  chat: {
    type: String,
    // required: [true, "Please add a message"],
    trim: true,
    // minLength: [1, "Message must be at least 1 characters"],
    maxLength: [500, "Message must be less than 500 characters"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.models.Contact || mongoose.model("Contact", chatSchema);

export default Chat;
