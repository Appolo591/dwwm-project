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
                <p className={styles.taskCategory} style={{ backgroundColor: bgColor }}>{task.category_name} </p>
                <h3>{task.title}</h3> 
                <span>{task.description}</span>
                {task.created_at && <span> Ajouté le {formatDate(task.created_at)}</span>}
            </div>
            </Link>
        
    );
}

export default TaskItem;