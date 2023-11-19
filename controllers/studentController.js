import Student from "../models/Student.js";
import mongoose from "mongoose";


export const addStudent = async (req, res) => {
    const { name, age, dob, classs, subjectDetails } = req.body;
  
    const { subjectlist, markslist, gradeslist } = subjectDetails;
  
    const student = new Student({
      name,
      age,
      dob,
      classs,
      subjectslist: subjectlist,
      markslist: markslist,
      grades: gradeslist,
    });
  
    try {
      await student.save();
      return res.status(200).json({ student });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  


export const getAllStudents = async(req,res)=>
{
    let students;
    try{
        students = await Student.find({})
    }catch(err)
    {
        console.log(err);
    }
    if(!students)
    {
       return  res.status(404).json({message:"Empty"})

    }
    return res.status(200).json({students})
}


export const updateStudentById = async (req, res) => {
  const { id } = req.params;
  const { name, age, dob, classs, subjectDetails } = req.body;

  const { subjectslist, markslist, grades } = subjectDetails;

  let student;
  try {
    student = await Student.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          age,
          dob,
          classs,
          subjectslist,
          markslist,
          grades,
        },
      },
      { new: true }
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to Update" });
  }

  if (!student) {
    return res.status(500).json({ message: "Unable to Update" });
  }
  return res.status(200).json({ student });
};






export const deleteById = async(req,res,next)=>
{
    const id=req.params.id;
    let student;
    try
    {
        student = await Student.findByIdAndRemove(id)
        await student.save()
    }catch(err)
    {
        console.log(err)
    }
    if(!student)
    {
        return res.status(404).json({message:"No Student Found"});
    }
    return res.status(200).json({message:"Deleted Succesfully"})

}

export const deleteAll = async(req,res,next)=>
{
    const id=req.params.id;
    let student;
    try
    {
        student = await Student.deleteMany({})
    }catch(err)
    {
        console.log(err)
    }
    if(!student)
    {
        return res.status(404).json({message:"No Student Found"});
    }
    return res.status(200).json({message:"Deleted Succesfully"})

}

export const searchById = async(req,res)=>{
  const id=req.params.id;
  let student;
  student = await Student.findById(id);
  if(!student){
    return res.status(404).json({message:"No Student Found"});

  }
  return res.status(200).json({student})

}