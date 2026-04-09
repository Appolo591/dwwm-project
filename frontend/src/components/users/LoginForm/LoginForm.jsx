import { Link } from 'react-router-dom'
import styles from './LoginForm.module.css'

const LoginForm = () => {
    return (
        <>
            <form method="post" className = {styles.form} action="/login" >
                <legend>formulaire de connexion</legend>
                <label htmlFor="name">Nom</label>
                <input type="text" name="name" id="name" />

                <label htmlFor="password">Mot de Passe</label>
                <input type="password" name="password" id="password" />

                <button type="submit">Connexion</button>

                <div className={styles.links}>
                    <Link to="/register">S'inscrire</Link>
                    <Link to="/reset-password">Mdp oublié ?</Link>
                </div>

            </form>
        </>
    )       
}

export default LoginForm