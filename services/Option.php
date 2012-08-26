<?php
Class Option
{
  public $name;
  public $icon;
  public $is_default;

  function __construct($name = '???', $icon = 'default_option.png', $is_default = false)
  {
    $this->name = $name;
    $this->icon = $icon;
    $this->is_default = $is_default;
  }
}
?>
