<?php 
    namespace Paull\Backend\Controllers;

    use Paull\Backend\Models\UserManager;

    class UserController {

        public function index() {
            $userManager = new UserManager();
            $users = $userManager->getAllUsers();
            echo json_encode([
                "status" => "success",
                "count" => count($users),
                "message" => "Liste des Users",
                "data" => $users
            ]);
        }
    }