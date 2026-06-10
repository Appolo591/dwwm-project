import { Link ,useNavigate } from 'react-router-dom'
import styles from './LoginForm.module.css'
import toast from 'react-hot-toast'
import { useContext , useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { API_URL } from '../../../config/api';

const LoginForm = () => {
    
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    
    // Fonction pour basculer l'état
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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

                //Stockage du tocken , user , et isLoggedIn dans le context(navbar )
                login(result.token, result.user);

                setTimeout(() => {
                    navigate(`/tasks/${result.user.id}`);
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
        <div className="container mt-5 px-3">
            <form  className = {styles.form} onSubmit = {handleLogin} >
                <legend>formulaire de connexion</legend>
                <label htmlFor="name">Identifiant</label>
                <input type="text" name="name" id="name" autoFocus required  />

                <label htmlFor="password">Mot de Passe</label>
                {/* 2. On utilise la classe Bootstrap 'input-group' pour coller le bouton à l'input */}
                <div className="input-group ">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        name="password" 
                        id="password" 
                        required
                        className="form-control" // Classe Bootstrap essentielle ici
                    />
                    {/* 3. Le bouton Bootstrap qui vient se greffer à la fin de l'input */}
                    <button 
                        className="btn btn-outline-secondary" 
                        type="button" // ⚠️ TRÈS IMPORTANT : type="button" pour éviter que ce bouton ne soumette le formulaire !
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? "Masquer" : "Afficher"}
                    </button>
                </div>

                <button type="submit"className={styles.submitBtn}>Connexion</button>

                <div className={styles.links}>
                    <Link to="/register">S'inscrire</Link>
                    <Link to="/contact">Mot de passe oublié ?</Link>
                </div>

            </form>
        </div>
    )       
}

export default LoginForm