import nodemailer from "nodemailer";


export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "backupshivam9@gmail.com",
    pass: "ioityiskymoaipnd",
  },
});