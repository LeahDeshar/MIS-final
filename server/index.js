import express from "express";
import colors from "colors";
import { rateLimit } from "express-rate-limit";

import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/config.js";
import router from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import categoryRouter from "./routes/categoryRoute.js";
import orderRouter from "./routes/orderRoutes.js";
import helmet from "helmet";
import nodemailer from "nodemailer";
import ExpressMongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import Stripe from "stripe";
const app = express();
app.use(cors({ origin: "http://192.168.1.3" }));
app.use(helmet());
app.use(ExpressMongoSanitize());
dotenv.config();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "johndoetree67@gmail.com",
//     pass: "fourtyOnef0urty2",
//   },
// });

// // Function to send email
// const sendEmail = async (recipient, subject, htmlContent) => {
//   try {
//     // Send mail with defined transport object
//     const info = await transporter.sendMail({
//       from: "johndoetree67@gmail.com",
//       to: recipient,
//       subject: subject,
//       html: htmlContent,
//     });

//     console.log("Email sent: " + info.response);
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };

// // Example usage
// const orderConfirmationEmail = `
//   <p>Dear User,</p>
//   <p>Your order has been confirmed by the seller. Thank you for shopping with us!</p>
//   <p>Best regards,<br/>Your Shop</p>
// `;

// sendEmail("user@example.com", "Order Confirmation", orderConfirmationEmail);
// // cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// export default class Email {
//   constructor(user, url) {
//     this.to = user.email;
//     this.firstName = user.name.split(" ")[0];
//     this.url = url;
//     this.from = `Jonas Schmedtmann <${process.env.EMAIL_FROM}>`;
//   }

//   newTransport() {
//     if (process.env.NODE_ENV === "production") {
//       // Sendgrid
//       return nodemailer.createTransport({
//         service: "SendGrid",
//         auth: {
//           user: "johndoetree67@gmail.com",
//           pass: "fourtyOnef0urty2",
//         },
//       });
//     }

//     return nodemailer.createTransport({
//       host: "smtp.mailtrap.io",
//       port: 25,
//       auth: {
//         user: "johndoetree67@gmail.io",
//         pass: "fourtyOnef0urty2",
//       },
//     });
//   }

//   // Send the actual email
//   async send(subject, message) {
//     // Define email options
//     const mailOptions = {
//       from: this.from,
//       to: this.to,
//       subject,
//       text: message,
//     };
//     try {
//       // Create a transport and send email
//       await this.newTransport().sendMail(mailOptions);
//       console.log("Email sent successfully!");
//     } catch (error) {
//       console.error("Error sending email:", error);
//     }

//     // Create a transport and send email
//     // await this.newTransport().sendMail(mailOptions);
//   }

//   async sendWelcome() {
//     await this.send(
//       "Welcome to the Natours Family!",
//       `Hello ${this.firstName},\nWelcome to our community. We are excited to have you with us.`
//     );
//   }

//   async sendPasswordReset() {
//     await this.send(
//       "Password Reset Request",
//       `Hi ${this.firstName},\nPlease click on the following link to reset your password: ${this.url}\nIf you did not request this, please ignore this email.`
//     );
//   }
// }
connectDB();

// stripe configuration
export const stripe = new Stripe(process.env.STRIPE_API_SCERET);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/v1/user", router);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/order", orderRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} on ${process.env.NODE_ENV} mode`.bgCyan
      .white
  );
});
