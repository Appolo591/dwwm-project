<?php 
    namespace Paull\Backend\Utils;

    class Utilities {
        public static function showArray($array) {
            echo '<pre>';
            print_r($array);
            echo '</pre>';
        }

        public static function sendJson($code, $data) {
            // 1. On nettoie tout ce qui a été affiché avant (espaces, warnings)
            if (ob_get_length()) ob_clean();

            // 2. On définit le code de réponse HTTP (200, 401, 404, etc.)
            http_response_code($code);

            // 3. On force le header JSON
            header('Content-Type: application/json; charset=utf-8');

            // 4. On affiche le JSON et on arrête le script
            echo json_encode($data, JSON_UNESCAPED_UNICODE);
            exit;
        }
    }
