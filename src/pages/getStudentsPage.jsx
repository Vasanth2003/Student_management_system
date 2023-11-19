import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GetStudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState('');

  const [result, setResult] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('/students');

        // Set the students state with the array inside the 'students' property
        setStudents(response.data.students);

        // Log the fetched data
        console.log('Fetched data:', students);
      } catch (error) {
        console.error('Error fetching students:', error);

        // Set students to an empty array if there's an error
        setStudents([]);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (studentId) => {
    try {
      // Make a DELETE request to remove the student from the database
      await axios.delete(`/deletestudent/${studentId}`);

      // Update the UI by removing the deleted student from the state
      setStudents((prevStudents) => prevStudents.filter((student) => student._id !== studentId));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleSearch = async () => {
    
      const response = await axios.get(`/search/${studentId}`);
      await setResult(response.data);
      
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-blue-500 to-green-500">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h1 className="text-4xl font-extrabold text-purple-600 mb-6">Student List</h1>
        <input  onChange={(ev) => setStudentId(ev.target.value)} type='text'/>
        
        <button onClick={handleSearch}  className='border-violet-600 border-2 rounded-2xl p-2 hover:bg-blue-300 hover:text-white'>Search</button>
      
          <ul className="space-y-8">

          {Array.isArray(students) && students.length > 0 ? (
            students.map((student) => (
              <li
                key={student._id}
                className="flex flex-col bg-gray-100 p-6 rounded-md shadow-md"
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800">{student.name}</h2>
                    <p className="text-gray-500">Age: {student.age} years</p>
                    <p className="text-gray-500">Unique ID:{student._id} </p>

                    <p className="text-gray-500">Date of Birth: {student.dob}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(student._id)}
                    className="text-red-500 ml-4"
                  >
                    Delete
                  </button>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-500 mb-2">Class: {student.classs}</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-md font-semibold text-gray-800 mb-2">Subject</h4>
                      {student.subjectslist.map((subject, index) => (
                        <p key={index} className="text-gray-600">{subject}</p>
                      ))}
                    </div>
                    <div>
                      <h4 className="text-md font-semibold text-gray-800 mb-2">Marks</h4>
                      {student.markslist.map((marks, index) => (
                        <p key={index} className="text-gray-600">{marks}</p>
                      ))}
                    </div>
                    <div>
                      <h4 className="text-md font-semibold text-gray-800 mb-2">Grade</h4>
                      {student.grades.map((grade, index) => (
                        <p key={index} className="text-gray-600">{grade}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="text-gray-800">No students found</li>
          )}
        </ul>
        <br />
        <Link to="/" className="bg-blue-700 px-4 py-2 rounded-md hover:bg-blue-800">
          Home
        </Link>
      </div>
    </div>
  );
};

export default GetStudentsPage;
