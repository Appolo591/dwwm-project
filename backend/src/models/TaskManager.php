<?php
namespace Paull\Backend\Models;

use Paull\Backend\Core\Database;

class TaskManager {
    private $pdo;

    public function __construct() {
        // On récupère la connexion une seule fois à l'instanciation
        $this->pdo = Database::getConnection();
    }

    /**
     * Récupère toutes les tâches de la BDD
     */
    public function getAllTasks() {
        $stmt = $this->pdo->query("SELECT * FROM tasks ORDER BY id ASC");
        return $stmt->fetchAll();
    }

    
    //   récupérer une seule tâche
    public function getTaskById($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM tasks WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch();
    }

    //  ajouter une tâche
    public function addTask($title, $description) {
        $stmt = $this->pdo->prepare("INSERT INTO tasks (title, description) VALUES (?, ?)");
        $stmt->execute([$title, $description]);
        return $this->pdo->lastInsertId();
    }

    //   modifier une tâche
    public function updateTask($id, $title, $description) {
        $stmt = $this->pdo->prepare("UPDATE tasks SET title = ?, description = ? WHERE id = ?");
        $stmt->execute([$title, $description, $id]);
    }

    //  supprimer une tâche
    public function deleteTask($id) {
        $stmt = $this->pdo->prepare("DELETE FROM tasks WHERE id = ?");
        $stmt->execute([$id]);
    }

}