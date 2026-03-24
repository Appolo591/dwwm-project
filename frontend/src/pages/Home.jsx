import { useEffect, useState } from 'react';
import TaskList from "../components/tasks/TaskList/TaskList"
import { API_URL } from '../config/api';

const Home =()=> {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Remplace par ton URL exacte calculée par ROOT dans ton PHP
        fetch(`${API_URL}/accueil`)
            .then(response => response.json())
            .then(result => {
                if (result.status === "success") {
                    setTasks(result.data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Erreur de fetch:", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Chargement des taches...</p>;

return (
    <div>
        <h1>HomePage</h1>
        <TaskList tasks={tasks}/>
    </div>  
)
}
export default Home