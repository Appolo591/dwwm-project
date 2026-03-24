import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Layout from './components/layout/Layout'
import AddTask from './pages/AddTask';
import Home from './pages/Home';
import EditTask from './pages/EditTask';
import Login from './pages/Login';
import Register from './pages/Register';
import TaskDetail from './pages/TaskDetail';

function App() {


  return (
    <Router>
        <Routes>        
          <Route path="/" element={<Layout/>} >
            <Route index element={<Home/>} />
            <Route path="task/:id" element={<TaskDetail/>} />
            <Route path="add" element={<AddTask/>} />
            <Route path="edit" element={<EditTask/>} />
            <Route path="login" element={<Login/>} />
            <Route path="register" element={<Register/>} />
            <Route path="*" element={<h2>Oups ! Page introuvable.</h2>} />
          </Route>  
        </Routes>
    </Router>
  )
}

export default App
