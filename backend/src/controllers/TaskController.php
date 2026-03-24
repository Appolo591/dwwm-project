<?php
namespace Paull\Backend\Controllers; // On suit le chemin PSR-4 + le nom du dossier

use Paull\Backend\Models\TaskManager;


class TaskController {
   
    public function oneTask($id) {

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

    public function addTask() {

        $title = htmlspecialchars($_POST['title']);
        $description = htmlspecialchars($_POST['description']);
        $priority = isset($_POST['priority']) ? $_POST['priority'] : null;
        $category = isset($_POST['category']) ? $_POST['category'] : null;

        if (empty($title) || empty($description)) {
            http_response_code(400); // Mauvaise requête
            echo json_encode([
                "status" => "error",
                "message" => "Veuillez remplir tous les champs."
            ]);
            return;
        }

        $taskManager = new TaskManager();
        $taskId = $taskManager->addTask($title, $description, $priority, $category);
        http_response_code(201);
        echo json_encode([
            "status" => "success",
            "message" => "Tâche ajoutée avec succès.",
            "data" => [
                "id" => $taskId,
                "title" => $title,
                "description" => $description,
                "priority" => $priority,
                "category" => $category
            ]
        ]);
    }

}