import User from "@/models/User.model";
import { dbConnection } from "@/lib/dbConfig";
import bcrypt from "bcryptjs" 
import { sendEmailVerification } from "@/lib/resend"; 

export async function POST(request:Request) {
    await dbConnection() 

    try {
       
        const {username,email,password} = await request.json()

        //check unique username
        const checkVerifiedUserByUsername = await User.findOne({username})

        if (checkVerifiedUserByUsername) {
            return Response.json({
                success: false,
                message: "Username is already taken or Unverified"
            },{
                status: 400
            })
        }

        //check already registered user
        const checkVerifiedUserByEmail = await User.findOne({email})

           // this is method to store 6 digit code of OTP
            let number = "0123456789"
            let verifyCode = ""
            for (let index = 0; index < 6 ; index++) {
                const random = Math.floor(Math.random() * number.length)
                verifyCode += number[random]
            }
            

        if (checkVerifiedUserByEmail) {
                return Response.json({
                    success: false,
                    message: "User already exist with this email"
                  },{
                    status: 400
                  })
            
        }


       const hashedPassword = await bcrypt.hash(password,10)
           
       const user = new User({
                              username,
                              email,
                              password: hashedPassword
                          })

       const newUser:any =  await user.save()

    
       const sentVerifyCode = await sendEmailVerification(email,newUser._id,verifyCode,newUser.username)

       console.log("sent verification",sentVerifyCode);
       
       if (!sentVerifyCode?.success) {
          return Response.json({
            success: false,
            message: sentVerifyCode.message
          },{
            status: 500
          })
       }


         return Response.json({
            success: true,
            message: "User registered successfully. Please verify your email",
          },{
            status: 200
          })
        

    } catch (error) {
        console.log("Error for registering of user",error)
        return Response.json({success: false, message: "Error for registering of user"})
    }
}