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

        console.log("=== CHARGEMENT DE MY TASKS ===");
        console.log("ID détecté dans l'URL :", id);

        //  MODIFICATION ICI : On va chercher le token de secours dans le localStorage 
        // si le Context React est en train de se synchroniser.
        const activeToken = token || localStorage.getItem('token');

        if(!id|| !activeToken) 
            return;

        const getTasks = async () => {
            setLoading(true);

        try {
            const response = await fetch(`${API_URL}/tasks/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${activeToken}` 
                }
            });

            const result = await response.json();
            // console.log("Réponse du serveur :", result);

            if (response.ok && result.status === "success") {
                const sortedTasks = result.data.sort((a, b) => b.id - a.id);
                setTasks(sortedTasks);
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
        <div className="container mt-4">
            <h1>Mes Tâches</h1>
            {/* <TaskList tasks={tasks} />
            <Link to="/add"><button className="btn btn-secondary">Ajouter une tâche</button></Link> */}
            {/* Si l'utilisateur n'a pas encore de tâches, on affiche un message propre */}
            {tasks.length === 0 ? (
                <div className="alert alert-info text-center py-4">
                    <p className="mb-3">Vous n'avez pas encore de tâches enregistrées.</p>
                    <Link to="/add">
                        <button className="btn btn-primary">Créer ma première tâche</button>
                    </Link>
                </div>
            ) : (
                <>
                    <TaskList tasks={tasks} />
                    <div className="mt-3">
                        <Link to="/add">
                            <button className="btn btn-primary">Ajouter une tâche</button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    )
}