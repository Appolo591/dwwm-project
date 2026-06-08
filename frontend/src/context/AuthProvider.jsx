import {useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    // const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    // On vérifie si savedUser existe ET n'est pas la chaîne "undefined"
    return (savedUser && savedUser !== "undefined") ? JSON.parse(savedUser) : null;
    });

    const login = (newToken, userData) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userData));

        setToken(newToken);
        setIsLoggedIn(true);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{isLoggedIn, user, token , login, logout}}>
            {children}
        </AuthContext.Provider>
        );
};
