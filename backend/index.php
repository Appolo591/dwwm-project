<?php 
    // Temporaire pour débugger
    // var_dump($_GET['page']); die();

    // On récupère "task/1" proprement
// $page = filter_input(INPUT_GET, 'page', FILTER_SANITIZE_URL) ?? 'accueil';

// // On découpe par le slash
// $urlSegments = explode('/', $page);

// // Position 0 : Le contrôleur (ex: 'task')
// // Position 1 : L'ID ou l'action (ex: '1')

// die("<pre>" . print_r($urlSegments, true) . "</pre>");

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");

    define("ROOT", str_replace("index.php", "", (isset($_SERVER['HTTPS']) ? "https://" : "http://") . $_SERVER['HTTP_HOST'] . $_SERVER["PHP_SELF"])) ;

    require_once 'vendor/autoload.php';

    // Charge le fichier .env
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();

    use Paull\Backend\Controllers\MainController;
    use Paull\Backend\Controllers\TaskController;
    
    $mainController = new MainController();
    $taskController = new TaskController();


	if (empty($_GET['page'])) {
        $url[0] = 'accueil';
		
	} else {
		$url = explode('/', filter_var($_GET['page'],FILTER_SANITIZE_URL));
	}

	switch ($url[0]) {
        case 'accueil':
            $mainController->index();
            break;

        // case 'tasks':
        //     $taskController->allTasks();
        //     break;  

        case 'task': 
            $id = $url[1];
            if (isset($id)) {
                // On passe l'ID récupéré dans $url[1] à la méthode
                $taskController->oneTask($id); 
            } else {
                throw new Exception('ID de la tâche manquant');
            }
            break;

        
        default:
            throw new Exception('Page introuvable');
    }


