<?php
namespace Paull\Backend\Controllers; // On suit le chemin PSR-4 + le nom du dossier

use Paull\Backend\Models\TaskManager;

class MainController {
    public function index() {
        // On instancie le manager
        $taskManager = new TaskManager();

        // On lui demande les données
        $tasks = $taskManager->getAllTasks();

        // 2. On vérifie si la tâche existe
        if (!$tasks) {
            http_response_code(404);
            echo json_encode(["status" => "error", "message" => "Liste de Tâches introuvable"]);
            return;
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