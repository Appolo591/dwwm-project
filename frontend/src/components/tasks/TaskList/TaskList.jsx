import styles from './TaskList.module.css'
import TaskItem from '../TaskItem/TaskItem'


const TaskList = ({tasks}) => {

  return (
    <>
      
      <ul className= {styles.taskList} >
        {tasks.map(task => (
            <li >
              <TaskItem key={task.id} task={task} />
            </li>
        ))}
      </ul>
      <p>Total de tâches : {tasks.length}</p>
    </>
  );
};

export default TaskList;