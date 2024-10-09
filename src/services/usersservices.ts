import { thecomments } from '../DataBase/comments'
import { Posts } from '../DataBase/post'
import { thepostorvid } from '../DataBase/postsandvideo'
import { AllUsersModels } from '../DataBase/usersandadmindata'
interface addprofilephoto{
    profilephoto:string,
    email:string
}
export const addptophoto=async({profilephoto,email}:addprofilephoto)=>{
const addphoto=await AllUsersModels.findOneAndUpdate({email},{$set:{profilepicture:profilephoto}})
addphoto?.save()
return('updated')
}
interface addvid{
    titel:string,
    disc:string,
    vidurl:string,
    idofowner:string
}
export const addpostsorvid=async({titel,disc,vidurl,idofowner}:addvid)=>{
    const SearchAboutUsers= await AllUsersModels.findOne({email:idofowner})
    const addnewvid= await thepostorvid.create({idofowner:SearchAboutUsers?._id,titel,disc,VidOrImg:vidurl})
    await addnewvid.save()
    return(addnewvid)
}
interface addlike{
    idofvid:string
}
export const Addlike=async({idofvid}:addlike)=>{
    const SearchAboutVid= await thepostorvid.findOne({_id:idofvid})
    if(!SearchAboutVid){
        return('the vid deleted')
    }
    SearchAboutVid.like+=1;
    await SearchAboutVid.save()
    return(SearchAboutVid)
}
export const sublike=async({idofvid}:addlike)=>{
    const SearchAboutVid= await thepostorvid.findOne({_id:idofvid})
    if(!SearchAboutVid){
        return('the vid deleted')
    }
    SearchAboutVid.like-=1;
    await SearchAboutVid.save()
    return(SearchAboutVid)
}
interface addcommnets{
    idofpost:string,
    email:string,
Thecommnet:string,
idofwriter?:string,
idofcomment?:string
otp?:number
}
const generateOTp=()=>{
    return Math.floor(100000+Math.random() *900000)//to 6 digits
}
export const Addcomments=async({idofpost,email,Thecommnet}:addcommnets)=>{
    const SearchAboutUsers:any=await AllUsersModels.findOne({email})
    const shemaofpostorvid= await thepostorvid.findOne({_id:idofpost})
    const QQ= generateOTp();
    if(!shemaofpostorvid){
        return('the vid is deleted')
    }
    shemaofpostorvid.comments.push({nameofwriter:SearchAboutUsers?.name,idofwriter:SearchAboutUsers?._id,idofvidorpost:idofpost,Thecommnet,idofcomment:QQ})
    await shemaofpostorvid.save()
    const addtocommentsDB= await thecomments.create({idof:QQ,nameofwriter:SearchAboutUsers?.name,idofwriter:SearchAboutUsers?._id,idofvidorpost:idofpost,Thecommnet})
    await addtocommentsDB.save()
    return(shemaofpostorvid)
}
export const udpcomments=async({idofpost,email,Thecommnet,idofwriter,idofcomment,otp}:addcommnets)=>{
    const SearchAboutUsers:any=await AllUsersModels.findOne({email})
    if(SearchAboutUsers._id.toString()!==idofwriter){
        return('u can not updated or deleted this comments')
    }
    const shemaofpostorvid= await thepostorvid.findOne({_id:idofpost})
    if(!shemaofpostorvid){
        return('the vid is deleted')
    }
   for(let Q of shemaofpostorvid.comments){
    if(Q.idofcomment===otp){
        Q.Thecommnet=Thecommnet
    }
   }
   await shemaofpostorvid.save()
   const SearchAboutcommengts= await thecomments.findOneAndUpdate({idof:otp},{$set:{Thecommnet}})
   return(SearchAboutcommengts)     
}
interface addpost{
    disc:string,
    vidurl:string[],
    idofowner:string
}
export const addpost=async({disc,vidurl,idofowner}:addpost)=>{
    const iD=await AllUsersModels.findOne({email:idofowner})
    const addpost= await Posts.create({disc:disc,VidOrImg:vidurl,idofowner:iD?._id})
    await addpost.save()
    return(addpost)
}