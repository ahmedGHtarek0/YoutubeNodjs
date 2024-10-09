import express from 'express'
import { filters } from '../services/Adminservices'
import { adminmilldelwares } from '../middlewres/adminmiddlewares'
const router = express.Router()
router.post('/addfilter',adminmilldelwares,async(req:any,res)=>{
    try{
    const {nameoffilter}= req.body
   // console.log(req.admin.email)
    const addfilter= await filters({nameoffilter})
    res.send(addfilter)
    }
    catch{
        console.log('erro in addfilter routers ')
    }
})
export default router