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
  document.getElementById('machine').innerHTML = machine.render();
  //alert(JSON.stringify(machine));
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
  this.dirty = function () { this.dirtyBit = true; };
  this.render = function()
  {
    if(this.dirtyBit)
    {
      this.dirtyBit = false;
      for(var i = 0; i < this.categories.length; i++)
        this.htmltxt += this.categories[i].render();
    }
    return this.htmltxt;
  }
  this.dirtyBit = true;
  this.htmltxt = "";

  this.url = (url ? url : '');
  this.categories = [];
  if(categories)
  {
    for(var i = 0; i < categories.length; i++)
    {
      var c = new Category(categories[i].name, categories[i].icon, categories[i].options, this);
      this.addCategory(c);
    }
  }
  return this;
}
function Category(name, icon, options, owner)
{
  this.addOption = function (option) { this.options.push(option); };
  this.removeOption = function (option) { };
  this.dirty = function () { this.dirtyBit = true; this.owner.dirty(); };
  this.render = function()
  {
    if(this.dirtyBit)
    {
      this.dirtyBit = false;
      this.htmltxt = "<div class='category'>";
      this.htmltxt += "<div class='ctitle'>";
      this.htmltxt += "<img class='cicon' src='images/icons/"+this.icon+"' />";
      this.htmltxt += "<div class='ctext'>";
      this.htmltxt += this.name;
      this.htmltxt += "</div>";//ctext
      this.htmltxt += "</div>";//ctitle
      this.htmltxt += "<div class='ccontent'>";
      for(var i = 0; i < this.options.length; i++)
        this.htmltxt += this.options[i].render();
      this.htmltxt += "</div>";//ccontent
      this.htmltxt += "</div>";//category
    }
    return this.htmltxt;
  }
  this.dirtyBit = true;
  this.htmltxt = "";

  this.name = (name ? name : '???');
  this.icon = (icon ? icon : 'default_category.png');
  this.options = [];
  if(options)
  {
    for(var i = 0; i < options.length; i++)
    {
      var o = new Option(options[i].name, options[i].icon, this);
      this.addOption(o);
    }
  }
  this.owner = owner;
  return this;
}
function Option(name, icon, owner)
{
  this.dirty = function () { this.dirtyBit = true; this.owner.dirty(); };
  this.render = function()
  {
    if(this.dirtyBit)
    {
      this.dirtyBit = false;
      this.htmltxt = "<div class='option'>";
      this.htmltxt += "<img class='oicon' src='images/icons/"+this.icon+"' />";
      this.htmltxt += "<div class='otext'>";
      this.htmltxt += this.name;
      this.htmltxt += "</div>";//otext
      this.htmltxt += "</div>";//option
    }
    return this.htmltxt;
  }
  this.dirtyBit = true;
  this.htmltxt = "";

  this.name = (name ? name : '???');
  this.icon = (icon ? icon : 'default_option.png');
  this.owner = owner;
  return this;
}

function init() { callService('machine',populateMachineFromJSON); }

var machine;
