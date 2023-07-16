const emailTemplate = (name, email, message) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
        }
        .email-container {
          width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 {
          color: #333;
        }
        .message {
          background-color: #f9f9f9;
          padding: 15px;
          margin: 10px 0;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <p>Hi ${name},</p>
        <p>Thank you for getting in touch with me and exploring my portfolio. I have received your message and am excited to read your thoughts and questions.</p>
        <div class="message">
          <p><strong>Here's a copy of your message for reference:</strong></p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        </div>
        <p>I will do my best to respond to your queries as soon as possible. Meanwhile, feel free to browse through my projects, LinkedIn and Github for more information.</p>
        <p>Looking forward to our conversation!</p>
        <p>Best Regards,<br>Omid</p>
      </div>
    </body>
    </html>
  `;
};

export default emailTemplate;
