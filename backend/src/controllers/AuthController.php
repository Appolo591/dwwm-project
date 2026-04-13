<?php
namespace Paull\Backend\Controllers;

require 'vendor/autoload.php';
require_once __DIR__ . '/../config/config.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Exception;
use Paull\Backend\Utils\Validator;
use Paull\Backend\Utils\Utilities;
use Paull\Backend\Models\UserManager;



class AuthController {

    public function login() {
        
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        $validation = Validator::validateLogin($data);
        if ($validation !== true) {
            http_response_code(400);
            echo json_encode([
                "status" => "error",
                "message" => $validation
            ]);
            return;
        }

        // --- RECHERCHE DE L'UTILISATEUR ---
            $userManager = new UserManager();
            $user = $userManager->getUserByName($data['name']);

        // --- VERIFICATION DU MOT DE PASSE ---
            if ($user && password_verify($data['password'], $user['password'])) {
                 
        // --- LA CRÉATION DU TOKEN ---
                $payload = [
                    "iat" => time(),          // Heure de création
                    "exp" => time() + 3600,   // Expire dans 1 heure
                    "uid" => $user['id'],     // On cache l'ID de l'user dedans
                    "name" => $user['name']   // Et son nom pour l'affichage React
                ];


                $token = JWT::encode($payload, JWT_SECRET, 'HS256');

                Utilities::sendJson(200,[
                    "status" => "success",
                    "token" => $token,
                    "user" => [
                        "id" => $user['id'],
                        "name" => $user['name']
                    ]
                ]);   
            }else{
                Utilities::sendJson(401,[
                    "status" => "error",
                    "message" => "Nom d'utilisateur ou mot de passe incorrect"
                ]);
            }

        
    }

    public function createToken() {

        $payload = [
            'user_id' => 12,
            'email' => 'contact@crea-troyes.fr',
            'role' => 'user',
            'iat' => time(),
            'exp' => time() + 3600 // expiration dans 1 heure
        ];
    
        $token = JWT::encode($payload, JWT_SECRET, 'HS256');
    
        echo "Votre token JWT : " . $token;
    
        return $token;

    }

    public function verifyToken($token) {    
        try {
            $decoded = JWT::decode($token, new Key(JWT_SECRET, 'HS256'));
            echo "Token valide. Utilisateur ID : " . $decoded->user_id;
            } catch (Exception $e) {
                echo "Token invalide : " . $e->getMessage();
            }
    }

    public static function checkAuth() {
    // 1. On récupère le header 'Authorization' envoyé par React
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? null;

        if (!$authHeader) {
            Utilities::sendJson(401, ["message" => "Accès refusé. Token manquant."]);
        }

        // Le header ressemble souvent à "Bearer le_token_ici", on récupère juste le token
        $token = str_replace('Bearer ', '', $authHeader);

        try {
            // 2. On tente de décoder le token avec notre clé secrète
            $decoded = JWT::decode($token, new Key(JWT_SECRET, 'HS256'));
            return $decoded; // Si c'est bon, on renvoie les infos contenues dans le token
        } catch (\Exception $e) {
            Utilities::sendJson(401, ["message" => "Token invalide ou expiré."]);
        }
    }   

    
}



