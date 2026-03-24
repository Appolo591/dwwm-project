import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main >
        {/* Ici s'injecteront HomePage ou AddTaskPage */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;