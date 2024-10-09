import mongoose,{Schema,Document} from "mongoose";
interface AllUsersDataBase extends Document{
    name:string,
    email:string,
    password:string,
    profilepicture:string
}
const AllUsersScehma= new Schema<AllUsersDataBase>({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    profilepicture:{type:String,default:'anyimage'}
})
 export const AllUsersModels = mongoose.model<AllUsersDataBase>('allusersandadminsinfromation', AllUsersScehma)
 export const Admin = mongoose.model<AllUsersDataBase>('Admin', AllUsersScehma)