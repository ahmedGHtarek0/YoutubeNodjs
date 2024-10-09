import mongoose,{Schema,Document} from "mongoose";
interface AllUsersDataBase extends Document{
   nameoffilter:string,
}
const AllUsersScehma= new Schema<AllUsersDataBase>({
    nameoffilter:{type:String},

})
 export const Filter = mongoose.model<AllUsersDataBase>('filter', AllUsersScehma)