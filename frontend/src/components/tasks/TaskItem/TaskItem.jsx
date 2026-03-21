import styles from './TaskItem.module.css';


function TaskItem({ task }) {
    // Fonction pour formater la date proprement
    const formatDate = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'long', // 'long' pour "octobre", '2-digit' pour "10"
            year: 'numeric'
        });
    };
    return (
        <>
            <div className={styles.taskItem}>
                <h3>{task.title}</h3> 
                <span>{task.description}</span>
                {task.created_at && <span> Ajouté le {formatDate(task.created_at)}</span>}
            </div>
        </>
    );
}

export default TaskItem;