<?php
namespace Paull\Backend\Controllers; // On suit le chemin PSR-4 + le nom du dossier

use Paull\Backend\Models\TaskManager;

class MainController {
    public function index() {
        // On instancie le manager
        $taskManager = new TaskManager();

        // On lui demande les données
        $tasks = $taskManager->getAllTasks();
        // 3. On répond en JSON
        echo json_encode([
            "status" => "success",
            "count" => count($tasks),
            "data" => $tasks
        ]);
    }
}