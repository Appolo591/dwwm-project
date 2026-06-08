import { Link , useNavigate} from 'react-router-dom'
import styles from './Navbar.module.css'
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';


const Navbar =()=> {

  const navigate = useNavigate();


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
    {location.pathname == '/register' && <Link to="/" className={`${styles.active} ${styles.navLink}`} >Accueil</Link>}
    {location.pathname == '/login' && <Link to="/" className={`${styles.active} ${styles.navLink}`} >Accueil</Link>}
    {location.pathname == '/reset-password' && <Link to="/" className={`${styles.active} ${styles.navLink}`} >Accueil</Link>}
    
    {isLoggedIn && (
                // --- CE QU'ON VOIT QUAND ON EST CONNECTÉ ---
                <>
                    {user?.role === 'admin' && (
                        <Link to={`/all-tasks`} className={styles.navLink}>
                            Toutes les Tâches
                        </Link>
                    )}
                    <Link to={`/tasks/${user?.id}`} className={styles.navLink}>Mes Tâches</Link>
                    <Link to={`/profil/${user?.id}`} className={styles.navLink}>Mon Profil</Link> 
                    <p className ={styles.connected}>Bonjour,{user?.name} {user?.role === 'admin' && '(admin)'}</p>
                    <button onClick={handleLogout} style={{ color: 'red' }}>
                        Déconnexion
                    </button>
                </>
            // ) : (
            //     // --- CE QU'ON VOIT QUAND ON EST ANONYME ---
            //     <>
            //         <Link to="/login" className={styles.navLink}>Connexion</Link>
            //         <Link to="/register" className={styles.navLink}>Inscription</Link>
            //     </>
            )}
  </nav>
  )
}

export default Navbar