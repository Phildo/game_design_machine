<?php
require_once('DBConnection.php');
$debug = false;

$con = new DBConnection();

// Save Machine
if(isset($_POST['m']))
{
  $m = json_decode($_POST['m']);
  if(isset($_GET['k']))
  {
    $mid = substr($_GET['k'], 0, strpos($_GET['k'],'k'));
    $key = substr($_GET['k'], strpos($_GET['k'],'k')+1);
    $exists = $con->queryObj("SELECT id FROM machines WHERE id = ".$mid." AND key = '".$key."' AND password = '".md5($_POST['p'])."' LIMIT 1;");
    if(!$exists) die(0);
    //Already exists- delete all data (updating use_counts accordingly) for repopulation as new
    $cats = $con->queryArray("SELECT * FROM machine_categories WHERE m_id = ".$mid.";");
    for($i = 0; $i < count($cats); $i++)
    {
      $con->query("UPDATE categories SET use_count = use_count-1 WHERE id = ".$cats[$i]->c_id.";");
      if($cats[$i]->i_id != 0) $con->query("UPDATE icons SET use_count = use_count-1 WHERE id = ".$cats[$i]->i_id.";");
      $con->query("DELETE FROM machine_categories WHERE id = ".$cats[$i]->id.";");
    }
    $opts = $con->queryArray("SELECT * FROM machine_category_options WHERE m_id = ".$mid.";");
    for($i = 0; $i < count($opts); $i++)
    {
      $con->query("UPDATE options SET use_count = use_count-1 WHERE id = ".$opts[$i]->o_id.";");
      if($opts[$i]->i_id != 0) $con->query("UPDATE icons SET use_count = use_count-1 WHERE id = ".$opts[$i]->i_id.";");
      $con->query("DELETE FROM machine_category_options WHERE id = ".$opts[$i]->id.";");
    }
  }
  else
  {
    $mid = $con->query("INSERT INTO machines (pass, created) VALUES ('".md5($_POST['p'])."', NOW());",$debug);
    $key = md5($mid."k");
    $con->query("UPDATE machines SET m_key = '".$key."' WHERE id = ".$mid.";");
    $_GET['k'] = $mid."k".$key;
  }

  //At this point, a record should exist in machines table (and its id in '$mid'), but all of its data in other tables should be gone.
  //So, we are free to repopulate it as though it is new
  for($i = 0; $i < count($m->categories); $i++)
  {
    $c = $con->queryObj("SELECT id FROM categories WHERE name = '".strtolower($m->categories[$i]->name)."' LIMIT 1;");
    if(!$c)
      $cid = $con->query("INSERT INTO categories (name, use_count) VALUES ('".strtolower($m->categories[$i]->name)."', 1);");
    else
    {
      $cid = $c->id;
      $con->query("UPDATE categories SET use_count = use_count+1 WHERE id = ".$cid.";");
    }

    $ci = $con->queryObj("SELECT id FROM icons WHERE link_type = 'CATEGORY' AND link_id = '".$cid."' AND icon = '".strtolower($m->categories[$i]->icon)."' LIMIT 1;");
    if($ci)
    {
      $ciid = $ci->id;
      $con->query("UPDATE icons SET use_count = use_count+1 WHERE id = ".$ciid.";");
    }
    else
      $ciid = 0;
    
    $mcid = $con->query("INSERT INTO machine_categories (m_id, c_id, i_id, sort) VALUES (".$mid.", ".$cid.", ".$ciid.", ".$i.");");

    for($j = 0; $j < count($m->categories[$i]->options); $j++)
    {
      $o = $con->queryObj("SELECT id FROM options WHERE c_id = ".$cid." AND name = '".strtolower($m->categories[$i]->options[$j]->name)."' LIMIT 1;");
      if(!$o)
        $oid = $con->query("INSERT INTO options (c_id, name, use_count) VALUES (".$cid.", '".strtolower($m->categories[$i]->options[$j]->name)."', 1);");
      else
      {
        $oid = $o->id;
        $con->query("UPDATE options SET use_count = use_count+1 WHERE id = ".$oid.";");
      }

      $oi = $con->queryObj("SELECT id FROM icons WHERE link_type = 'OPTION' AND link_id = '".$oid."' AND icon = '".strtolower($m->categories[$i]->options[$j]->icon)."' LIMIT 1;");
      if($oi)
      {
        $oiid = $oi->id;
        $con->query("UPDATE icons SET use_count = use_count+1 WHERE id = ".$oiid.";");
      }
      else
        $oiid = 0;
    
      $mcoid = $con->query("INSERT INTO machine_category_options (m_id, c_id, o_id, i_id, sort) VALUES (".$mid.", ".$cid.", ".$oid.", ".$oiid.", ".$j.");");
    }
  }

  echo $_GET['k'];
  return;
}

// Fetch
$mSel = "id, m_key";
$cSel = "categories.id, name, icon";
$oSel = "options.id, name, icon";

if(isset($_GET['k']))
  $m = $con->queryObj("SELECT ".$mSel." FROM machines WHERE id = ".substr($_GET['k'],0,strpos($_GET['k'],'k'))." AND m_key = '".substr($_GET['k'],strpos($_GET['k'],'k')+1)."';", $debug);
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
