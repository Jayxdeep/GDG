import mongoose from 'mongoose'
const StudentSchema=new mongoose.Schema({
    name:{type:String,required:true},
    class:{type:String},
    rollNum:{type:String},
    class:{type:String},
    reportCard:[
        {
            subject:String,
            marks:Number,
            feedback:String
        }
    ]
})
module.exports=mongoose("Student",StudentSchema)