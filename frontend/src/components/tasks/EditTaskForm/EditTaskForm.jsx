import styles from './EditTaskForm.module.css'
import { useParams , useNavigate } from 'react-router-dom';
import { useState , useEffect} from 'react';
import { API_URL } from '../../../config/api';
import toast from 'react-hot-toast'; 

// const handleUpdate = async (e) => {
//     // ... ton fetch
//     if (result.status === "success") {
//         console.log("Le toast devrait s'afficher maintenant"); // Vérifie si ce log s'affiche
//         toast.success('Tâche mise à jour !'); 
        
//         setTimeout(() => {
//             navigate(`/task/${id}`);
//         }, 2000);
//     }
// }

const EditTaskForm = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [category, setCategory] = useState('');


    const handleUpdate = async (e) => {
        e.preventDefault();
       const updatedTask = {
           id: id,
           title: title,
           description: description,
           priority: priority,
           category_id: category
       };

       console.log("Données envoyées au PHP :", updatedTask);

       try{
        const response = await fetch(`${API_URL}/edit/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedTask)
        });

        const result = await response.json();
        console.log("Réponse du serveur PHP :", result);

        if (result.status === "success") {
            // console.log("Le toast devrait s'afficher maintenant");
            toast.success('Tâche mise à jour !');
            
            setTimeout(() => {
            navigate(`/`);
            }, 2000);
        }else{
            toast.error(result.message);
        }

        }catch(error){
        console.log(error);
       }
    }

    useEffect(() => {
        fetch(`${API_URL}/task/${id}`)
          .then(response => response.json())
          .then(result => {
            if (result.status === "success"){
            console.log(result)
            setTitle(result.data.title);
            setDescription(result.data.description);
            setPriority(result.data.priority);
            setCategory(result.data.category_id);
            }
          })
          .catch(error => console.error(error));
      }, [id]);


    return (
        <form method="PUT" className={styles.editform} onSubmit={handleUpdate}>
            <legend>Formulaire de mise à jour tâche n°{id}</legend>


                <label htmlFor="title">Titre</label>
                <input type="text" value = {title} onChange={(e) => setTitle(e.target.value)}/>

                <label htmlFor="description">Description</label>
                <textarea type="textarea" value = {description}  onChange={(e) => setDescription(e.target.value)} />

                <label htmlFor="priority">Priorité</label>
                <select name="priority" id="priority" value = {priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="low">Basse</option>
                    <option value="medium">Moyenne</option>
                    <option value="high">Haute</option>
                </select>

                <label htmlFor="category">Catégorie</label>
                <select name="category" id="category" value = {category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="1">Sport</option>
                    <option value="2">Travail</option>
                    <option value="3">Perso</option>
                </select>
                <button type="submit" onClick={handleUpdate} className={styles.updateButton}>Mettre à jour</button>
        </form>
    )
}

export default EditTaskForm