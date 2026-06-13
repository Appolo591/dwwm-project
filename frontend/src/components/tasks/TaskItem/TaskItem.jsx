import styles from './TaskItem.module.css';
import { Link } from 'react-router-dom';
import formatDate from '../../../utils/formatDate';


function TaskItem({ task }) {
    const categoryColors = {
        'work': '#42a5f5',
        'sport': '#66bb6a',
        'perso': '#ffa726'
    };

    const bgColor = categoryColors[task.category_name] || '#eeeeee';

    return (
            <Link to={`/task/${task.id}`} className={styles.taskLink}>
            <div className={styles.taskItem}>
                <div className={styles.taskHeader}>
                    <p className={styles.taskCategory} style={{ backgroundColor: bgColor }}>{task.category_name} </p>
                    {task.priority && <span className={styles.taskPriority}> {task.priority}</span>}
                </div>
                <div>
                    <h3>{task.title}</h3> 
                    <p>{task.description}</p>
                </div>
                <div>
                    {task.created_at && <span> {formatDate(task.created_at)}</span>}
                    <span>user {task.user_id}</span>
                </div>
            </div>
            </Link>
        
    );
}

export default TaskItem;