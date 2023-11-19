import express from "express";
import { addStudent, deleteById,searchById, deleteAll,getAllStudents, updateStudentById } from "../controllers/studentController.js";

const studentRouter= express.Router();

studentRouter.post("/add",addStudent);
studentRouter.get("/students",getAllStudents);
studentRouter.put("/updatedetails/:id",updateStudentById);
studentRouter.delete("/deletestudent/:id",deleteById);
studentRouter.delete("/deleteall",deleteAll);
studentRouter.get("/search/:id",searchById);

export default  studentRouter;

