import mongoose from "mongoose";
const lessonSchema=new mongoose.Schema({
    techerId:{ type:String},
    content:{type:String},
    lesson:{type:String},
    date:Date
})
module.exports=mongoose.model("Lesson",lessonSchema)
