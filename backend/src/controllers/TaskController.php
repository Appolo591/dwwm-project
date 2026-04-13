<?php
namespace Paull\Backend\Controllers; // On suit le chemin PSR-4 + le nom du dossier
use Exception;
use Paull\Backend\Models\TaskManager;
use Paull\Backend\Controllers\AuthController;
use Paull\Backend\Utils\Utilities;


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

    public function tasksByUser($id) {

    //vérification du token
        $userData = AuthController::checkAuth();
        
        if($userData->uid != $id) {
            Utilities::sendJson(401, ["message" => "Accès refusé. Token manquant."]);
        }

        $taskManager = new TaskManager();
        $tasks = $taskManager->getTasksByUser($id);

        if (ob_get_length()) ob_clean();

        header("Content-Type: application/json; charset=utf-8");

        if (!$tasks) {
            http_response_code(404); // Non trouvé
            echo json_encode([
                "status" => "error",
                "message" => "Liste de tâches introuvable."
            ]);
            return;
        }
        http_response_code(200);
        echo json_encode([
            "status" => "success",
            "count" => count($tasks),
            "message" => "Liste des tâches",
            "data" => $tasks
            ]);
        exit;
    }

    public function addTask() {

        // 1. LIRE LE JSON ENTRANT (Crucial pour React)
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        // 2. RÉCUPÉRER LES DONNÉES DEPUIS LE TABLEAU $data
        // On utilise l'opérateur ?? (null coalescing) pour éviter les Warnings si une clé manque
        $title = isset($data['title']) ? htmlspecialchars($data['title']) : null;
        $description = isset($data['description']) ? htmlspecialchars($data['description']) : null;
        
        // On récupère aussi les IDs (user et category) et la priorité
        $priority = $data['priority'] ?? 'low';
        $category = $data['category_id'] ?? null;
        $user_id  = $data['user_id'] ?? null;

        if (empty($title) || empty($description || empty($user_id))) {
            http_response_code(400); // Mauvaise requête
            echo json_encode([
                "status" => "error",
                "message" => "Veuillez remplir tous les champs.(title, description, user_id)"
            ]);
            return;
        }

        $taskManager = new TaskManager();
        $taskId = $taskManager->addTask($title, $description, $priority, $category , $user_id);
        
        if($taskId) {
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
        }else {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Une erreur est survenue lors de l'ajout de la tâche."
            ]);
        }
    }

    public function editTask($id) {

        // 1. LIRE LE JSON ENTRANT (Crucial pour React)
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        // 2. RÉCUPÉRER LES DONNÉES DEPUIS LE TABLEAU $data
        // On utilise l'opérateur ?? (null coalescing) pour éviter les Warnings si une clé manque
        $title = isset($data['title']) ? htmlspecialchars($data['title']) : null;
        $description = isset($data['description']) ? htmlspecialchars($data['description']) : null;
        $priority = $data['priority'] ?? 'low';
        $category = $data['category_id'] ?? '3';


        if (empty($title) || empty($description)) {
            http_response_code(400); // Mauvaise requête
            echo json_encode([
                "status" => "error",
                "message" => "Veuillez remplir tous les champs.(title, description)"
            ]);
            return;
        }

        $taskManager = new TaskManager();

        try{
            $taskManager->editTask($id, $title, $description, $priority, $category);
            
            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "message" => "Tâche modifiée avec succès.",
                "data" => [
                    "id" => $id,
                    "title" => $title,
                    "description" => $description,
                    "priority" => $priority,
                    "category_id" => $category,
                    "updated_at" => date('Y-m-d H:i:s')
                ]
            ]); 
            }catch (Exception $e){
                http_response_code(500);
                echo json_encode([
                    "status" => "error",
                    "message" => "Erreur technique :" .$e->getMessage()
                ]);
            }  
    }

    public function deleteTask($id) {
        $taskManager = new TaskManager();
        $taskManager->deleteTask($id);
        http_response_code(200);
        echo json_encode([
            "status" => "success",
            "message" => "Tâche supprimée avec succès."
        ]);
    }
}