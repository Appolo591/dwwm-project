import { useState } from 'react';
import styles from './AddTaskForm.module.css'; // On n'oublie pas le style isolé
import { API_URL } from '../../../config/api';

const AddTaskForm = ({ onTaskAdded }) => {
  // 1. Déclaration du State pour chaque champ
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. Gestionnaire de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setError('');
    setIsSubmitting(true);

    // Petite validation côté Front
    if (!title.trim() || !description.trim()) {
      setError('Veuillez remplir tous les champs.');
      setIsSubmitting(false);
      return;
    }

    try {
      // 3. Appel API vers ton Backend PHP (pense à ton API_URL config)
      const response = await fetch(`${API_URL}/add-task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }), // On envoie les données en JSON
      });

      const result = await response.json();

      if (result.status === 'success') {
        // 4. Succès : On vide le formulaire et on prévient le parent
        setTitle('');
        setDescription('');
        if (onTaskAdded) onTaskAdded(result.data); // Optionnel : rafraîchir la liste
        alert('Tâche ajoutée avec succès !');
      } else {
        setError(result.message || 'Une erreur est survenue côté serveur.');
      }
    } catch (err) {
      console.error('Erreur API:', err);
      setError('Impossible de contacter le serveur.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 5. Le rendu JSX
  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h2>Ajouter une nouvelle tâche</h2>

      {error && <p className={styles.errorMessage}>{error}</p>}

      <div className={styles.inputGroup}>
        <label htmlFor="title">Titre de la tâche</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // Mise à jour du State en temps réel
          placeholder="Ex: Finir le design du footer"
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="description">Description (détails)</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Détaillez les étapes ici..."
          rows="4"
          required
        />
      </div>

      <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
        {isSubmitting ? 'Envoi en cours...' : 'Ajouter la tâche'}
      </button>
    </form>
  );
};

export default AddTaskForm;