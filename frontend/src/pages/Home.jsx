import ButtonUsage from "../components/utils/ButtonUsage";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
        <div>
            <h1>Bienvenue sur My Tasks , l'application de gestion de vos tâches personnelles !!</h1>
        </div>
        <Link to="/login"><ButtonUsage title="Se connecter" /></Link>
        <Link to="/register"><ButtonUsage title="S'inscrire" /></Link>
        
        </>
    )
}