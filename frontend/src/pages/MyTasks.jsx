import { useParams } from "react-router-dom";
import { useEffect , useState } from "react";
import { API_URL } from "../config/api";
import TaskList from "../components/tasks/TaskList/TaskList";

export default function MyTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    
    // 2. On ajoute les headers à la requête fetch
    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     console.log("URL envoyée: ", API_URL/tasks/{id} )
    //     fetch(`${API_URL}/tasks/${id}`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(result => {
    //             if (result.status === "success") {
    //                 setTasks(result.data);
    //             }
    //             setLoading(false);
    //         })
    //         .catch(error => {
    //             console.error("Erreur de fetch:", error);
    //             setLoading(false);
    //         });
    //     if(id) {
    //         getTasks();
    //     }
        
    // }, [id]);

    useEffect(() => {
    const getTasks = async () => {
        const token = localStorage.getItem("token");
        
        console.log("Token envoyé :", token); // Vérification console
        console.log("ID utilisé :", id);      // Vérification console

        try {
            const response = await fetch(`${API_URL}/tasks/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                }
            });

            const result = await response.json();
            console.log("Réponse du serveur :", result);

            if (result.status === "success") {
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

    if (id) {
        getTasks();
    }
    }, [id]);

    if (loading) return <p>Chargement des taches...</p>;

    return (
        <div>
            <h2>Les Tâches de l'utilisateur :  <strong>{id}</strong></h2>
            <TaskList tasks={tasks}/>
        </div>
    );
}       
