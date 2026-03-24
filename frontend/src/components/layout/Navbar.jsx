import { Link , useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

const Navbar =()=> {

  const location = useLocation();
  
  return (
  <nav className={styles.navbar}>
  {location.pathname !== '/' && <Link to="/" className={styles.navLink}>Accueil</Link>}
  </nav>
  )
}

export default Navbar