import Contact from "@/models/contact";
import db from "@/lib/mongodb";
import { transporter, mailOptions } from "@/lib/nodemailer";

const CONTACT_MESSAGE_FIELD = {
  name: "Name",
  email: "Email",
  message: "Message",
};

const generateEmailContent = (data) => {
  const stringData = Object.entries(data).reduce((acc, [key, value]) => {
    return (acc += `${CONTACT_MESSAGE_FIELD[key]}: \n${value} \n \n`);
  }, "");

  const htmlData = Object.entries(data).reduce((acc, [key, value]) => {
    return (acc += `<h1 class="form-heading" style="color:#222;" align="left">${CONTACT_MESSAGE_FIELD[key]}</h1> <p class="form-answer" align="left">${value}</p> \n \n`);
  }, "");
  return {
    text: stringData,
    html: htmlData,
  };
};

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ status: 405, message: "Method Not Allowed" });

  const { name, email, message } = await req.body;
  try {
    await db.connectDb();
    await Contact.create({ name, email, message });
    console.log(req.body);

    // const mailOptions = {
    //   from: email,
    //   to: process.env.GMAIL_USER,
    //   subject: `New contact form submission from ${name}`,
    //   text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    //   replyTo: email,
    // };

    // const mailConfirmation = {
    //   from: process.env.GMAIL_USER,
    //   to: email,
    //   subject: "Thank you for contacting us",
    //   text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    // };

    try {
      await transporter.sendMail({
        ...mailOptions,
        ...generateEmailContent(req.body),
        subject: `New contact form submission from ${name}`,
      });
      res.status(200).json({
        status: 200,
        message: "Message sent successfully",
        success: true,
      });
    } catch (error) {
      console.log("error: ", error.message);
      return res.status(500).json({
        status: 500,
        message: error.message,
        success: false,
      });
    }

    // try {
    //   await transporter.sendMail({
    //     from: process.env.GMAIL_USER,
    //     to: email,
    //     subject: "Thank you for contacting us",
    //     text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    //     html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    //   });
    //   res.status(200).json({
    //     status: 200,
    //     message: "Message sent successfully",
    //     success: true,
    //   });
    // } catch (error) {
    //   console.log(error.message);
    //   return res.status(500).json({
    //     status: 500,
    //     message: error.message,
    //     success: false,
    //   });
    // }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
      success: false,
    });
  } finally {
    await db.disconnectDb();
  }
}
