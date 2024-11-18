// import { Resend } from 'resend';
// import VerificationEmail from '@/verificationEmailTemp/Email-Template';
import { ApiResponse } from '@/types/ApiResponse';
import User from '@/models/User.model';
import nodemailer from "nodemailer" 

// this is mailtrap function
export async function sendEmailVerification(email: string, userId: string, verifyCode: string,username: string):Promise<ApiResponse>{
    
  try {
         
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS
      }
    });


   const mailOptions = {
      from: 'neemamwende009@gmail.com', // sender address
      to: email , // list of receivers
      subject: 'Feedback Website | Verification code', // Subject line
      text: "Hello world?", // plain text body
      html: `<div><h2>Hello, ${username} </h2>
      Thank you for registering. Please use the following verification code to complete your registration: <br>

      ${verifyCode}<br>

      copy OTP and paste into webpage
      
      </div>`, // html body
    }

      const expiryDate = new Date()
      expiryDate.setHours(expiryDate.getHours() + 1)

      await User.findByIdAndUpdate(userId,{
        $set: {
          verifyCode, verifyCodeExpiry: expiryDate
        }
      })

      const info = await transport.sendMail(mailOptions)
        
      return {success: true, message: "Verification email sent successfully"}
  } catch (error) {
      console.error("Error for sending email",error)
      return {success: false, message: "Failed to send email"}
  }
}