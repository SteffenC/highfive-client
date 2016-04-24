<?php
require_once "model/login.php";
require_once "model/products.php";

// Kickstart the framework
$f3=require('lib/base.php');

$f3->set('DEBUG',1);
if ((float)PCRE_VERSION<7.9)
	trigger_error('PCRE version is out of date');

// Load configuration
$f3->config('config.ini');

$f3->route('GET /',
	function($f3) {
		$classes=array();
		$f3->set('classes',$classes);
		$f3->set('content','welcome.htm');
		echo View::instance()->render('index.htm');
	}
);

$f3->route('POST /login',
	function($f3) {
		$login = new Login();
		$products = new Products();
		$username = $f3->get('POST.un');
		$password = $f3->get('POST.pw');
		if($login->validate($username, $password)) {
			$f3->set("products", json_encode($products->getAll(), JSON_NUMERIC_CHECK));
      $template=new Template;
      echo $template->render('products.htm');
		}
	}
);

$f3->route('GET /products/@id',
	function($f3) {
		$products = new Products();
		$id = $f3->get('PARAMS.id');
		$products->getById($id);
	}
);

$f3->run();
