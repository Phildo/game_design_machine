<?php
require_once('Category.php');
require_once('Option.php');
require_once('DBConnection.php');
$debug = false;

$mSel = "id, url";
$cSel = "categories.id, name, is_default, icon";
$oSel = "options.id, name, is_default, icon";

$con = new DBConnection();
$m = $con->queryObj("SELECT ".$mSel." FROM machines WHERE id = ".substr($_GET['m'],0,4)." AND url = '".substr($_GET['m'],4)."' AND pass = '".($_GET['p'])."';", $debug);
if(!$m) die(0);
$m->categories = $con->queryArray("
SELECT ".$cSel." FROM (SELECT * FROM machine_categories WHERE m_id = ".$m->id.") AS machine_categories
LEFT JOIN categories ON machine_categories.c_id = categories.id
LEFT JOIN (SELECT * FROM icons WHERE link_type = 'CATEGORY') AS cat_icons ON machine_categories.id = cat_icons.link_id;", $debug);
foreach($m->categories as $c)
  $c->options = $con->queryArray("
  SELECT ".$oSel." FROM (SELECT * FROM machine_options WHERE m_id = ".$m->id." AND c_id = ".$c->id.") AS machine_options 
  LEFT JOIN options ON machine_options.o_id = options.id
  LEFT JOIN (SELECT * FROM icons WHERE link_type = 'OPTION') AS opt_icons ON machine_options.id = opt_icons.link_id;", $debug);

echo json_encode($m);
?>
