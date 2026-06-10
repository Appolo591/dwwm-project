<?php
namespace Paull\Backend\Controllers; // On suit le chemin PSR-4 + le nom du dossier
use Exception;
use Paull\Backend\Models\TaskManager;
use Paull\Backend\Controllers\AuthController;
use Paull\Backend\Utils\Utilities;


class TaskController {
   
    public function oneTask(int $id) {

    if (empty($id) || !is_numeric($id)) {
        Utilities::sendJson(400, [
            "status" => "error",
            "message" => "L'identifiant de la tâche est manquant."
        ]);
        return;
    }

    $taskManager = new TaskManager();
    $task = $taskManager->getTaskById($id);
    if (!$task) {
        Utilities::sendJson(404, [
            "status" => "error",
            "message" => "Tâche introuvable."
        ]);
        return;
    }
    Utilities::sendJson(200, [
        "status" => "success",
        "message" => "Détails de la tâche",
        "data" => $task
        ]);
    }

    public function tasksByUser(int $id) {

        // print_r(getallheaders());
        // exit;
   
        $userData = AuthController::checkAuth();
        
        // Récupère l'ID du token qu'il s'appelle 'id' (login) ou 'uid' (register)
        $authenticatedUserId = $userData->id ?? $userData->uid ?? null;

        if(!is_numeric($id) || $id != $authenticatedUserId) {
            Utilities::sendJson(403, [
                "status" => "error",
                "message" => "Accès refusé. Vous pouvez consulter uniquement vos propres tâches."
                ]);  
                exit;
        }

        $taskManager = new TaskManager();
        $tasks = $taskManager->getTasksByUser($id);

        if (ob_get_length()) ob_clean();

        header("Content-Type: application/json; charset=utf-8");

        if ($tasks === false) {
            Utilities::sendJson(404,[
                "status" => "error",
                "message" => "Liste de tâches introuvable."
            ]);
            exit;
        }
        Utilities::sendJson(200,[
            "status" => "success",
            "count" => count($tasks),
            "message" => "Liste des tâches",
            "data" => $tasks
            ]);
        
        exit;
    }

    public function addTask() {

        $userData = AuthController::checkAuth();

        // 1. LIRE LE JSON ENTRANT (Crucial pour React)
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        // 2. RÉCUPÉRER LES DONNÉES DEPUIS LE TABLEAU $data
        // On utilise l'opérateur ?? (null coalescing) pour éviter les Warnings si une clé manque
        $title = isset($data['title']) ? trim(htmlspecialchars($data['title'])) : null;
        $description = isset($data['description']) ? trim(htmlspecialchars($data['description'])) : null;
        
        // On récupère aussi les IDs (user et category) et la priorité
        $priority = $data['priority'] ?? 'low';
        $category = $data['category_id'] ?? null;

        // SÉCURITÉ ABSOLUE : L'ID de l'auteur vient DIRECTEMENT du token décodé,
        // plus besoin de faire confiance à ce que React envoie !
        $user_id = $userData->id ?? $userData->uid ?? null;


        if (empty($title) || empty($description) || empty($user_id)) {
            Utilities::sendJson(400,[
                "status" => "error",
                "message" => "Veuillez remplir tous les champs.(title, description, user_id)"
            ]);
            exit;
        }

        $taskManager = new TaskManager();
        $taskId = $taskManager->addTask($title, $description, $priority, $category , $user_id);

        header("Content-Type: application/json; charset=utf-8");
        
        if($taskId) {
            Utilities::sendJson(201,[
                "status" => "success",
                "message" => "Tâche ajoutée avec succès.",
                "data" => [
                    "id" => $taskId,
                    "title" => $title,
                    "description" => $description,
                    "priority" => $priority,
                    "category" => $category,
                    "user_id" => $user_id
                ]
            ]);
        }else {
            Utilities::sendJson(500,[
                "status" => "error",
                "message" => "Une erreur est survenue lors de l'ajout de la tâche."
            ]);
        }
        exit;
    }

    public function editTask(int $id) {
        //on vérifie que l'user est connecté via le token
        $userData = AuthController::checkAuth();

        // 1. LIRE LE JSON ENTRANT (Crucial pour React)
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
        
        //vérification si la tache existe
        $taskManager = new TaskManager();

        // On récupère la tâche actuelle en BDD 
        $currentTask = $taskManager->getTaskById($id);

        if (!$currentTask) {
            Utilities::sendJson(404,[
                "status" => "error",
                "message" => "Tâche introuvable."
            ]);
            exit;
        }
        
        //vérification si l'utilisateur est le propriétaire de la tâche
        if($userData->id != $currentTask['user_id']) {
            Utilities::sendJson(403,[
                "status" => "error",
                "message" => "Accès refusé. Vous pouvez modifier uniquement vos propres tâches."
            ]);
            exit;
        }

        // 2. RÉCUPÉRER LES DONNÉES DEPUIS LE TABLEAU $data
        // On utilise l'opérateur ?? (null coalescing) pour éviter les Warnings si une clé manque
        $title = isset($data['title']) ? trim(htmlspecialchars($data['title'])) : null;
        $description = isset($data['description']) ? trim(htmlspecialchars($data['description'])) : null;
        $priority = $data['priority'] ?? 'low';
        $category = $data['category_id'] ?? '3';


        if (empty($title) || empty($description)) {
            Utilities::sendJson(400,[
                "status" => "error",
                "message" => "Veuillez remplir tous les champs.(title, description)"
            ]);
            exit;
        }


        try{
            $taskManager->editTask($id, $title, $description, $priority, $category);
            
            Utilities::sendJson(200,[
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
                Utilities::sendJson(500,[
                    "status" => "error",
                    "message" => "Erreur technique :" .$e->getMessage()
                ]);
            }  
    }

    public function deleteTask(int $id) {
        // 1. Authentification
        $userData = AuthController::checkAuth();

        // 2. Vérifier si l'utilisateur est l'auteur de la tâche
        $taskManager = new TaskManager();
        $task = $taskManager->getTaskById($id);

        if (!$task) {
            Utilities::sendJson(404,[
                "status" => "error",
                "message" => "Tâche introuvable."
            ]);
            exit;
        }

        // 2. SÉCURITÉ : Seul le propriétaire peut supprimer sa tâche
        if ($task['user_id'] != $userData->id) {
            Utilities::sendJson(403, [
                "status" => "error",
                "message" => "Accès refusé. Suppression impossible."
            ]);
            exit;
        }

        // 3. Suppression effective
        $success = $taskManager->deleteTask($id);

        if ($success) {
            Utilities::sendJson(200, ["status" => "success", "message" => "Tâche supprimée."]);
        } else {
            Utilities::sendJson(500, ["status" => "error", "message" => "Erreur lors de la suppression."]);
        }
        exit;
    }
}