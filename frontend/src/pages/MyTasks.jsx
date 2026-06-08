import TaskList from '../components/tasks/TaskList/TaskList';
import { useEffect, useState , useContext } from 'react';
import { API_URL } from '../config/api';
import { AuthContext } from '../context/AuthContext';
import { Link , useParams} from 'react-router-dom';

export default function MyTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useContext(AuthContext);
    const { id } = useParams();
    
    useEffect(() => {

        if(!id|| !token) 
        return;

        const getTasks = async () => {
            setLoading(true);
            // console.log("Token envoyé :", token); // Vérification console
            // console.log("ID utilisé :", id);      // Vérification console

        try {
            const response = await fetch(`${API_URL}/tasks/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                }
            });

            const result = await response.json();
            // console.log("Réponse du serveur :", result);

            if (response.ok && result.status === "success") {
                setTasks(result.data);
            } else {
                console.error("Le serveur a dit non :", result.message);
            }
        } catch (err) {
            console.error("Erreur réseau :", err);
        } finally {
            setLoading(false);
        }
        };
        getTasks();
    }, [id, token]);

    if (loading) return <p>Chargement des taches...</p>;

    return (
        <div>
            <h1>MyTasks</h1>
            <TaskList tasks={tasks} />
            <Link to="/add"><button className="btn btn-secondary">Ajouter une tâche</button></Link>
        </div>
    )
}