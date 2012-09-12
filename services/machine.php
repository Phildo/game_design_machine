<?php
require_once('Category.php');
require_once('Option.php');
require_once('DBConnection.php');
$debug = false;

$mSel = "id, url";
$cSel = "categories.id, name, icon";
$oSel = "options.id, name, icon";

$con = new DBConnection();
if(isset($_GET['m']))
  $m = $con->queryObj("SELECT ".$mSel." FROM machines WHERE id = ".substr($_GET['m'],0,5)." AND url = '".substr($_GET['m'],5)."';", $debug);
else
  $m = $con->queryObj("SELECT ".$mSel." FROM machines WHERE id = 1;", $debug);
if(!$m) die(0);
$m->categories = $con->queryArray("
SELECT ".$cSel." FROM (SELECT * FROM machine_categories WHERE m_id = ".$m->id.") AS machine_categories
LEFT JOIN categories ON machine_categories.c_id = categories.id
LEFT JOIN (SELECT * FROM icons WHERE link_type = 'CATEGORY') AS cat_icons ON machine_categories.i_id = cat_icons.id ORDER BY machine_categories.sort ASC;", $debug);
foreach($m->categories as $c)
  $c->options = $con->queryArray("
  SELECT ".$oSel." FROM (SELECT * FROM machine_category_options WHERE m_id = ".$m->id." AND c_id = ".$c->id.") AS machine_category_options 
  LEFT JOIN options ON machine_category_options.o_id = options.id
  LEFT JOIN (SELECT * FROM icons WHERE link_type = 'OPTION') AS opt_icons ON machine_category_options.i_id = opt_icons.id ORDER BY machine_category_options.sort ASC;", $debug);

echo json_encode($m);
?>
