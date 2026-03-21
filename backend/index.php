<?php 

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
    
    $mainController = new MainController();

	if (empty($_GET['page'])) {
        $url[0] = 'accueil';
		
	} else {
		$url = explode('/', filter_var($_GET['page'],FILTER_SANITIZE_URL));
	}

	switch ($url[0]) {
        case 'accueil':
            $mainController->index();
            break;
        
        default:
            throw new Exception('Page introuvable');
    }


