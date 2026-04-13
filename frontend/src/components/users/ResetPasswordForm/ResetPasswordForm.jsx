import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ResetPasswordForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleResetPassword = async(e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Veuillez entrer un email.");
            return;
        }

        console.log("Email envoyé par l'utilisateur: " ,email)
    
        // 1. Ici tu feras ton fetch vers PHP plus tard
        // console.log("Demande de reset pour :", email);

        toast.success("Un nouveau mot de passe vous sera envoyé par mail.");

        setTimeout(() => {
            navigate("/login");
        }, 2000);
    };


    return (
        <>
        <form onSubmit= {handleResetPassword}>
            <legend>Formulaire d'oubli</legend>
            <label htmlFor="email">mail</label>
            <input type="email" name="email" id="email" value={email} onChange={handleChange} required />
            <button type="submit" >Envoyer</button>
        </form>
        </>
    )
}

export default ResetPasswordForm