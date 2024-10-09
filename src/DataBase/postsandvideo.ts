import mongoose,{Schema,Document} from "mongoose";
interface Icoments {
    nameofwriter:string,
    idofwriter:string,
    idofvidorpost:string,
    Thecommnet:string,
    idofcomment:number
}
interface ividandposts extends Document{
    idofowner:string,
    titel:string,
    disc:string,
    VidOrImg:string,
    like:number,
    comments:Icoments[],
}
const Schemaofthecomment= new Schema<Icoments>({
    nameofwriter:{type:String},
    idofwriter:{type:String},
    idofvidorpost:{type:String},
    Thecommnet:{type:String},
    idofcomment:{type:Number}
})
const shemaofpostorvid = new Schema<ividandposts>({
    idofowner:{type:String},
    titel:{type:String,default:'anytitle'},
    disc:{type:String},
    VidOrImg:{type:String},
    like:{type:Number,default:0},
    comments:[Schemaofthecomment]
})
export const thepostorvid= mongoose.model<ividandposts>('postsorvid',shemaofpostorvid)