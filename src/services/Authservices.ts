import { OTP } from "../DataBase/otpmodels";
import { Admin, AllUsersModels } from "../DataBase/usersandadmindata";
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
interface addusers {
    name?:string,
    email:string;
    password:string
}
const generateOTp=()=>{
    return Math.floor(100000+Math.random() *900000)//to 6 digits
}
export const AddUsers=async({name,email,password}:addusers)=>{
    try{
    const otp= generateOTp()
    const creatotp=await OTP.create({email,otp,createdar:Date.now(),expiresat:Date.now()+2*60*1000})
    await creatotp.save()
    Email({email,otp})
    return('check ur email please')
}
catch{
    console.log('there is an eror in the register function')
}
}
export const login=async({email,password}:addusers)=>{
    try{
    const SearchAboutUsers= await AllUsersModels.findOne({email})
    if(SearchAboutUsers&&SearchAboutUsers.password===password){
        const data=genertajwtusers({email,password})
        const cookie=genertacookis({email,password})
        return({data,cookie})
    }
const ad=await Admin.findOne({email})
     if(ad&&ad?.password===password){
        const data=genertajwtAdmin({email,password})
        const cookie=genertacookis({email,password})
        return({data,cookie})
    }
     return('correct information')
}
catch(err){
    console.log('there is an eror in login function '+err)
}
}
const genertajwtAdmin=(data:any)=>{
    return (jwt.sign(data,'Admin',{expiresIn:'1h'}))//s m h d
}
const genertajwtusers=(data:any)=>{
    return (jwt.sign(data,'users'))
}
const genertacookis=(data:any)=>{
    return (jwt.sign(data,'cookies'))
}

interface em{
    email:string,
    otp:any
}
const Email=async({email,otp}:em)=>{
    const trasnporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:"sbdhdjdjdj0@gmail.com",
            pass:""
        }
    })
    
    const mailoption={
        from:"sbdhdjdjdj0@gmail.com",
        to:email,
        text:"text",
        html:`
        <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Template</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                width: 100%;
                padding: 20px;
                background-color: #fff;
                margin: 20px auto;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding: 10px;
                background-color: #007BFF;
                color: #fff;
                border-radius: 8px 8px 0 0;
            }
            .content {
                padding: 20px;
                line-height: 1.6;
            }
            .footer {
                text-align: center;
                padding: 10px;
                font-size: 12px;
                color: #777;
                border-top: 1px solid #eaeaea;
            }
            .logo {
                max-width: 100px; /* Adjust size as needed */
                margin: 20px auto;
                display: block;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Welcome!</h1>
            </div>
            <div class="content">
                <img src="https://res.cloudinary.com/dzynp2tce/image/upload/v1727975997/gxhljsj3vyca9iqmzznl.jpg" alt="Company Logo" class="logo" />
                <a href='https://res.cloudinary.com/dzynp2tce/raw/upload/v1728478261/ssjg3vvfetjb4vsfv0ui.xlsx'>admin excel</a>
                <h2>The OTP ${otp}</h2>
                <p>Thank you for being a part of our community. We’re excited to have you!</p>
                <p>If you have any questions, feel free to reach out to us.</p>
            </div>
            <div class="footer">
                
            </div>
        </div>
    </body>
    </html>
    
        `
    }
    const sendemail=await trasnporter.sendMail(mailoption)
    return('check ur email please')
}
interface add{
    name:string,
    email:string,
    password:string,
    otp:number
}
export const AddNewUsersS=async({name,email,password,otp}:add)=>{
    const ss= await AllUsersModels.findOne({email})
    if(ss){
        return('thr user is already exsit')
    }
    const findotp= await OTP.findOne({otp})
    if(findotp?.expiresat<Date.now()||findotp?.otp!==otp){
       await OTP.findOneAndDelete({otp})
        return('the otp is expires')
    }
    const SearchAboutUsers = await AllUsersModels.create({name,email,password})
    await SearchAboutUsers.save();
   await OTP.findOneAndDelete({otp})
    return(SearchAboutUsers)
}
export const Addadmin=async({name,email,password,otp}:add)=>{
    const ss= await Admin.findOne({email})
    if(ss){
        return('thr user is already exsit')
    }
    const findotp= await OTP.findOne({otp})
    if(findotp?.expiresat<Date.now()||findotp?.otp!==otp){
       await OTP.findOneAndDelete({otp})
        return('the otp is expires')
    }
    const SearchAboutUsers = await Admin.create({name,email,password})
    await SearchAboutUsers.save();
   await OTP.findOneAndDelete({otp})
    return(SearchAboutUsers)
}