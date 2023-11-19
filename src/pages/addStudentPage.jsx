import React, { useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';



const addStudentPage = () => {
  const [Name,setName] = useState('');
  const [Age,setAge] = useState(0);
  const [dob,setdob] = useState('');
  const [classs,setclasss] = useState('');
  const [subjectDetails, setSubjectDetails] = useState([
    { subject: '', marks: '', grade: '' },
  ]);

  const addStudent = async (ev) => {
    ev.preventDefault();
    try {
      const dataToSend = {
        name: Name,
        age: Age,
        dob: dob,
        classs: classs,
        subjectDetails: {
          subjectlist: subjectDetails.map(detail => detail.subject),
          markslist: subjectDetails.map(detail => detail.marks),
          gradeslist: subjectDetails.map(detail => detail.grade),
        },
      };
  
      await axios.post('/add', dataToSend);
      alert("Registration Successful");
    } catch (error) {
      console.error('Error adding student:', error);
      alert("Registration Failed. Please try again.");
    }
  };
  

   const handleSubjectChange = (index, field, value) => {
    const updatedDetails = [...subjectDetails];
    updatedDetails[index][field] = value;
    setSubjectDetails(updatedDetails);
  };

  // Event handler for adding a new subject
  const handleAddSubject = () => {
    setSubjectDetails([...subjectDetails, { subject: '', marks: '', grade: '' }]);
  };

  // Event handler for removing a subject
  const handleRemoveSubject = (index) => {
    const updatedDetails = [...subjectDetails];
    updatedDetails.splice(index, 1);
    setSubjectDetails(updatedDetails);
  };


  return (
    
 

    <div className='bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 min-h-screen   m-4 grow items-center justify-around'>
      
       
       
        <h1 className='text-4xl text-center mb-4 font-extrabold text-purple-950'>Add Student Here!!</h1>

         <form className="max-w-2xl mx-auto border   mt-8 p-6 bg-white rounded-md shadow-md" onSubmit={addStudent}  >
         <label>Name:<br/></label>
            <input type='text' 
             onChange={ev=> setName(ev.target.value)} 
            placeholder='Student Name'
            />
            <label>Age:<br/></label>
              <input type='number' 
             onChange={ev=> setAge(ev.target.value)} 
            placeholder='Age'
            />
            <br/>
          <label>Date of Birth:</label>

              <input type='text' 
             onChange={ev=> setdob(ev.target.value)} 
            placeholder='Date Of Birth'
            />
            <label>Class:</label>

            <input type='text' 
             className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            onChange={ev=> setclasss(ev.target.value)} 
            placeholder='Class'
            />
            
          
            <h1>Subject Details</h1>
      {subjectDetails.map((subject, index) => (
        <div key={index}>
          <label>Subject:</label>
          <input
         
            type="text"
            value={subject.subject}
            onChange={(e) => handleSubjectChange(index, 'subject', e.target.value)}
          />

          <label>Marks:</label>
          <input
            type="text"
            value={subject.marks}
            onChange={(e) => handleSubjectChange(index, 'marks', e.target.value)}
          />

          <label>Grade:</label>
          <input
            type="text"
            value={subject.grade}
            onChange={(e) => handleSubjectChange(index, 'grade', e.target.value)}
          />

          <button className='bg-red-500 mb-4 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline' onClick={() => handleRemoveSubject(index)}>Remove</button>
        </div>
      ))}

      <button type="button" className='bg-green-500 mb-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline' onClick={handleAddSubject}>Add Subject</button>
      
     

      <div className=' bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 p-4 rounded-3xl'>
      <h1 className='text-4xl font-bold text-white mb-4'>Preview</h1>
      <h1 className='text-2xl font-semibold text-gray-800 mb-2'>Name:</h1>
      <p >{Name}</p>
      <h1 className='text-2xl font-semibold text-gray-800 mb-2'>Age:</h1>
      <p >{Age}</p>
      <h1 className='text-2xl font-semibold text-gray-800 mb-2'>Date-of-Birth:</h1>
      <p>{dob}</p>
      <h1 className='text-2xl font-semibold text-gray-800 mb-2'>Class:</h1>
      <p>{classs}</p>
      <h1 className='text-2xl font-semibold text-gray-800 mb-2'>Subject Details:</h1>
      <p>{JSON.stringify(subjectDetails)}</p>

    </div>
            <br/>
            <button className='bg-primary justify-center text-center px-4 py-2 rounded-xl items-center m-3'>Add Student</button>
            
          <Link to="/" className="bg-blue-700 px-4 py-2 rounded-md hover:bg-blue-800">
            Home
          </Link>
        
            
        </form>
    </div>
  )
}

export default addStudentPage