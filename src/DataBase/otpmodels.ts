import mongoose,{Schema,Document} from "mongoose";
interface AllUsersDataBase extends Document{
    email:string
    otp:number,
   createdar:any,
   expiresat:any
}
const AllUsersScehma= new Schema<AllUsersDataBase>({
    email:{type:String},
    otp:{type:Number},
    createdar:{type:Number},
    expiresat:{type:Number}
})
 export const OTP = mongoose.model<AllUsersDataBase>('otp', AllUsersScehma)