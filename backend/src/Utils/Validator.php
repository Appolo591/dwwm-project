<?php
// backend/src/Utils/Validator.php

namespace Paull\Backend\Utils;

class Validator {

    // Pour l'INSCRIPTION : Très strict
    public static function validateRegister($data) {
        if (empty($data['email']) || empty($data['password']) || empty($data['name'])) {
            return "Tous les champs sont obligatoires.";
        }
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            return "Email invalide.";
        }
        $regex = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/';
        if (!preg_match($regex, $data['password'])) {
            return "Le mot de passe est trop faible.";
        }
        return true;
    }

    // Pour la CONNEXION : Plus souple
    public static function validateLogin($data) {
        if (empty($data['email']) || empty($data['password'])) {
            return "Email et mot de passe requis.";
        }
        return true;
    }
}