import styles from './TaskList.module.css'
import TaskItem from '../TaskItem/TaskItem'


const TaskList = ({tasks}) => {

  return (
    <>
      <h2>Ma Liste de Tâches (via PHP API)</h2>
      <ul className= {styles.taskList} >
        {tasks.map(task => (
            <li >
              <TaskItem key={task.id} task={task} />
            </li>
        ))}
      </ul>
    </>
  );
};

export default TaskList;