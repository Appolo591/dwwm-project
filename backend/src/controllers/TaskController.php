<?php
namespace Paull\Backend\Controllers; // On suit le chemin PSR-4 + le nom du dossier

use Paull\Backend\Models\TaskManager;


class TaskController {
   
    public function oneTask($id) {

    // 2. Sécurité : on vérifie que l'ID est bien présent
    if (empty($id) || !is_numeric($id)) {
        http_response_code(400); // Mauvaise requête
        echo json_encode([
            "status" => "error",
            "message" => "L'identifiant de la tâche est manquant."
        ]);
        return;
    }

    $taskManager = new TaskManager();
    $task = $taskManager->getTaskById($id);

    // 3. Vérification : est-ce que la tâche existe en base ?
    if (!$task) {
        http_response_code(404); // Non trouvé
        echo json_encode([
            "status" => "error",
            "message" => "Tâche introuvable."
        ]);
        return;
    }

    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "message" => "Détails de la tâche",
        "data" => $task
    ]);
}
}