import express from 'express'
import { Addadmin, AddNewUsersS, AddUsers, login } from '../services/Authservices';
import { refreshadmin } from '../middlewres/refreshtoken';
const router= express.Router();
router.post('/registerusers',async(req,res)=>{
    try{
    const {name,email,password}=req.body;
    const AddNewUsers= await AddUsers({name,email,password})
    res.send(AddNewUsers)
}catch{
    console.log('erro in regiserusers route')
}
})
router.post('/registeradmin',async(req,res)=>{
    try{
    const {name,email,password}=req.body;
    const AddNewUsers= await AddUsers({name,email,password})
    res.send(AddNewUsers)
}catch{
    console.log('erro in regiseeradmin route')
}
})
router.get('/adminregreshtoken',refreshadmin,async(req,res)=>{})
router.post('/login',async(req,res)=>{
    try{
    const {email,password}=req.body;
    const {data,cookie}:any= await login({email,password})
    res.cookie('allusersandadmin',cookie,{
        maxAge:7*24*60*60*1000
    })
    res.json({accesstoken:data})
    }
    catch(err){
        console.log('eror in login routes '+err)
    }
})
router.post('/checkotp',async(req,res)=>{
const {email,name,password,otp}=req.body;
const adduser= await AddNewUsersS({name,email,password,otp})
res.send(adduser)
})
router.post('/checkotpadmin',async(req,res)=>{
const {email,name,password,otp}=req.body;
const adduser= await Addadmin({name,email,password,otp})
res.send(adduser)
})
router.post('/logout',async(req,res)=>{
    res.clearCookie('allusersandadmin')
    res.send('logout okay')
})
export default router;
