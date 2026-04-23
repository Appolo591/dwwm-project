import { useEffect, useState } from 'react';
import TaskList from "../components/tasks/TaskList/TaskList"
import { API_URL } from '../config/api';
import { Link } from 'react-router-dom';

const Home =()=> {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
        <TaskList tasks={tasks}/>
        <Link to="/add"><button className="btn btn-secondary">Ajouter une tâche</button></Link>
    </div>  
)
}
export default Home