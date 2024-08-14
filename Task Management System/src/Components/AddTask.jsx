import React, { useEffect, useState } from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const AddTask = () => {
  const [task, setTask] = useState({
    Task_name: "",
    StartDate: "",
    DueDate: "",
    SupervisorName: "",
  });
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('http://localhost:3000/auth/add_task', task)
      .then(result => {
        if (result.data.Status) {
          navigate('/dashboard/task')
        } else {
          alert(result.data.Error)
        }
      })
      .catch(err => console.log(err))
  }


return (
  <div className="d-flex justify-content-center align-items-center mt-3">
    <div className="p-3 rounded w-50 border">
      <h3 className="text-center">Add Task</h3>
      <form className="row g-1" onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="inputName" className="form-label">
            Task name
          </label>
          <input
            type="text"
            className="form-control rounded-0"
            id="inputName"
            placeholder="Enter task name"
            onChange={(e) =>
              setTask({ ...task, Task_name: e.target.value })
            }
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputstartdate" className="form-label">
            Start Date
          </label>
          <input
            type="date"
            className="form-control rounded-0"
            id="inputstartdate"
            placeholder="Enter Start Date"
            autoComplete="off"
            onChange={(e) =>
              setTask({ ...task, StartDate: e.target.value })
            }
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputduedate" className="form-label">
            Due Date
          </label>
          <input
            type="date"
            className="form-control rounded-0"
            id="inputduedate"
            placeholder="Enter Due Date"
            onChange={(e) =>
              setTask({ ...task, DueDate: e.target.value })
            }
          />
          <label htmlFor="inputSupervisorName" className="form-label">
            Supervisor Name
          </label>
          <input
            type="text"
            className="form-control rounded-0"
            id="inputSupervisorName"
            placeholder="Enter Supervisor Name"
            autoComplete="off"
            onChange={(e) =>
              setTask({ ...task, SupervisorName: e.target.value })
            }
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100">
            Add Task
          </button>
        </div>
      </form>
    </div>
  </div>
);
};


export default AddTask