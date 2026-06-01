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
import ResetPassword from './pages/ResetPassword';
import MyTasks from './pages/MyTasks';
import {Toaster} from 'react-hot-toast';
import ButtonUsage from './components/utils/ButtonUsage';

function App() {

  return (
    <>
      <Toaster position = "top-center" 
              reverseOrder = {false} 
              toastOptions={{
                duration: 4000,
                className: 'custom-toast',
              }}
      />
      <Routes>        
        <Route path="/" element={<Layout/>} >
          <Route index element={<ButtonUsage title = {"Page d'accueil"}/>} />
          <Route path="task/:id" element={<TaskDetail/>} />
          <Route path="add" element={<AddTask/>} />
          <Route path="edit/:id" element={<EditTask/>} />
          <Route path="login" element={<Login/>} />
          <Route path="register" element={<Register/>} />
          <Route path="logout">
            {/* Cette route s'affiche sur /logout */}
            <Route index element={<h2>Logout</h2>} />
            {/* Cette route s'affiche sur /logout/test */}
            <Route path="test" element={<h3>test</h3>} />
          </Route>
          <Route path="profil/:id" element={<Profil/>} />
          <Route path="reset-password" element={<ResetPassword/>} />
          <Route path="tasks" element={<Home/>} />
          <Route path="tasks/:id" element={<MyTasks/>} />
          <Route path="users" element={<h2> liste des users</h2>} />
          <Route path="*" element={<h2>Oups ! Page introuvable.</h2>} />
        </Route>  
      </Routes>
    </>
  )
}

export default App
