import { Routes, Route } from 'react-router-dom';
import './App.css'
import Layout from './components/layout/Layout'
import AddTask from './pages/AddTask';
import Home from './pages/Home';
import EditTask from './pages/EditTask';
import Login from './pages/Login';
import Register from './pages/Register';
import TaskDetail from './pages/TaskDetail';
import Profil from './pages/Profil';
import ResetPassword from './pages/Contact';
import MyTasks from './pages/MyTasks';
import AllTasks from './pages/AllTasks';
import EditProfil from './pages/EditProfil';
import {Toaster} from 'react-hot-toast';
import ButtonUsage from './components/utils/ButtonUsage';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <>
      <Toaster 
        position="top-center" 
        reverseOrder={false} 
        toastOptions={{
          duration: 4000,
          className: 'custom-toast',
        }}
      />
      <Routes>                
        <Route path="/" element={<Layout/>} >
          {/* --- ROUTES PUBLIQUES --- */}
          <Route index element={<Home/>} />
          <Route path="login" element={<Login/>} />
          <Route path="register" element={<Register/>} />
          <Route path="contact" element={<ResetPassword/>} />

          {/* --- ROUTES PRIVÉES (On enveloppe tout ce qui nécessite un token) --- */}
          <Route element={<ProtectedRoute />}>
            <Route path="task/:id" element={<TaskDetail/>} />
            <Route path="add" element={<AddTask/>} />
            <Route path="edit/:id" element={<EditTask/>} />
            <Route path="profil/:id" element={<Profil/>} />
            <Route path="edit-profil/:id" element={<EditProfil/>} />
            <Route path="all-tasks" element={<AllTasks/>} />
            <Route path="tasks/:id" element={<MyTasks/>} />
            <Route path="users" element={<h2> liste des users</h2>} />
          </Route>

          {/* --- AUTRES --- */}
          <Route path="logout">
            <Route index element={<h2>Logout</h2>} />
            <Route path="test" element={<h3>test</h3>} />
          </Route>
          
          <Route path="*" element={<h2>Oups ! Page introuvable.</h2>} />
        </Route>  
      </Routes>
    </>
  )
}

