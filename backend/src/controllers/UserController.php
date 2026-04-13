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

            //méthode pour savoir si l'email existe déja 
            $emailExists = $userManager->emailExists($data['email']);
            if ($emailExists) {
                http_response_code(400);
                echo json_encode([
                    "status" => "error",
                    "message" => "Email déjà utilisé."
                ]);
                return;
            }
            
            //méthode pour savoir si le nom d'utilisateur existe deja
            $userByName = $userManager->getUserByName($data['name']);
            if ($userByName) {
                http_response_code(400);
                echo json_encode([
                    "status" => "error",
                    "message" => "Veuillez choisir un autre nom d'utilisateur."
                ]);
                return;
            }

            $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);

            $userId = $userManager->createUser($data['name'], $data['email'], $hashedPassword);

            // 1. On nettoie les données pour la réponse (on retire le password)
            unset($data['password']); 

            $data['id'] = $userId;

            // 2. On s'assure qu'aucun Warning PHP ne traîne (on vide le buffer)
            if (ob_get_length()) ob_clean(); 

            // 3. On force le type de contenu
            header('Content-Type: application/json');
            
            http_response_code(201);
            echo json_encode([
                "status" => "success",
                "message" => "User created",
                "data" => $data 
            ]);

            exit; // On arrête tout pour éviter qu'un autre script ajoute du texte après

        }
    }