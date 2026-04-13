<?php
namespace Paull\Backend\Models;

use Paull\Backend\Core\Database;

class TaskManager {
    private $pdo;

    public function __construct() {
        // On récupère la connexion une seule fois à l'instanciation
        $this->pdo = Database::getConnection();
    }

    public function getAllTasks(): array | false {
        
        $sql = "SELECT t.*, c.name AS category_name, u.name AS user_name 
                FROM tasks t
                LEFT JOIN users u ON t.user_id = u.id
                LEFT JOIN categories c ON t.category_id = c.id
                ORDER BY t.id ASC";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();
        $results = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        $stmt->closeCursor();
        return $results;
    }

    public function getTaskById($id): array | false {
        
        $sql = "SELECT t.*, c.name AS category_name, u.name AS user_name 
                FROM tasks t
                LEFT JOIN users u ON t.user_id = u.id
                LEFT JOIN categories c ON t.category_id = c.id
                WHERE t.id = ?";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
        $results = $stmt->fetch(\PDO::FETCH_ASSOC);
        $stmt->closeCursor();
        return $results;
    }

    public function getTasksByUser($userId): array | false {
        $sql = "SELECT t.*, c.name AS category_name, u.name AS user_name 
                FROM tasks t
                LEFT JOIN users u ON t.user_id = u.id
                LEFT JOIN categories c ON t.category_id = c.id
                WHERE t.user_id = ?
                ORDER BY t.id ASC";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$userId]);
        $results = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        $stmt->closeCursor();
        return $results;
    }

    //  ajouter une tâche
    public function addTask($title, $description, $priority, $category , $user_id) {
        $sql = "INSERT INTO tasks (title, description, priority, category_id , user_id, created_at) 
                VALUES (?, ? ,?, ?,?, NOW())";
        $stmt = $this->pdo->prepare($sql);
        $success = $stmt->execute([$title, $description, $priority, $category,$user_id]);
        if($success) {
            $taskId = $this->pdo->lastInsertId();
            return $taskId;
        }
        return false;
    }

    //   modifier une tâche
    public function editTask($id, $title, $description , $priority, $category) {
        $sql = "UPDATE tasks 
                SET title = ?, description = ?, priority = ?, category_id = ? , updated_at = NOW() 
                WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$title, $description, $priority, $category, $id]);
    }

    //  supprimer une tâche
    public function deleteTask($id) {
        $stmt = $this->pdo->prepare("DELETE FROM tasks WHERE id = ?");
        $stmt->execute([$id]);
        
    }

}