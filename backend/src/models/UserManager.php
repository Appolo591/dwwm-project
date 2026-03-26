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
}