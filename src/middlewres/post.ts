import multer from 'multer'
import path from 'path'
const storage=multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,path.join(__dirname,'../images'))
    },
    filename(req, file, callback) {
      callback(null,new Date().toISOString().replace(/:/g,'-')+file.originalname)  
    }
})

const fileFilter = (req:any, file:any, cb:any) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (['.mp4', '.mov', '.mkv', '.avi','.jpg', 'jpeg','.png'].includes(ext)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Unsupported file type!'), false); // Reject the file
    }
};
export const post=multer({storage:storage,fileFilter:fileFilter,limits: { fileSize: 10.8 * 1024 * 1024 * 1024 } })