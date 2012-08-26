<?php
require_once('mysql_conf.php');
Class DBConnection
{
  public $con;
  
  function __construct()
  {
    $this->con = new mysqli(MysqlConf::host, MysqlConf::db_user, MysqlConf::db_pass, MysqlConf::db);
  }

  function queryObj($query, $debug = false)
  {
    $result = $this->con->query($query);
    return $result->fetch_object();
  }

  function queryArray($query, $debug = false)
  {
    $result = $this->con->query($query);
    $ret = array();
    while($o = $result->fetch_object())
      $ret[] = $o;
    return $ret;
  }

  function __destruct()
  {
    $this->con->close();
  }
}
?>
