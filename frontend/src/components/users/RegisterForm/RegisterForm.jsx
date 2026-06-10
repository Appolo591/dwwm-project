import { useState ,useContext} from "react"
import { API_URL } from "../../../config/api";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import styles from './RegisterForm.module.css'

const RegisterForm = () => {
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    // On crée un état pour stocker les données du formulaire
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Fonction pour mettre à jour l'état quand l'utilisateur tape
    const handleChange = (e) => {
        if (passwordError && e.target.name === "password"){
           setPasswordError(""); 
        } 

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        // console.log("Données envoyées au serveur :", formData);

        if (!passwordRegex.test(formData.password)) {
            setPasswordError("Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère special.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            // console.log('données envoyées au serveur', result);

            if (response.ok) { 
                toast.success('Inscription reussie !'); 
                console.log("INSCRIPTION REUSSIE, REPO DU PHP :", result);

                const userWithCleanId = {...result.data, id: Number(result.data.id)};
                login(result.token, userWithCleanId);
                
                setTimeout(() => {
                    navigate(`/profil/${userWithCleanId.id}`);
                }, 1500);
            }else{
                toast.error(result.message || 'Une erreur est survenue lors de l\'inscription.');
            }
        } catch (error) {
            console.error("Erreur réseau ", error);
            toast.error('Impossible de contacter le serveur.');
        }
    };

    return (
    <div className="container mt-5 px-3">
        <form onSubmit={handleRegister} className={styles.form}>
            <legend>formulaire d'inscription</legend>

            <label htmlFor="name">identifiant</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required/>

            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required/>

            <label htmlFor="password">Mot de Passe</label>
            <div className="input-group">
            <input type={showPassword ? "text" : "password"} name="password" id="password" value={formData.password} onChange={handleChange} required
                   className={`form-control ${passwordError ? 'is-invalid' : ''}`} />
            
            <button type="button" className="btn btn-outline-secondary" onClick={togglePasswordVisibility}>
                {showPassword ? 'Masquer' : 'Afficher'}
            </button>
            </div>

            {passwordError && (
                <div className={styles.errorFeedback}>
                        ⚠️ {passwordError}
                </div>
            )}

            <button type="submit" className={styles.submitBtn}>Inscription</button>
        </form> 
    </div>
)
}        
export default RegisterForm