import { useState } from 'react'
import AddTaskForm from '../components/tasks/AddTaskForm/AddTaskForm'

const AddTask =()=> {
    const [tasks, setTasks] = useState([]);

    const handleRefreshlist = (newTask)=> {
        console.log("le parent a reçu la nouvelle tâche : " , newTask);
        setTasks([...tasks, newTask]);
    }

    return (
        <div>
            <h1>AddTaskPage</h1>
            <AddTaskForm  onTaskAdded={handleRefreshlist}/>
        </div>  
    )
}

export default AddTask