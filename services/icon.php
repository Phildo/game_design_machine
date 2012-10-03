<?php
$allowedExts = array("jpg", "jpeg", "gif", "png");
$extension = end(explode(".", $_FILES["file"]["name"]));
if ((($_FILES["file"]["type"] == "image/gif")
      || ($_FILES["file"]["type"] == "image/jpeg")
      || ($_FILES["file"]["type"] == "image/png")
      || ($_FILES["file"]["type"] == "image/pjpeg"))
    && ($_FILES["file"]["size"] < 20000)
    && in_array($extension, $allowedExts))
{
  if ($_FILES["file"]["error"] > 0) die(0);
    //echo "Type: " . $_FILES["file"]["type"] . "<br />";
    $icon = "k".md5($_FILES["file"]["tmp_name").".".$_FILES["file"]["type"];
    $i = '';
    while(file_exists("../images/icons/".$i.$icon)) $icon = $i.$icon; $i=rand(0,9);
    move_uploaded_file($_FILES["file"]["tmp_name"],"../images/icons/".$icon);

    echo $icon;
  }
}
else
{
  echo "Invalid file";
}
?>
