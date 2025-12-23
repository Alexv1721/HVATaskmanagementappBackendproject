import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/tasks.css'
function Tasks() {
    const nav=useNavigate()
    const [tasks,setTasks]=useState([])

    useEffect(()=>
    {
         async function fetchTasks() {
try{
const res=await axios.get("https://hvataskmanagementappbackendproject.onrender.com/tasks",{headers:{Authorization:localStorage.getItem("taskstoken")}})
setTasks(res.data.data)
}
catch(err){
localStorage.removeItem("taskstoken")
console.log(err);

nav("/login")
}

}
    fetchTasks()}
       ,[])
 useEffect(()=>
    {
         async function fetchTasks() {
try{
   
      const roleResponse = await axios.get('https://hvataskmanagementappbackendproject.onrender.com/user/role', {
        headers: { Authorization: localStorage.getItem('taskstoken') },
      });
      nav(roleResponse.data.data==='admin'?'/admin':'/');
}
catch(err){
localStorage.removeItem("taskstoken")
console.log(err);

nav("/login")
}

}
    fetchTasks()}
       ,[])
  const handleLogout = () => {
    localStorage.removeItem("taskstoken");
    nav("/login");
  };
  return (
    <div>
       <h2>My Tasks</h2>

      <button onClick={handleLogout}>Logout</button>

   <div className="tasks">

   
        {tasks.map((task, index) => (
         
  <div className='task'> <span>{index+1}</span><div className="title">{task.title}- </div><div className="task">{task.description}</div></div>
       
        ))}
    
   </div>
    </div>
  )
}

export default Tasks
