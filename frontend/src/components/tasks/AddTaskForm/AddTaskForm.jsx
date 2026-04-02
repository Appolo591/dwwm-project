import styles from './AddTaskForm.module.css'
import { useState } from 'react'
import { API_URL } from '../../../config/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';



const AddTaskForm = ({onTaskAdded}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [category, setCategory] = useState('');
    const [userId, setUserId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

     // 2. Gestionnaire de soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        setError('');
        setIsSubmitting(true);

        // Petite validation côté Front
        if (!title.trim() || !description.trim()) {
            setError('Veuillez remplir tous les champs.');
            setIsSubmitting(false);
            return;
        }

        console.log("Données envoyées au PHP :", {
            title: title,
            description: description,
            priority: priority,
            category_id: category,
            user_id: userId
        })

        try {
            // 3. Appel API vers ton Backend PHP (pense à ton API_URL config)
            const response = await fetch(`${API_URL}/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({  title: title, description: description, priority: priority, category_id: category, user_id: userId }), // On envoie les données en JSON
            });

            const result = await response.json();
            console.log('Données recues du PHP', result);

            // 4. Gestion de la résponse de ton Backend PHP
            if (result.status === 'success') {
                setTitle('');
                setDescription('');
                setPriority('');
                setCategory('');
                setUserId('');
                setError('');   
                
                if (onTaskAdded) {
                    onTaskAdded(result.data);
                }
                toast.success('Tâche ajoutée !');
                navigate('/');
            } else {
                setError(result.message || 'Une erreur est survenue côté serveur.');
                toast.error('Une erreur est survenue.');
            }
        } catch (error) {
            console.error('Error API:', error);
            setError('Impossible de contacter le serveur');
            
        }finally {
            setIsSubmitting(false);
        }
    }
    return (
        <div className={styles.formContainer}>
            <h2 className={styles.formTitle}>Ajouter une tâche</h2>
            {error && (<p style={{ color: 'red', backgroundColor: '#fdeaea', padding: '10px', borderRadius: '5px', textAlign: 'center' }}>{error}</p>
)}
            <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
                <label htmlFor="title">Titre</label>
                <input type="text" name="title" id="title" placeholder="Ex: Faire les courses" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="description">Description</label>
                <textarea name="description" id="description" placeholder="Détails de la tâche..." value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="category">Catégorie</label>
                <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="" disabled >Choisir une catégorie</option>
                <option value="1">Sport</option>
                <option value="2">Travail</option>
                <option value="3">Personnel</option>
                </select>
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="priority">Priorité</label>
                <select id="priority" value ={priority} onChange={(e) => setPriority(e.target.value)} >
                <option value="" disabled >Choisir une priorité</option>
                <option value="low">Basse (Low)</option>
                <option value="medium">Moyenne (Medium)</option>
                <option value="high">Haute (High)</option>
                </select>
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="user_id">Utilisateur</label>
                <select id="user_id" value={userId} onChange={(e) => setUserId(e.target.value)}>
                <option value="" disabled >Assigner à...</option>
                <option value="1">Utilisateur 1</option>
                <option value="4">Utilisateur 4</option>
                <option value="5">Utilisateur 5</option>
                </select>
            </div>

            <button type="submit" className={styles.submitButton} disabled={isSubmitting} >Ajouter la tâche</button>
            </form>
        </div>  
    )
}   

export default AddTaskForm