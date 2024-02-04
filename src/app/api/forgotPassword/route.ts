import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const body = await req.json()
  console.log(body)
    // Validate email (add your validation logic)
  
  //   const token = generateToken(); // Implement your token generation logic
    const resetLink = `http://localhost:44367/api/Identity/getpasswordresettoken/3790e4a6-3b85-4222-9a98-b73da9ed099b`;
  
    const transporter = nodemailer.createTransport({
      // Configure your email service
    });
  
    const mailOptions = {
      from: 'your-email@example.com',
      to: body,
      subject: 'Password Reset',
      text: `Click the link to reset your password: ${resetLink}`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      
    } catch (error) {
      console.error(error);
     
    }
  }
  