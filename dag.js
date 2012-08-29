function callService(serviceName, callback)
{
  var request = new XMLHttpRequest();
  request.onreadystatechange = function()
  {
    if(request.readyState == 1) 
    {
      request.send();
    }
    else if(request.readyState == 4)
    {
      if(request.status == 200)
        callback(request.responseText);
      else
        callback(false);
    }
  };
  request.open('GET', 'services/'+serviceName+'.php', true);
}

function requestDefaultCategories()
{
  callService('defaultCategories',populateDefaultCategories);
}
function populateDefaultCategories(data)
{
  if(!data)
  {

  }
  else
  {
    for(var i = 0; i < data.length; i++)
    {
      addCategoryFromJSON(data[i], true);
    }
  }
}
function addCategoryFromJSON(catData, isDefault)
{
  if(!catData) return;
  var cat = new Category(catData.name, catData.options, isDefault);
  addCategory(cat);
}
function addCategory(category)
{
  categories.push(category);
}
function removeCategory(category)
{

}

function Category(name, icon, options, is_default)
{
  this.name = (name ? name : '???');
  this.icon = (icon ? icon : 'default_category.png');
  this.is_default = (is_default ? true : false);
  this.options = [];
  if(options)
  {
    for(var i = 0; i < options.length; i++)
    {
      var o = new Option(options[i].name, options[i].icon, options[i].is_default);
      this.addOption(o);
    }
  }
  this.locked = false;
  this.selectedIndex = 0;

  this.addOption = function (option)
  {
    this.options.push(option);
  }
  this.removeOption = function (option)
  {

  }
  this.roll = function ()
  {
    if(!this.locked)
    {

    }
  }
  this.toggleLock = function ()
  {
    this.locked = !this.locked;
  }

  return this;
}
function Option(name, icon, is_default)
{
  this.name = (name ? name : '???');
  this.icon = (icon ? icon : 'default_option.png');
  this.is_default = (is_default ? true : false);

  return this;
}

function init()
{
  requestDefaultCategories();
}

var categories = [];
