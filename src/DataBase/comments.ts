import mongoose,{Schema,Document} from "mongoose";
interface AllUsersDataBase extends Document{
    nameofwriter:string,
    idofwriter:string,
    idofvidorpost:string,
    Thecommnet:string,
  idof:number,
}
const AllUsersScehma= new Schema<AllUsersDataBase>({
    nameofwriter:{type:String},
    idofwriter:{type:String},
    idofvidorpost:{type:String},
    Thecommnet:{type:String},
    idof:{type:Number},
   
})
 export const thecomments = mongoose.model<AllUsersDataBase>('Comments', AllUsersScehma)