<?php 

namespace Paull\Backend\Models;

use Paull\Backend\Core\Database;

class UserManager {
    private $pdo;

    public function __construct() {
        $this->pdo = Database::getConnection();
    }

    public function getAllUsers(): array | false {
        
        $sql = "SELECT * 
                FROM users";

        $stmt = $this->pdo->query($sql);
        $stmt->execute();
        $results = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        return $results ;
    }

    public function getOneUser($id): array | false {
        $sql = "SELECT * 
                FROM users 
                WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
        $results = $stmt->fetch(\PDO::FETCH_ASSOC);
        return $results ;
    }

    public function createUser($name, $email, $password) {
        $sql = "INSERT INTO users (name, email, password) 
                VALUES (?, ?, ?)";
        $stmt = $this->pdo->prepare($sql);
        $success = $stmt->execute([$name, $email, $password]);
        if($success) {
            $userId = $this->pdo->lastInsertId();
            return $userId;
        }
        return false;
    }
}