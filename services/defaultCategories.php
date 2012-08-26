<?php
require_once('Category.php');
require_once('Option.php');
require_once('DBConnection.php');

$con = new DBConnection();
echo json_encode($con->queryArray("SELECT * FROM categories"));

?>
