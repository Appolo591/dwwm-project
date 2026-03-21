import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main style={{ minHeight: '80vh', padding: '20px' }}>
        {/* Ici s'injecteront HomePage ou AddTaskPage */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;