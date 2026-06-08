<?php
namespace Paull\Backend\Controllers; // On suit le chemin PSR-4 + le nom du dossier

use Paull\Backend\Models\TaskManager;
use Paull\Backend\Utils\Utilities;

class MainController {
    public function index() {

        // AuthController::checkAdmin();

        // On instancie le manager
        $taskManager = new TaskManager();

        // On lui demande les données
        $tasks = $taskManager->getAllTasks();

        // 2. On vérifie si la tâche existe
        if (!$tasks) {
            Utilities::sendJson(404, [
                "status" => "error", 
                "message" => "Liste de Tâches introuvable"
                ]);
    
        }else{
            http_response_code(200);
            header("Content-Type: application/json");
            echo json_encode([
                "status" => "success",
                "count" => count($tasks),
                "message" => "Liste des tâches",
                "data" => $tasks
            ]);
        }
        
    }
}