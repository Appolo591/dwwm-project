<?php
//Chargement de la clé secrète dans .env

// function getEnvValue($key) {
//     $lines = file(__DIR__ . '/../../.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
//     foreach ($lines as $line) {
//         list($envKey, $envValue) = explode('=', $line, 2);
//         if ($envKey === $key) {
//             return trim($envValue);
//         }
//     }
//     return null;
// }

// define('JWT_SECRET', getEnvValue('JWT_SECRET'));

// Chargement de la clé secrète dans .env

function getEnvValue($key) {
    $path = __DIR__ . '/../../.env';
    
    // 1. On vérifie si le fichier existe pour éviter un Warning de lecture
    if (!file_exists($path)) {
        return null;
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    
    foreach ($lines as $line) {
        // 2. On ignore les lignes de commentaires (#)
        if (strpos(trim($line), '#') === 0) continue;

        // 3. CRUCIAL : On ne traite la ligne que si elle contient un "="
        if (strpos($line, '=') !== false) {
            // Le "2" dans explode permet de ne pas couper la valeur si elle contient elle-même un "="
            $parts = explode('=', $line, 2);
            $envKey = trim($parts[0]);
            $envValue = trim($parts[1]);

            if ($envKey === $key) {
                return $envValue;
            }
        }
    }
    return null;
}

// Définition de la constante globale
define('JWT_SECRET', getEnvValue('JWT_SECRET') ?? 'fallback_secret_key_si_vide');