import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import{BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Home from './Components/Home'
import Task from './Components/Task'
import AddTask from './Components/AddTask'
import EditTask from './Components/EditTask'

function App() {
 
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/userlogin' element={<Login/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}>
        <Route path='' element={<Home/>}></Route>
        <Route path='/dashboard/task' element={<Task/>}></Route>
        <Route path='/dashboard/add_task' element={<AddTask/>}></Route>
        <Route path='/dashboard/edit_task/:id' element={<EditTask/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
