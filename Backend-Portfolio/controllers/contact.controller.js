import asyncHandler from "../utils/asyncHandler.js";
import Contact from "../models/contact.model.js";
import { transporter } from "../emailConfig.js";
import  ApiResponse  from "../utils/ApiResponse.js";

// POST /api/contact
export const sendMessage = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    throw new ApiError(400,"All fields are required");
  }

  // Save to DB
  const newMessage = await Contact.create({
    name,
    email,
    message,
  });

  // Send email notification
  await transporter.sendMail({
    from: email,
    to: process.env.EMAIL_USER,
    subject: `New Contact Message from ${name}`,
    text: message,
  });

  res.status(201).json(new ApiResponse(201,newMessage,"Message Sent Successfully"));
});