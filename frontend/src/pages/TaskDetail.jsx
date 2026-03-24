import { useEffect, useState } from 'react';
import { API_URL } from '../config/api';
import { Link, useParams } from 'react-router-dom';
import formatDate from '../utils/formatDate';
import styles from './TaskDetail.module.css';



const TaskDetail =() => {
    // 1. On récupère l'ID directement depuis l'URL (ex: /task/1)
    const { id } = useParams()
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);

     useEffect(() => {
        // Remplace par ton URL exacte calculée par ROOT dans ton PHP
        fetch(`${API_URL}/task/${id}`)
            .then(response => response.json())
            .then(result => {
                if (result.status === "success") {
                    setTask(result.data);
                    
                }else{
                    setTask(null);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Erreur de fetch:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Chargement des détails...</p>;
    if (!task) return <p>Tâche introuvable.</p>;
    console.log(task);
    return(          
        // <div className={styles.taskDetail} >
        //     <h1>DetailPage</h1>
        //     <h3>Titre : {task.title}</h3> 
        //     <p> Description : {task.description}</p>
        //     {task.created_at && <p> Ajouté le {formatDate(task.created_at)}</p>}   
        //     <p> Catégorie : {task.category_name}</p>
        //     <p>priorité : {task.priority_name} {task.priority_color} </p>
        //     <p>status : {task.status_name}</p>
        //     <p>utilisateur : {task.user_name}</p>
        // </div>
        <div className={styles.taskDetail}>
            <h1>Détails de la tâche</h1>
            
            <h3>{task.title}</h3> 

            <div className={styles.descriptionSection}>
                <span className={styles.label}>Description</span>
                <p>{task.description}</p>
            </div>

            <div className={styles.metaGrid}>
                <div className={styles.infoRow}>
                    <span className={styles.label}>Catégorie</span>
                    <span className={styles.value}> 🏃{task.category_name}</span>
                </div>


                <div className={styles.infoRow}>
                    <span className={styles.label}>Status</span>
                    <span className={styles.value}>✅ {task.status}</span>
                </div>

                <div className={styles.infoRow}>
                    <span className={styles.label}>Utilisateur</span>
                    <span className={styles.value}>👤 {task.user_name}</span>
                </div>
            </div>

            <div className={styles.infoRow}>
                <span className={styles.label}>Priorité</span>
                {/* Utilisation de la couleur venant du backend */}
                <span 
                    className={styles.priorityBadge} 
                    style={{ backgroundColor: task.priority_color || '#95a5a6' }}
                >
                    {task.priority}
                </span>
            </div>

            {task.created_at && (
                <p className={styles.dateFooter}>
                    Ajouté le {formatDate(task.created_at)}
                </p>
            )}
            <Link to={`/edit/${task.id}`} >
                <button className={styles.btn}>Modifier</button>
            </Link>
            <Link to={`/delete/${task.id}`}>
            <button className={styles.btn}>Supprimer</button>
            </Link>
        </div>
    )
}

export default TaskDetail