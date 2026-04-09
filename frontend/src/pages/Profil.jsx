import { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";
import { API_URL } from "../config/api";
import { toast } from "react-hot-toast" // N'oublie pas l'import du toast

const Profil = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null); // État pour stocker l'utilisateur
    const [loading, setLoading] = useState(true); // État de chargement

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${API_URL}/profil/${id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                const result = await response.json();
                
                if (result.status === "success") {
                    setUser(result.data); // On stocke les infos de l'user
                } else {
                    toast.error(result.message || "Utilisateur introuvable");
                }
            } catch (error) {
                console.error("Erreur :", error);
                toast.error("Erreur lors de la récupération du profil");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    if (loading) return <p>Chargement du profil...</p>;
    if (!user) return <p>Aucun utilisateur trouvé.</p>;

    return (
        <div className="profil-container">
            <h1>Profil de l'utilisateur</h1>
            <hr />
            <div className="user-card">
                <p><strong>ID :</strong> {id}</p>
                <p><strong>Nom :</strong> {user.name}</p>
                <p><strong>Email :</strong> {user.email}</p>
                {/* On n'affiche JAMAIS le mot de passe, même haché */}
            </div>
            
            <button onClick={() => window.history.back()}>Retour</button>
        </div>
    );
};

export default Profil;