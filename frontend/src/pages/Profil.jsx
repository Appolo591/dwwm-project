import { useEffect, useState ,useContext} from "react"; 
import { useParams } from "react-router-dom";
import { API_URL } from "../config/api";
import { toast } from "react-hot-toast" 
import { useNavigate } from "react-router-dom";
import styles from './Profil.module.css'
import { AuthContext } from "../context/AuthContext";

const Profil = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {logout} = useContext(AuthContext);
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true); 

    const handleDelete = async () => {    
        if (!window.confirm("Etes-vous sur de vouloir supprimer votre compte ?")) return;

        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`${API_URL}/profil/${id}`, {
                method: "DELETE",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                 }
            });
            const result = await response.json();
            if (result.status === "success") {
                toast.success("Compte supprimé avec succès.");
                logout();
                navigate("/");
            } else {
                toast.error(result.message || "Une erreur est survenue lors de la suppression du compte.");
            }
        } catch (error) {
            console.error("Erreur :", error);
            toast.error("Le serveur ne répond pas . Veuillez contacter l'administrateur.");
        }
    };

    useEffect(() => {
        let isMounted = true; //Le composant est là

        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if(!id) return;
            try {
                const response = await fetch(`${API_URL}/profil/${id}`, {
                    method: "GET",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                     }
                    
                });

                const result = await response.json();
                if (isMounted) {
                    if (result.status === "success") {
                    setUser(result.data); // On stocke les infos de l'user
                    } else {
                        if (response.status === 401) {
                            toast.error("Session expirée , veuillez vous reconnecter.");
                            logout();
                            navigate ("/login");  
                        }else{
                            toast.error(result.message || "Une erreur est survenue lors de la récupération du profil.");
                        }
                    }
                };
                
            } catch (error) {
                if(isMounted){
                    console.error("Erreur technique :", error);
                    toast.error("Impossible de joindre le serveur");
                }
            } finally {
                if(isMounted)
                setLoading(false);
            }
        };

        fetchUser();

        return () => {
            isMounted = false;
        }
    }, [id, navigate, logout]);

    if (loading) return <p>Chargement du profil...</p>;
    if (!user) return <p>Aucun utilisateur trouvé.</p>;

    return (
        <div className="profil-container">
            <div className="user-card">
                <p><strong>Profil ID :</strong> {id}</p>
                <p><strong>Nom :</strong> {user.name}</p>
                <p><strong>Email :</strong> {user.email}</p>
            </div>
            <div className={styles.btnContainer}>
                <button>Modifier le profil</button>
                <button onClick={handleDelete}>Supprimer le compte</button>
            </div>
        </div>
    );
};

export default Profil;