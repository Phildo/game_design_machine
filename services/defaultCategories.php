<?php
require_once('Category.php');
require_once('Option.php');
require_once('DBConnection.php');

$con = new DBConnection();
$cats = $con->queryArray("SELECT * FROM categories;");
foreach($cats as $cat)
  $cat->options = $con->queryArray("SELECT * FROM options WHERE category = ".$cat->id.";");

echo json_encode($cats);
?>
