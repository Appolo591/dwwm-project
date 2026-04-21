import { Link , useNavigate , useLocation} from 'react-router-dom'
import styles from './Navbar.module.css'
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';


const Navbar =()=> {

  const navigate = useNavigate();
  const location = useLocation();

  // 1. On récupère les infos et la fonction logout du contexte
  // Plus besoin de useState ni de useEffect ici !
  const { isLoggedIn, logout , user } = useContext(AuthContext);
  
  const handleLogout = () => {
    // 2. On appelle la fonction logout du contexte
    // Elle va vider le localStorage ET mettre à jour l'état global d'un coup
    logout();
    navigate('/login');
    toast.success('Vous avez bien été déconnecté !');
  };


  return (
  <nav className={styles.navbar}>
    {location.pathname !== '/' && <Link to="/" className={`${styles.active} ${styles.navLink}`} >AllTasks</Link>}
    
    {isLoggedIn ? (
                // --- CE QU'ON VOIT QUAND ON EST CONNECTÉ ---
                <>
                    <Link to="/tasks">Mes Tâches</Link>
                    <Link to={`/profil/${user?.id}`}>Mon Profil</Link> 
                    <button onClick={handleLogout} style={{ color: 'red' }}>
                        Déconnexion
                    </button>
                </>
            ) : (
                // --- CE QU'ON VOIT QUAND ON EST ANONYME ---
                <>
                    <Link to="/login">Connexion</Link>
                    <Link to="/register">Inscription</Link>
                </>
            )}
  </nav>
  )
}

export default Navbar