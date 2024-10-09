import { NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { Admin, AllUsersModels } from "../DataBase/usersandadmindata";
export const usersmiddlwearwe=(req:any,res:any,next:NextFunction)=>{
    try{
const auth= req.get('authorization')
if(!auth){
    res.send('where is the authorization')
}
const token=auth.split(' ')[1]
if(!token){
    res.send('where is the token')
}
jwt.verify(token,'users',async(err:any,payload:any)=>{
    if(err){
        res.send('the token is erro or expires')
    }
    if(!payload){
        res.send('there is an eror i the payload')
    }
    const admin= await AllUsersModels.findOne({email:payload.email})
    req.user=admin
    next()
})
    }
    catch{
        console.log('erro in midlewares admin')
    }
}
