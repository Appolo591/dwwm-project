import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const ProtectedRoute = ({ adminOnly = false }) => {
    const { isLoggedIn, loading , user } = useContext(AuthContext);

    // Récupération de secours dans le localStorage si le Context met du temps à s'hydrater
    const savedUser = JSON.parse(localStorage.getItem('user'));
    const currentUser = user || savedUser;

    // Si le contexte est encore en train de vérifier le token (optionnel selon ta logique)
    if (loading) return <p>Chargement...</p>;

    // Si l'utilisateur n'est pas connecté, on redirige vers /login
    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    // 2. Si la route est réservée à l'admin mais que l'utilisateur est un simple 'user'
    if (adminOnly && currentUser?.role !== 'admin') {
        toast.error("Accès refusé : Réservé aux administrateurs !" , { id: "admin-error" });
        // On le redirige vers ses propres tâches
        return <Navigate to={`/tasks/${currentUser?.id || ''}`} replace />;
    }

    // Si connecté, on affiche les composants enfants (grâce à Outlet)
    return <Outlet />;
};

export default ProtectedRoute;