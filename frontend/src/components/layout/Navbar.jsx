import { Link , useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

const Navbar =()=> {

  const location = useLocation();
  
  return (
  <nav className={styles.navbar}>
    {location.pathname !== '/' && <Link to="/" className={`${styles.active} ${styles.navLink}`} >Accueil</Link>}
    
    <ul className={styles.navLinks}>
    <Link to="/login" className={styles.navLink}><li>Connexion</li></Link>
    <Link to="/register" className={styles.navLink}><li>Inscription</li></Link>
    <Link to="/logout" className={styles.navLink}><li>Déconnexion</li></Link>

    </ul>
  </nav>
  )
}

export default Navbar