import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = () => {
    const { isLoggedIn, loading } = useContext(AuthContext);

    // Si le contexte est encore en train de vérifier le token (optionnel selon ta logique)
    if (loading) return <p>Chargement...</p>;

    // Si l'utilisateur n'est pas connecté, on redirige vers /login
    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    // Si connecté, on affiche les composants enfants (grâce à Outlet)
    return <Outlet />;
};

export default ProtectedRoute;