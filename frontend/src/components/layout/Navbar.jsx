import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); 

  // On récupère les infos et la fonction logout du contexte
  const { isLoggedIn, logout, user } = useContext(AuthContext);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Vous avez bien été déconnecté !');
  };

  // Tableau des pages où l'on veut afficher le lien "Accueil" quand on est anonyme
  const showHomeLink = ['/register', '/login', '/reset-password'].includes(location.pathname);

  // 🔥 Fonction pour vérifier dynamiquement si un lien correspond à l'URL actuelle
  // (Prend en compte le début de l'URL pour gérer les IDs dynamiques comme /tasks/38)
  const isActivePath = (path) => {
    return location.pathname.startsWith(path) ? styles.active : '';
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        
        {/* LOGO OU NOM DE L'APPLICATION */}
        <div className={styles.navBrand}>
          <Link to="/">📝 MyTasks</Link>
        </div>

        {/* LIENS DE NAVIGATION */}
        <div className={styles.navLinks}>
          
          {/* Si on est sur une page d'authentification, on affiche le bouton Accueil */}
          {showHomeLink && !isLoggedIn && (
            <Link to="/" className={`${styles.navLink} ${styles.active}`}>
              Accueil
            </Link>
          )}
          
          {isLoggedIn ? (
            // --- CE QU'ON VOIT QUAND ON EST CONNECTÉ ---
            <>
              {user?.role === 'admin' && (
                <Link to="/all-tasks" className={`${styles.navLink} ${styles.adminLink} ${location.pathname === '/all-tasks' ? styles.active : ''} `}>
                 Toutes les Tâches
                </Link>
              )}
              <Link to={`/tasks/${user?.id}`} className={`${styles.navLink} ${isActivePath('/tasks')}`} >Mes Tâches</Link>
              <Link to={`/profil/${user?.id}`} className={`${styles.navLink} ${isActivePath('/profil')}`}>Mon Profil</Link> 
              
              
              <span className={styles.connectedUser}>
                Bonjour, <strong>{user?.name}</strong> {user?.role === 'admin' && <small className={styles.adminBadge}>Admin</small>}
              </span>
              
              <button onClick={handleLogout} className={styles.logoutBtn}>
                Déconnexion
              </button>
            </>
          ) : (
            // --- CE QU'ON VOIT QUAND ON EST ANONYME (Hors formulaires) ---
            !showHomeLink && (
              <>
                <Link to="/login" className={styles.navLink}>Connexion</Link>
                <Link to="/register" className={`${styles.navLink} ${styles.registerBtn}`}>Inscription</Link>
              </>
            )
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;