import { useState } from "react"
import { API_URL } from "../../../config/api";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    // On crée un état pour stocker les données du formulaire
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    // Fonction pour mettre à jour l'état quand l'utilisateur tape
    const handleChange = (e) => {
        if (passwordError) setPasswordError("");

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        // console.log("Données envoyées au serveur :", formData);

        if (!passwordRegex.test(formData.password)) {
            setPasswordError("Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère special.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            console.log('données envoyées au serveur', result);

            if (response.ok) { 
                toast.success('Inscription reussie !'); 
                
                setTimeout(() => {
                    navigate("/profil") ;
                }, 2000);
            }else{
                toast.error(result.message || 'Une erreur est survenue lors de l\'inscription.');
            }
        } catch (error) {
            console.error("Erreur réseau ", error);
            toast.error('Impossible de contacter le serveur.');
        }
    };

    return (
    <>
    <form onSubmit={handleRegister}>
        <legend>formulaire d'inscription</legend>

        <label htmlFor="name">Nom</label>
        <input type="text" name="name" id="name" onChange={handleChange} />

        <label htmlFor="password">Mot de Passe</label>
        <input type="password" name="password" id="password" onChange={handleChange}/>
        {passwordError && (
            <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '5px' }}>
                {passwordError}
            </p>
        )}

        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" onChange={handleChange}/>

        <button type="submit">Inscription</button>

    </form> 
        
    </>
)
}        
export default RegisterForm