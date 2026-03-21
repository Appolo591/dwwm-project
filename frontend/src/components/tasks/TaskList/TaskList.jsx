import { useEffect, useState } from 'react';
import { API_URL } from '../../../config/api';
import styles from './TaskList.module.css';
import TaskItem from '../TaskItem/TaskItem';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Remplace par ton URL exacte calculée par ROOT dans ton PHP
    fetch(`${API_URL}/accueil`)
      .then(response => response.json())
      .then(result => {
        if (result.status === "success") {
          setTasks(result.data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur de fetch:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement des tâches...</p>;

  return (
    <>
      <h2>Ma Liste de Tâches (via PHP API)</h2>
      <ul className= {styles.taskList} >
        {tasks.map(task => (
          <li key={task.id}>
            <TaskItem task={task} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default TaskList;