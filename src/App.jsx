import './App.css'
import {Routes,Route} from 'react-router-dom';
import  Homepage from "./pages/homePage.jsx"
import AddStudent from "./pages/addStudentPage.jsx"
import UpdateStudent from "./pages/updateStudentPage.jsx"
import GetStudents from "./pages/getStudentsPage.jsx"
import axios from "axios";

axios.defaults.baseURL = 'http://127.0.0.1:5000/api/student';
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
       
       <Routes>
      
        <Route path='/' element={<Homepage/>}/>
        <Route path='/add' element={<AddStudent/>}/>
        <Route path='/update' element={<UpdateStudent/>}/>
        <Route path='/students' element={<GetStudents/>}/>

    </Routes>
    </>
  )
}

export default App
