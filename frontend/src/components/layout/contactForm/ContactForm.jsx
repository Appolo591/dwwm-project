import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ContactForm.module.css"; 

export default function ContactForm() {
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);

        // Appel direct à Formspree
        const response = await fetch("https://formspree.io/f/mnjydbdl", {
            method: "POST",
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            setStatus("Merci ! Votre message a bien été envoyé.");
            form.reset(); // Vide le formulaire

            setTimeout(() => {
                navigate('/');
            }, 3000);

        } else {
            setStatus("Oups ! Il y a eu un problème lors de l'envoi.");
        }
    };

    return (
        <div className={styles.container}>
            <h2>Contacter l'administrateur</h2>
            
            <form onSubmit={handleSubmit} className={styles.form}>
                <label htmlFor="email">Votre adresse email :</label>
                <input 
                    id="email" 
                    type="email" 
                    name="email" // Très important pour Formspree
                    required 
                />

                <label htmlFor="titre">titre de votre message :</label>
                <input 
                    id="titre" 
                    type="text" 
                    name="titre" // Très important pour Formspree
                    required 
                />

                <label htmlFor="message">Votre message :</label>
                <textarea 
                    id="message" 
                    name="message" // Très important pour Formspree
                    rows="5"
                    required 
                ></textarea>

                <button type="submit">Envoyer le mail</button>
            </form>

            {status && <p className={styles.statusMessage}>{status}</p>}
        </div>
    );
}