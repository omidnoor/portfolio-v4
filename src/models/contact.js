import { Schema, mongoose } from "mongoose";

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
    minLength: [3, "Name must be at least 3 characters"],
    maxLength: [50, "Name must be less than 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    // unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
    trim: true,
  },
  message: {
    type: String,
    required: [true, "Please add a message"],
    trim: true,
    minLength: [1, "Message must be at least 1 characters"],
    maxLength: [500, "Message must be less than 500 characters"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;
