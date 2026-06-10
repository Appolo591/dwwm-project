import { useEffect, useState, useContext } from 'react';
import { API_URL } from '../config/api';
import { useParams , Link , useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import formatDate from '../utils/formatDate';
import styles from './TaskDetail.module.css';
import toast from 'react-hot-toast';

const TaskDetail =() => {
    // 1. On récupère l'ID directement depuis l'URL (ex: /task/1)
    const { id } = useParams()
    const navigate = useNavigate();
    const {user, token} = useContext(AuthContext);
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);

     useEffect(() => {
        
        fetch(`${API_URL}/task/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(result => {
                if (result.status === "success") {
                    setTask(result.data);
                    
                }else{
                    setTask(null);
                    toast.error(result.message || "Une erreur est survenue lors de la récupération de la tâche.");
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Erreur de fetch:", error);
                setLoading(false);
            });
    }, [id, token]);

    // Fonction de suppression  
    const handleDelete = async () => {
        if (!window.confirm(`Voulez-vous vraiment supprimer la tâche "${task.title}" ?`)) return;

        setIsDeleting(true);
        try {
            const response = await fetch(`${API_URL}/delete/${id}`, {
                method: 'DELETE', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await response.json();

            if (result.status === "success") {
                toast.success('Tâche supprimée avec succès !');

            // Redirection dynamique vers la liste des tâches de l'utilisateur connecté
                if (user?.id) {
                    navigate(`/tasks/${user.id}`);
                } else {
                    navigate('/');
                }
            } else {
                toast.error(result.message || 'Une erreur est survenue lors de la suppression.');
                setIsDeleting(false);
            }
        } catch (error) {
            console.error("Erreur suppression:", error);
            toast.error('Imposible de contacter le serveur.');
            setIsDeleting(false);
        }
    };

    if (loading) return <p>Chargement des détails...</p>;
    if (!task) return <p>Tâche introuvable.</p>;
    console.log(task);
    return(          
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


                {/* <div className={styles.infoRow} >
                    <span className={styles.label}>Status</span>
                    <span className={styles.value}>✅ {task.status}</span>
                </div> */}

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
            {/* // On remplace le Link par un bouton avec onClick */}

            <div className={styles.actionButtons}>
                <Link to={`/edit/${task.id}`}>
                    <button className={`${styles.btn} ${styles.btnEdit}`}>Modifier</button>
                </Link>
            
            <button 
                onClick={handleDelete} 
                className={`${styles.btn} ${styles.btnDelete}`}
                disabled={isDeleting}
            >
                {isDeleting ? 'Suppression...' : 'Supprimer'}
            </button>
            </div>
            {/* <button onClick={() => navigate('/')} className={styles.btnBack}>
                Retour à la liste
            </button> */}
        </div>
    )
}

export default TaskDetail