import styles from './TaskList.module.css'
import TaskItem from '../TaskItem/TaskItem'


const TaskList = ({tasks}) => {

  return (
    <>
      
        <p>Total de tâches : {tasks.length}</p>
      <ul className= {styles.taskList} >
        {tasks.map(task => (
            <li key={task.id}>
              <TaskItem  task={task} />
            </li>
        ))}
      </ul>
    </>
  );
};

export default TaskList;