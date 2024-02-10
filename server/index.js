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

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-email-password",
  },
});

// Function to send email
const sendEmail = async (recipient, subject, htmlContent) => {
  try {
    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: "your-email@gmail.com",
      to: recipient,
      subject: subject,
      html: htmlContent,
    });

    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Example usage
const orderConfirmationEmail = `
  <p>Dear User,</p>
  <p>Your order has been confirmed by the seller. Thank you for shopping with us!</p>
  <p>Best regards,<br/>Your Shop</p>
`;

sendEmail("user@example.com", "Order Confirmation", orderConfirmationEmail);
// cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
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
