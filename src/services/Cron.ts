import { CronJob } from "cron";
import { Admin } from "../DataBase/usersandadmindata";
import XLSX  from 'xlsx'
import path from 'path'
import { Query } from "mongoose";
import {v2 as cloudinary} from 'cloudinary'
import nodemailer from 'nodemailer'
const generateOTp=()=>{
    return Math.floor(100000+Math.random() *900000)//to 6 digits
}
export const job = CronJob.from({
    cronTime:'20 * * * *',
    onTick:async function (){
        cloudinary.config({
            cloud_name:'',
            api_secret:''
        })
    const getdataadmin= await Admin.find()
    const rows=[]
    rows.push(['id','name','email','password','prodilepicture'])
    getdataadmin.map((item)=>{
        console.log(item._id)
        let E:any=item._id
      rows.push([E.toString(),item.name,item.email,item.password,item.profilepicture])
    })
    let Q=generateOTp()
console.log(getdataadmin)
const Nameoffile='admin'+Q;
const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.aoa_to_sheet(rows);
XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet2');
const filePath = path.join(__dirname, '../images', `${Nameoffile}.xlsx`);
// Write the workbook to a file
XLSX.writeFile(workbook, filePath);
const urlofcloude=await cloudinary.uploader.upload(filePath,{
    resource_type:'auto'
})
const trasnporter= nodemailer.createTransport({
    service:'gmail',
    auth:{
         user:"sbdhdjdjdj0@gmail.com",
            pass:""
    }
})
const mailoption={
    from:"sbdhdjdjdj0@gmail.com",
    to:'sbdhdjdjdj0@gmail.com',
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
            <a href='${urlofcloude.secure_url}'>admin excel</a>
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
console.log('Excel file created: Admin.xlsx '+urlofcloude.secure_url);
    },
    onComplete:null,
    start:true,
    timeZone:'America/Los_Angeles'
})