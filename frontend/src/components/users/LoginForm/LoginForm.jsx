import { Link ,useNavigate } from 'react-router-dom'
import styles from './LoginForm.module.css'
import toast from 'react-hot-toast'
import { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { API_URL } from '../../../config/api';

const LoginForm = () => {

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleLogin = async(e) => {
        e.preventDefault()

        try{
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: e.target.elements.name.value,
                    password: e.target.elements.password.value
                })
            });
            const result = await response.json();
            console.log('données envoyées au serveur', result);

            if (response.ok) { 
                toast.success('Connexion reussie !'); 

        //stockage du token et des infos de l'utilisateur dans le localstorage
                // localStorage.setItem('token', result.token);
                // localStorage.setItem('user', JSON.stringify(result.user));

                //Stockage du tocken , user , et isLoggedIn dans le context(navbar )
                login(result.token, result.user);

                setTimeout(() => {
                    navigate(`/profil/${result.user.id}`);
                }, 1000);
            }else{
                toast.error(result.message || 'Une erreur est survenue lors de la connexion.');
            }
        }catch(error){
            console.log(error);
            toast.error('Le serveur ne répond pas.Veuillez réessayer plus tard.');
        }
        
    }

    return (
        <>
            <form  className = {styles.form} onSubmit = {handleLogin} >
                <legend>formulaire de connexion</legend>
                <label htmlFor="name">Nom</label>
                <input type="text" name="name" id="name" autoFocus required  />

                <label htmlFor="password">Mot de Passe</label>
                <input type="password" name="password" id="password" required/>

                <button type="submit" >Connexion</button>

                <div className={styles.links}>
                    <Link to="/register">S'inscrire</Link>
                    <Link to="/reset-password">Mdp oublié ?</Link>
                </div>

            </form>
        </>
    )       
}

export default LoginForm