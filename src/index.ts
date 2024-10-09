import express from 'express'
import mongoose from 'mongoose'
import AuthRoutes from './routes/AuthRoutes'
import cookieParser from 'cookie-parser'
import adminrouters from './routes/adminrouters'
import { formatDiagnostic } from 'typescript'
import path from 'path'
import cors from 'cors'
import {job} from './services/Cron'
import usersrouters from './routes/usersrouters'
import { CronJob } from "cron";
const app = express()
const port=3001
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(express.static(path.join(__dirname,'./images')))
try{
mongoose.connect('mongodb://localhost:27017/Youtube')
.then(()=>console.log('the youtube database connetced'))
.catch((err)=>console.log('there error in db '+err))
}catch(err){
console.log('erro in connected with Db  '+err)
}
//authntication and authorization and admin page 
job.start()
app.use('/Auth',AuthRoutes)
app.use('/Admin',adminrouters)
app.use('/users',usersrouters)
app.listen(port,()=>{
    console.log('the server good "http://loaclhost:3001"')
})