import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UpdateStudentPage = () => {
  const [studentId, setStudentId] = useState('');
  const [Name, setName] = useState('');
  const [Age, setAge] = useState(0);
  const [dob, setDob] = useState('');
  const [classs, setClasss] = useState('');
  const [subjectDetails, setSubjectDetails] = useState([
    { subject: '', marks: '', grade: '' },
  ]);

  const updateStudent = async (ev) => {
    ev.preventDefault();
    try {
      const { data } = await axios.put(`/updatedetails/${studentId}`, {
        name: Name,
        age: Age,
        dob,
        classs,
        subjectDetails: {
          subjectslist: subjectDetails.map((detail) => detail.subject),
          markslist: subjectDetails.map((detail) => detail.marks),
          grades: subjectDetails.map((detail) => detail.grade),
        },
      });
      alert('Student details updated successfully');
      console.log(data.student);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubjectChange = (index, field, value) => {
    const updatedDetails = [...subjectDetails];
    updatedDetails[index][field] = value;
    setSubjectDetails(updatedDetails);
  };

  const handleAddSubject = () => {
    setSubjectDetails([
      ...subjectDetails,
      { subject: '', marks: '', grade: '' },
    ]);
  };

  const handleRemoveSubject = (index) => {
    const updatedDetails = [...subjectDetails];
    updatedDetails.splice(index, 1);
    setSubjectDetails(updatedDetails);
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 min-h-screen m-4 grow items-center justify-around">
      <h1 className="text-4xl text-center mb-4 font-extrabold text-purple-950">Update Student Details</h1>

      <form
        className="max-w-2xl mx-auto border mt-8 p-6 bg-white rounded-md shadow-md"
        onSubmit={updateStudent}
      >
        <label>Student ID:</label>
        <input
          type="text"
          onChange={(ev) => setStudentId(ev.target.value)}
          placeholder="Enter Student ID"
        />

        <label>Name:</label>
        <input
          type="text"
          onChange={(ev) => setName(ev.target.value)}
          placeholder="Student Name"
        />

        <label>Age:</label>
        <input
          type="number"
          onChange={(ev) => setAge(ev.target.value)}
          placeholder="Age"
        />
        <br />
        <label>Date of Birth:</label>
        <input
          type="text"
          onChange={(ev) => setDob(ev.target.value)}
          placeholder="Date Of Birth"
        />
        <label>Class:</label>
        <input
          type="text"
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          onChange={(ev) => setClasss(ev.target.value)}
          placeholder="Class"
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

            <button
              className="bg-red-500 mb-4 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              onClick={() => handleRemoveSubject(index)}
            >
              Remove
            </button>
          </div>
        ))}

        <button
          className="bg-green-500 mb-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
          onClick={handleAddSubject}
        >
          Add Subject
        </button>

        <br />
        <button className="bg-primary justify-center text-center px-4 py-2 rounded-xl items-center m-3">
          Update Student
        </button>

        <Link to="/" className="bg-blue-700 px-4 py-2 rounded-md hover:bg-blue-800">
          Home
        </Link>
      </form>
    </div>
  );
};

export default UpdateStudentPage;
