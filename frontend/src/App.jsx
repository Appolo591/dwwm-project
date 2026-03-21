import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Layout from './components/layout/Layout'
import './App.css'
// import TaskList from './components/tasks/TaskList/TaskList'
import AddTaskForm from './components/tasks/AddTaskForm/AddTaskForm'
import Home from './pages/Home';

function App() {


  return (
    <Router>
        <Routes>        
          <Route path="/" element={<Layout/>} >
            <Route index element={<Home/>} />
            <Route path="/ajouter" element={<AddTaskForm />} />
            <Route path="*" element={<h2>Oups ! Page introuvable.</h2>} />
          </Route>  
        </Routes>
    </Router>
  )
}

export default App
