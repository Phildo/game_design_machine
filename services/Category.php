<?php
Class Category
{
  public $name;
  public $icon;
  public $is_default;
  public $options;

  function __construct($name = '???', $icon = 'default_category.png', $is_default = false, $options = array())
  {
    $this->name = $name;
    $this->icon = $icon;
    $this->is_default = $is_default;
    $this->options = $options;
  }
}
?>
