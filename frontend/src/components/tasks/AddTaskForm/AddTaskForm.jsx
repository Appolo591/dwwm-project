import styles from './AddTaskForm.module.css'
import { useState ,useContext} from 'react'
import { AuthContext } from '../../../context/AuthContext';
import { API_URL } from '../../../config/api';
// import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const AddTaskForm = ({onTaskAdded}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [category, setCategory] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    // const navigate = useNavigate();
    const { user ,token } = useContext(AuthContext);
    
     // 2. Gestionnaire de soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        setError('');
        setIsSubmitting(true);

        // // 👇 AJOUTE CES TROIS LOGS ICI 👇
        // console.log("=== SÉCURITÉ ADD TASK ===");
        // console.log("1. user depuis le Context :", user);
        // console.log("2. user depuis le localStorage :", JSON.parse(localStorage.getItem('user')));
        // console.log("3. token utilisé :", token);
    
        //validation côté Front
        if (!title.trim() || !description.trim()) {
            setError('Veuillez remplir tous les champs.');
            setIsSubmitting(false);
            return;
        }

        //  SÉCURITÉ ANTI-ASYNCHRONISME :
        // Si l'état "user" de React est encore vide (juste après l'inscription),
        // on extrait immédiatement l'ID depuis le localStorage de secours.
        const savedUser = JSON.parse(localStorage.getItem('user'));
        const currentUserId = user?.id || savedUser?.id;

        // console.log("4. ID final retenu et envoyé :", currentUserId);
        // console.log("=========================");

        if (!currentUserId) {
            setError("Erreur de session : Impossible de récupérer votre identifiant. Veuillez vous reconnecter.");
            toast.error("Utilisateur non identifié.");
            setIsSubmitting(false);
            return;
        }

        // console.log("Données envoyées au PHP :", {
        //     title: title,
        //     description: description,
        //     priority: priority,
        //     category_id: category,
        //     user_id: userId
        // })

        try {
            // 3. Appel API vers ton Backend PHP (pense à ton API_URL config)
            const response = await fetch(`${API_URL}/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({  title: title, description: description, priority: priority, category_id: Number(category), user_id: Number(currentUserId) }), // On envoie les données en JSON
            });

            const result = await response.json();
            console.log('Données recues du PHP', result);

            // 4. Gestion de la résponse de ton Backend PHP
            if (result.status === 'success') {
                setTitle('');
                setDescription('');
                setPriority('');
                setCategory('');
                setError('');   
                
                if (onTaskAdded) {
                    onTaskAdded(result.data);
                }
                toast.success('Tâche ajoutée !');
                window.location.href = `/tasks/${currentUserId}`;
            } else {
                setError(result.message || 'Une erreur est survenue côté serveur.');
                toast.error('Une erreur est survenue.');
            }
        } catch (error) {
            console.error('Error API:', error);
            setError('Impossible de contacter le serveur');
            toast.error('Erreur de connexion au serveur');
            
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
                <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="" disabled >Choisir une catégorie</option>
                <option value="1">Sport</option>
                <option value="2">Travail</option>
                <option value="3">Personnel</option>
                </select>
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="priority">Priorité</label>
                <select id="priority" value ={priority} onChange={(e) => setPriority(e.target.value)} required >
                <option value="" disabled >Choisir une priorité</option>
                <option value="low">Basse (Low)</option>
                <option value="medium">Moyenne (Medium)</option>
                <option value="high">Haute (High)</option>
                </select>
            </div>

            <button type="submit" className={styles.submitButton} disabled={isSubmitting} >Ajouter la tâche</button>
            </form>
        </div>  
    )
}   

export default AddTaskForm