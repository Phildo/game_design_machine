function callService(serviceName, callback, GETparams, POSTparams)
{
  var request = new XMLHttpRequest();
  request.onreadystatechange = function()
  {
    if(request.readyState == 1) 
      request.send();
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

function populateMachineFromJSON(data)
{
  if(!data) data = defaultOfflineMachine();
  data = JSON.parse(data);
  machine = new Machine(data.url, data.categories);
  alert(JSON.stringify(machine));
}
function defaultOfflineMachine()
{
  var d = '{"id":"1","url":"","categories":[{"id":"1","name":"cat_1","icon":"default_category.png","options":[{"id":"1","name":"opt_1","icon":"default_option.png"},{"id":"2","name":"opt_2","icon":"default_option.png"},{"id":"3","name":"opt_3","icon":"default_option.png"},{"id":"4","name":"opt_4","icon":"default_option.png"},{"id":"5","name":"opt_5","icon":"default_option.png"}]},{"id":"2","name":"cat_2","icon":"default_category.png","options":[{"id":"6","name":"opt_1","icon":"default_option.png"},{"id":"7","name":"opt_2","icon":"default_option.png"},{"id":"8","name":"opt_3","icon":"default_option.png"},{"id":"9","name":"opt_4","icon":"default_option.png"},{"id":"10","name":"opt_5","icon":"default_option.png"}]},{"id":"3","name":"cat_3","icon":"default_category.png","options":[{"id":"11","name":"opt_1","icon":"default_option.png"},{"id":"12","name":"opt_2","icon":"default_option.png"},{"id":"13","name":"opt_3","icon":"default_option.png"},{"id":"14","name":"opt_4","icon":"default_option.png"},{"id":"15","name":"opt_5","icon":"default_option.png"}]},{"id":"4","name":"cat_4","icon":"default_category.png","options":[{"id":"16","name":"opt_1","icon":"default_option.png"},{"id":"17","name":"opt_2","icon":"default_option.png"},{"id":"18","name":"opt_3","icon":"default_option.png"},{"id":"19","name":"opt_4","icon":"default_option.png"},{"id":"20","name":"opt_5","icon":"default_option.png"}]},{"id":"5","name":"cat_5","icon":"default_category.png","options":[{"id":"21","name":"opt_1","icon":"default_option.png"},{"id":"22","name":"opt_2","icon":"default_option.png"},{"id":"23","name":"opt_3","icon":"default_option.png"},{"id":"24","name":"opt_4","icon":"default_option.png"},{"id":"25","name":"opt_5","icon":"default_option.png"}]}]}'
  return d;
}

function Machine(url, categories)
{
  this.addCategory = function (category) { this.categories.push(category); };
  this.removeCategory = function (category) { };

  this.url = (url ? url : '');
  this.categories = [];
  if(categories)
  {
    for(var i = 0; i < categories.length; i++)
    {
      var c = new Category(categories[i].name, categories[i].icon, categories[i].options);
      this.addCategory(c);
    }
  }
  return this;
}
function Category(name, icon, options)
{
  this.addOption = function (option) { this.options.push(option); };
  this.removeOption = function (option) { };

  this.name = (name ? name : '???');
  this.icon = (icon ? icon : 'default_category.png');
  this.options = [];
  if(options)
  {
    for(var i = 0; i < options.length; i++)
    {
      var o = new Option(options[i].name, options[i].icon);
      this.addOption(o);
    }
  }
  return this;
}
function Option(name, icon)
{
  this.name = (name ? name : '???');
  this.icon = (icon ? icon : 'default_option.png');

  return this;
}

function init() { callService('machine',populateMachineFromJSON); }

var machine;
