import asyncHandler from "../utils/asyncHandler.js";
import Contact from "../models/contact.model.js";
import { resend } from "../emailConfig.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { buildContactEmail } from "../emailTemplate.js";

// POST /api/contact
export const sendMessage = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    throw new ApiError(400, "All fields are required");
  }

  // Save to DB
  const newMessage = await Contact.create({ name, email, message });

  // Send HTML email notification via Resend
  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: [process.env.RESEND_TO_EMAIL],
    reply_to: email,
    subject: `⚡ New Payload from ${name}`,
    html: buildContactEmail({ name, email, message }),
  });

  if (error) {
    console.error("Resend error:", error);
    // Still respond 201 since DB save succeeded; email failure is non-fatal
  }

  res
    .status(201)
    .json(new ApiResponse(201, newMessage, "Message Sent Successfully"));
});