import {useState } from "react";
import { AuthContext } from "./AuthContext";
import { API_URL } from "../config/api";

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        // On vérifie si savedUser existe ET n'est pas la chaîne "undefined"
        return (savedUser && savedUser !== "undefined") ? JSON.parse(savedUser) : null;
    });
    
    const [isLoggedIn, setIsLoggedIn] = useState(!!user);
    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setIsLoggedIn(true);
    };

    const logout = async () => {
        try {
            // On demande au serveur PHP de supprimer le cookie HttpOnly
            await fetch(`${API_URL}/logout`, {
                method: "POST", 
                credentials: "include" // Nécessaire pour envoyer le cookie à supprimer
            });
        } catch (error) {
            console.error("Erreur lors de la déconnexion sur le serveur :", error);
        } finally {
            // Quoi qu'il arrive (même si le serveur est en panne), on nettoie le front-end
            localStorage.removeItem('user');
            setUser(null);
            setIsLoggedIn(false);
        }
    };

    return (
        <AuthContext.Provider value={{isLoggedIn, user, login, logout}}>
            {children}
        </AuthContext.Provider>
        );
};
