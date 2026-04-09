<?php 
    namespace Paull\Backend\Controllers;

    use Paull\Backend\Models\UserManager;
    use Paull\Backend\Utils\Validator;

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

        public function oneUser($id) {
            $userManager = new UserManager();
            $user = $userManager->getOneUser($id);
            echo json_encode([
                "status" => "success",
                "count" => count($user),
                "message" => "User",
                "data" => $user
            ]);
        }

        public function createUser() {
            $json = file_get_contents('php://input');
            $data = json_decode($json, true);

            $validation = Validator::validateRegister($data);
            if ($validation !== true) {
                http_response_code(400);
                echo json_encode([
                    "status" => "error",
                    "message" => $validation
                ]);
                return;
            }

            $userManager = new UserManager();

            $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);

            $userManager->createUser($data['name'], $data['email'], $hashedPassword);

            http_response_code(201);
            echo json_encode([
                "status" => "success",
                "message" => "User created",
                "data" => $data
            ]);
        }
    }