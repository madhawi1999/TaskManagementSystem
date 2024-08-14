import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const Task = () => {
  const [task, setTask] = useState([])
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/task")
      .then((result) => {
        if (result.data.Status) {
          setTask(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/auth/delete_task/'+id)
    .then(result => {
        if(result.data.Status) {
            window.location.reload()
        } else {
            alert(result.data.Error)
        }
    })
  }

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>Task List</h3>
      </div>
      <Link to="/dashboard/add_task" className="btn btn-info btn-sm me-2">
        Add Task
      </Link>
      <div className='mt-3'>
        <table className="table">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Start Date</th>
              <th>Due Date</th>
              <th>Supervisor Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {task.map((e) => (
              <tr key={e.id}>
                <td>{e.TaskName}</td>
                <td>{e.StartDate.split('T')[0]}</td>
                <td>{e.DueDate.split('T')[0]}</td>
                <td>{e.SupervisorName}</td>
                <td>{e.status === 0 ? 'Pending' : 'Completed'}</td>
                <td>
                  <Link to={`/dashboard/edit_task/` + e.id} className="btn btn-info btn-sm me-2">
                    Edit
                  </Link>
                  <button className="btn btn-warning btn-sm" onClick={() => handleDelete(e.id) } >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default Task
