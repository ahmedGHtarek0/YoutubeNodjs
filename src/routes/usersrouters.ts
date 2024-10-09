import express from 'express'
import { Addcomments, Addlike, addpost, addpostsorvid, addptophoto, sublike, udpcomments } from '../services/usersservices';
import { usersmiddlwearwe } from '../middlewres/usersmiddlewaraes';
import { upload } from '../middlewres/imagesmiddlwers';
import {v2 as cloudinary} from 'cloudinary'
import { vid } from '../middlewres/vidmidldwares';
import { post } from '../middlewres/post';
const router=express.Router()
cloudinary.config({
    cloud_name:'dzynp2tce',
    api_key:"671892789354189",
    api_secret:'BBBTw4xzmO6Kh-P8FTiOuEJcGl4'
})
router.post('/addprofilephoto',usersmiddlwearwe,upload.single('img'),async(req:any,res)=>{
    const Filepath= req.file.path
    console.log(Filepath)
    const AddTocloud= await cloudinary.uploader.upload(Filepath)
    const profilephoto=AddTocloud.secure_url
    const email=req.user.email
    const addpicture= await addptophoto({profilephoto,email})
    res.send(addpicture)
})
router.post('/addvid',usersmiddlwearwe,vid.single('vid'),async(req:any,res)=>{
    try{
    const {titel,disc}=req.body
    const Filepath= req.file.path
    const idofowner=req.user.email
    const addtocloude= await cloudinary.uploader.upload(Filepath,{
        resource_type:'video'
    })
    const vidurl= addtocloude.secure_url
    const addnewpost= await addpostsorvid({titel,disc,vidurl,idofowner})
    res.send(addnewpost)
    }catch(err){
console.log(err)
    }
   
})
router.post('/addpost',usersmiddlwearwe,post.fields([{name:'mix',maxCount:5}]),async(req:any,res)=>{
    try{
    const {disc}=req.body
    const Filepath= req.files.mix
    let vidurl=[];
    let t=0;
    for(let i of Filepath){
        const addtocloude= await cloudinary.uploader.upload(i.path,{
            resource_type:'auto'
        })
        t++;
         vidurl.push(addtocloude.secure_url)
    }
    const idofowner=req.user.email
    const addnewpost= await addpost({disc,vidurl,idofowner})
    res.send(addnewpost)
    }catch(err){
console.log(err)
    }
})
router.post('/addlike/:id',usersmiddlwearwe,async(req,res)=>{
    const idofvid=req.params.id;
    const addlike= await Addlike({idofvid});
    res.send(addlike)
})
router.post('/sublike/:id',usersmiddlwearwe,async(req:any,res)=>{
    const idofvid=req.params.id;
    console.log(idofvid)
    const addlike= await sublike({idofvid});
    res.send(addlike)
})
router.post('/addcomment/:id',usersmiddlwearwe,async(req:any,res)=>{
    const idofpost=req.params.id
    const email=req.user.email
    const {Thecommnet}=req.body
    const addcommnet= await Addcomments({idofpost,email,Thecommnet})
    res.send(addcommnet)
})
router.post('/updcomment/:idofpost/:idofcomment',usersmiddlwearwe,async(req:any,res)=>{
    const idofcomment=req.params.idofcomment
    const idofpost=req.params.idofpost
    const email=req.user.email
    const {Thecommnet,idofwriter,otp}=req.body
    const addcommnet= await udpcomments({email,Thecommnet,idofwriter,idofcomment,idofpost,otp})
    res.send(addcommnet)
})
export default router;