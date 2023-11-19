import mongoose from "mongoose";

const Schema = mongoose.Schema;

const studentSchema=new Schema({
    name:{
        type:String,
      //  required:true
    },
    age:{
        type:Number,
        //required:true
    },
    dob:{
        type:String,
        //required:true
    },
    classs:{
        type:String,
        //required:true
    },
    subjectslist:[String],
    markslist:[Number],
    grades:[String],
    
   
})

export default mongoose.model("Student",studentSchema);