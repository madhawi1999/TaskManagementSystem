import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditTask = () => {
  const { id } = useParams()
  const [task, setTask] = useState({
    Task_name: "",
    StartDate: "",
    DueDate: "",
    SupervisorName: "",
    status: "",
  });

  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3000/auth/task/' + id)
      .then(result => {
        const fetchedTask = result.data.Result[0];

        // Convert the date to yyyy-MM-dd format
        const startDate = fetchedTask.StartDate.split('T')[0];
        const dueDate = fetchedTask.DueDate.split('T')[0];

        setTask({
          Task_name: fetchedTask.TaskName,
          StartDate: startDate,
          DueDate: dueDate,
          SupervisorName: fetchedTask.SupervisorName,
          status: fetchedTask.status
        });
      }).catch(err => console.log(err))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.put('http://localhost:3000/auth/edit_task/' + id, task)
      .then(result => {
        if (result.data.Status) {
          navigate('/dashboard/task')
        } else {
          alert(result.data.Error)
        }
      }).catch(err => console.log(err))
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Task</h3>
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
              value={task.Task_name}
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
              value={task.StartDate}
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
              value={task.DueDate}
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
              value={task.SupervisorName}
              autoComplete="off"
              onChange={(e) =>
                setTask({ ...task, SupervisorName: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputStatus" className="form-label">Status</label>
            <select
              className="form-control rounded-0"
              id="inputStatus"
              value={task.status}
              onChange={(e) =>
                setTask({ ...task, status: e.target.value })
              }
            >
              <option value="0">Pending</option>
              <option value="1">Completed</option>
            </select>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditTask