import UsersList from '../components/users/UsersList/UsersList'
import { useEffect, useState } from 'react';
import { API_URL } from '../config/api';

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(response => response.json())
            .then(result => {
                if (result.status === "success") {
                    setUsers(result.data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Erreur de fetch:", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Chargement des utilisateurs...</p>;

    return (
        <>
        <UsersList users={users}/>

        </>
    )
}