import { Filter } from "../DataBase/filter"

interface filter{
    nameoffilter:string
}
export const filters=async({nameoffilter}:filter)=>{
const find= await Filter.findOne({nameoffilter}
)
if(find){
    return("the filter is already exsit")
}
const addfilter = await Filter.create({nameoffilter})
await addfilter.save()
return(addfilter)
}