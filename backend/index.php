<?php 
    // Temporaire pour débugger
    // var_dump($_GET['page']); die();

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST,DELETE,PUT, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");

    
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    define("ROOT", str_replace("index.php", "", (isset($_SERVER['HTTPS']) ? "https://" : "http://") . $_SERVER['HTTP_HOST'] . $_SERVER["PHP_SELF"])) ;

    require_once 'vendor/autoload.php';

    // Charge le fichier .env
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();

    use Paull\Backend\Controllers\MainController;
    use Paull\Backend\Controllers\TaskController;
    use Paull\Backend\Controllers\UserController;
    
    $mainController = new MainController();
    $taskController = new TaskController();
    $usersController = new UserController();


	if (empty($_GET['page'])) {
        $url[0] = 'accueil';
		
	} else {
		$url = explode('/', filter_var($_GET['page'],FILTER_SANITIZE_URL));
	}

	switch ($url[0]) {
        case 'accueil':
            $mainController->index();
            break;

        case 'task': 
            $id = $url[1];
            if (isset($id)) {
                // On passe l'ID récupéré dans $url[1] à la méthode
                $taskController->oneTask($id); 
            } else {
                throw new Exception('ID de la tâche manquant');
            }
            break;

        case 'add':
            $taskController->addTask();
            break;

        case'users':
            $usersController->index();
            break;

        case 'edit':
            $id = $url[1];
            if (isset($id)) {
                $taskController->editTask($id); 
            } else {
                throw new Exception('ID de la tâche manquant');
            }
            break;
        
        case 'delete':
            $id = $url[1];
            if (isset($id)) {
                $taskController->deleteTask($id); 
            } else {
                throw new Exception('ID de la tâche manquant');
            }
            break;
        
        case 'register':
            $usersController->createUser();
            break;

        case 'profil':
            $id = $url[1];
            if (isset($id)) {
                // On passe l'ID récupéré dans $url[1] à la méthode
                $usersController->oneUser($id); 
            } else {
                throw new Exception('ID de la tâche manquant');
            }
            break;
            break;
        
        // case 'login':
        //     $usersController->login();
        //     break;

        default:
            throw new Exception('Page introuvable');
    }


