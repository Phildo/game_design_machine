function getURLParam ( sname )
{
  var params = location.search.substr(location.search.indexOf("?")+1);
  var sval = "";
  params = params.split("&");
  // split param and value into individual pieces
  for (var i=0; i<params.length; i++)
  {
    temp = params[i].split("=");
    if ( [temp[0]] == sname ) { sval = temp[1]; }
  }
  return sval;
}

function callService(serviceName, callback, GETparams, POSTparams)
{
  var url;
  if(GETparams)
    url = 'services/'+serviceName+'.php'+GETparams;
  else
    url = 'services/'+serviceName+'.php';
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
  request.open('GET', url, true);
}

function populateMachineFromJSON(data)
{
  if(!data) data = defaultOfflineMachine();
  data = JSON.parse(data);
  machine = new Machine(data.url, data.categories);
}
function defaultOfflineMachine()
{
  var d = '{"id":"1","url":"","categories":[{"id":"1","name":"who","icon":"who_cat.png","options":[{"id":"1","name":"zombie","icon":"who_zombie_opt.png"},{"id":"2","name":"vampire","icon":"who_vampire_opt.png"},{"id":"3","name":"knight","icon":"who_knight_opt.png"}]},{"id":"2","name":"where","icon":"where_cat.png","options":[{"id":"4","name":"castle","icon":"where_castle_opt.png"},{"id":"5","name":"world","icon":"where_world_opt.png"},{"id":"6","name":"space","icon":"where_space_opt.png"}]},{"id":"3","name":"what","icon":"what_cat.png","options":[{"id":"7","name":"rescue","icon":"what_rescue_opt.png"},{"id":"8","name":"domination","icon":"what_domination_opt.png"},{"id":"9","name":"war","icon":"what_war_opt.png"}]}]}';
  return d;
}

function tick()
{
  if(machine)
  {
    machine.htmlscroll.style.left = machine.offset + "px";
    for(var i = 0; i < machine.categories.length; i++)
    {
      machine.categories[i].htmlscroll.style.top = machine.categories[i].offset + "px";
    }
    rollo.offset -= 2;
    if(rollo.offset < -1*rollo.trueWidth) rollo.offset = 545;
    rollo.html.style.left = rollo.offset + "px";
  }
}

function Machine(url, categories)
{
  this.constructHTML = function()
  {
    var listenObj = this; //used to pass 'this' into listeners 

    this.html = document.createElement('div');
    this.html.setAttribute('id', 'machine');
    this.html.setAttribute('class', 'machine');

    this.htmlscroll = document.createElement('div');
    this.htmlscroll.setAttribute('id', 'machinescroll');
    this.htmlscroll.setAttribute('class', 'machinescroll');
    this.html.appendChild(this.htmlscroll);

    this.htmladdbtn = document.createElement('img');
    this.htmladdbtn.setAttribute('id','addcatbtn');
    this.htmladdbtn.setAttribute('class','addcatbtn');
    this.htmladdbtn.setAttribute('src','images/addcatbtn.png');
    this.htmladdbtn.addEventListener('click', function(e) { addBlankCat(e); });
    this.htmlscroll.appendChild(this.htmladdbtn);

    //Used by children- not directly added
    this.htmledit = document.createElement('div');
    this.htmledit.setAttribute('id','edit');
    
    this.htmleditbox = document.createElement('input');
    this.htmleditbox.setAttribute('id','editbox');
    this.htmleditbox.setAttribute('type','text');
    this.htmleditbox.setAttribute('value','');
    this.htmleditbox.addEventListener('keypress', function(e) { if(e.keyIdentifier == "Enter") listenObj.endEdit(e); });
    this.htmledit.appendChild(this.htmleditbox);

    this.htmlcancelbtn = document.createElement('img');
    this.htmlcancelbtn.setAttribute('id','ceditbtn');
    this.htmlcancelbtn.setAttribute('src','images/canceleditbtn.png');
    this.htmlcancelbtn.addEventListener('click', function(e) { listenObj.endEdit(e); });
    this.htmledit.appendChild(this.htmlcancelbtn);
  }

  this.addCategory = function(category,e) 
  { 
    this.categories.push(category); 
    this.htmlscroll.insertBefore(category.html, this.htmladdbtn); 
    this.trueWidth = (this.categories.length * 230) + 30; 
    this.htmlscroll.style.width = (this.trueWidth+500) + "px";
    if(e!=null) mousemoved(e);
  };
  this.deleteCategory = function (category,e) 
  { 
    this.categories.splice(category.index,1);
    this.htmlscroll.removeChild(category.html);
    for(var i = category.index; i < this.categories.length; i++)
      this.categories[i].index = i;
    this.trueWidth = (this.categories.length * 230) + 30; 
    this.htmlscroll.style.width = (this.trueWidth+500) + "px";
    if(e!=null) mousemoved(e);
  };

  this.endEdit = function(e)
  {
    if(this.htmledit.parentObj != null) this.htmledit.parentObj.endEdit(e);
  }

  this.shift = function(e)
  {
    this.htmladdbtn.style.display='none';
    for(var i = 0; i < this.categories.length; i++)
      this.categories[i].shift(e);
  }
  this.unshift = function(e)
  {
    this.htmladdbtn.style.display='block';
    for(var i = 0; i < this.categories.length; i++)
      this.categories[i].unshift(e);
  }

  this.url = (url ? url : '');
  this.constructHTML();
  this.categories = [];
  if(categories)
  {
    for(var i = 0; i < categories.length; i++)
    {
      var c = new Category(categories[i].name, categories[i].icon, i, categories[i].options, this);
      this.addCategory(c,null);
    }
  }
  this.vizWidth = 720;//the width of the VISIBLE container with the categories in it
  this.vizHeight = 196;//the width of the VISIBLE container with the options in it
  this.trueWidth = (this.categories.length * 230) + 30; //the width of the INVISBLE container with the categories in it
  this.trueZeroX = (window.innerWidth - this.vizWidth) / 2; //the x of the left edge of the container with the categories in it
  this.trueZeroY = 268;
  this.offset = 0;
  if(document.getElementById('machine') != null) document.getElementById('content').removeChild(document.getElementById('machine'));
  document.getElementById('content').insertBefore(this.html, document.getElementById('roll'));

  return this;
}
function Category(name, icon, index, options, owner)
{
  this.constructHTML = function()
  {
    var listenObj = this; //used to pass 'self' (as the category object, not this function, or any particular DOM object) to listeners

    this.html = document.createElement('div');
    this.html.setAttribute('id','category_'+this.index);
    this.html.setAttribute('class','category');
  
    this.htmltitle = document.createElement('div');
    this.htmltitle.setAttribute('id','ctitle_'+this.index);
    this.htmltitle.setAttribute('class','ctitle');
    this.html.appendChild(this.htmltitle);
  
    this.htmlicon = document.createElement('img');
    this.htmlicon.setAttribute('id','cicon_'+this.index);
    this.htmlicon.setAttribute('class','cicon');
    this.htmlicon.setAttribute('src','images/icons/'+this.icon);
    this.htmlicon.addEventListener('click', function(e) { if(e.shiftKey) listenObj.owner.deleteCategory(listenObj, e); });
    this.htmltitle.appendChild(this.htmlicon);

    this.htmltext = document.createElement('div');
    this.htmltext.setAttribute('id','ctext_'+this.index);
    this.htmltext.setAttribute('class','ctext');
    this.htmltitle.appendChild(this.htmltext);

    this.htmlname = document.createElement('div');
    this.htmlname.setAttribute('id','cname_'+this.index);
    this.htmlname.setAttribute('class','cname');
    this.htmlname.addEventListener('click', function(e) { listenObj.editName(e); });
    this.htmlname.innerHTML = this.name;
    this.htmltext.appendChild(this.htmlname);
  
    this.htmlcontent = document.createElement('div');
    this.htmlcontent.setAttribute('id','ccontent_'+this.index);
    this.htmlcontent.setAttribute('class','ccontent');
    this.html.appendChild(this.htmlcontent);

    this.htmlscroll = document.createElement('div');
    this.htmlscroll.setAttribute('id', 'categoryscroll');
    this.htmlscroll.setAttribute('class', 'categoryscroll');
    this.htmlcontent.appendChild(this.htmlscroll);
  
    this.htmladdbtn = document.createElement('img');
    this.htmladdbtn.setAttribute('id','addoptbtn_'+this.index);
    this.htmladdbtn.setAttribute('class','addoptbtn');
    this.htmladdbtn.setAttribute('src','images/addoptbtn.png');
    this.htmladdbtn.addEventListener('click', function(e) { addBlankOpt(listenObj, e); });
    this.htmlscroll.appendChild(this.htmladdbtn);
  }

  this.addOption = function(option,e) 
  { 
    this.options.push(option); 
    this.htmlscroll.insertBefore(option.html, this.htmladdbtn);
    this.trueHeight = (this.options.length * 33) + 30; 
    if(e!=null) mousemoved(e);
  };
  this.deleteOption = function (option,e) 
  {
    this.options.splice(option.index,1);
    this.htmlscroll.removeChild(option.html);
    for(var i = option.index; i < this.options.length; i++)
      this.options[i].index = i;
    this.trueHeight = (this.options.length * 33) + 30; 
    if(e!=null) mousemoved(e);
  };

  this.editName = function(e)
  {
    if(this.owner.htmledit.parentObj != null)
      this.owner.htmledit.parentObj.endEdit(null);

    var listenObj = this; //used to pass 'this' into eventlistener function

    this.htmltext.removeChild(this.htmlname);
    this.owner.htmleditbox.setAttribute('value',this.name);
    this.owner.htmleditbox.value = this.name; //<- This line SHOULD NOT be necessary... don't know why it won't stick unless its there...
    this.owner.htmledit.parentObj = listenObj;
    this.htmltext.appendChild(this.owner.htmledit);
    this.owner.htmleditbox.select();
  }
  this.endEdit = function(e)
  {
    if(this.owner.htmleditbox.value != "")
      this.name = this.owner.htmleditbox.value;
    this.htmltext.removeChild(this.owner.htmledit);
    this.htmlname.innerHTML = this.name;
    this.htmltext.appendChild(this.htmlname);

    this.owner.htmleditbox.setAttribute('value','');
    this.owner.htmledit.parentObj = null;
    if(e != null) e.stopPropagation();
  }

  this.shift = function(e)
  {
    this.htmladdbtn.style.display='none';
    this.htmlicon.src = 'images/delete_category.png';
    for(var i = 0; i < this.options.length; i++)
      this.options[i].shift(e);
  }
  this.unshift = function(e)
  {
    this.htmladdbtn.style.display='block';
    this.htmlicon.src = 'images/icons/'+this.icon;
    for(var i = 0; i < this.options.length; i++)
      this.options[i].unshift(e);
  }

  this.name = (name ? name : '???');
  this.icon = (icon ? icon : 'default_category.png');
  this.index = (index ? index : 0);
  this.owner = owner;
  this.constructHTML();
  this.options = [];
  if(options)
  {
    for(var i = 0; i < options.length; i++)
    {
      var o = new Option(options[i].name, options[i].icon, i, this);
      this.addOption(o,null);
    }
  }
  this.trueHeight = (this.options.length * 33) + 30; 
  this.offset = 0;

  return this;
}
function Option(name, icon, index, owner)
{
  this.constructHTML = function()
  {
    var listenObj = this; //used to pass 'self' (as the category object, not this function, or any particular DOM object) to listeners

    this.html = document.createElement('div');
    this.html.setAttribute('id','option_'+this.owner.index+'_'+this.index);
    this.html.setAttribute('class','option');

    this.htmlicon = document.createElement('img');
    this.htmlicon.setAttribute('id','oicon_'+this.owner.index+'_'+this.index);
    this.htmlicon.setAttribute('class','oicon');
    this.htmlicon.setAttribute('src','images/icons/'+this.icon);
    this.htmlicon.addEventListener('click', function(e) { if(e.shiftKey) listenObj.owner.deleteOption(listenObj, e); });
    this.html.appendChild(this.htmlicon);

    this.htmltext = document.createElement('div');
    this.htmltext.setAttribute('id','otext_'+this.owner.index+'_'+this.index);
    this.htmltext.setAttribute('class','otext');
    this.html.appendChild(this.htmltext);

    this.htmlname = document.createElement('div');
    this.htmlname.setAttribute('id','oname_'+this.index);
    this.htmlname.setAttribute('class','oname');
    this.htmlname.addEventListener('click', function(e) { listenObj.editName(e); });
    this.htmlname.innerHTML = this.name;
    this.htmltext.appendChild(this.htmlname);
  }

  this.editName = function(e)
  {
    //ok, the whole 'this.owner.owner' thing is a bit over the top... but it works. so shut up.
    if(this.owner.owner.htmledit.parentObj != null)
      this.owner.owner.htmledit.parentObj.endEdit(null);

    var listenObj = this; //used to pass 'this' into eventlistener function

    this.htmltext.removeChild(this.htmlname);
    this.owner.owner.htmleditbox.setAttribute('value',this.name);
    this.owner.owner.htmleditbox.value = this.name; //<- This line SHOULD NOT be necessary... don't know why it won't stick unless its there...
    this.owner.owner.htmledit.parentObj = listenObj;
    this.htmltext.appendChild(this.owner.owner.htmledit);
    this.owner.owner.htmleditbox.select();
  }
  this.endEdit = function(e)
  {
    if(this.owner.owner.htmleditbox.value != "")
      this.name = this.owner.owner.htmleditbox.value;
    this.htmltext.removeChild(this.owner.owner.htmledit);
    this.htmlname.innerHTML = this.name;
    this.htmltext.appendChild(this.htmlname);

    this.owner.owner.htmleditbox.setAttribute('value','');
    this.owner.owner.htmledit.parentObj = null;
    if(e != null) e.stopPropagation();
  }

  this.shift = function(e)
  {
    this.htmlicon.src = 'images/delete_option.png';
  }
  this.unshift = function(e)
  {
    this.htmlicon.src = 'images/icons/'+this.icon;
  }

  this.select = function(e)
  {
    this.html.style.backgroundColor='#AAAAAA';
  }
  this.deselect = function(e)
  {
    this.html.style.backgroundColor='#DDDDDD';
  }

  this.name = (name ? name : '???');
  this.icon = (icon ? icon : 'default_option.png');
  this.index = (index ? index : 0);
  this.owner = owner;
  this.constructHTML();

  return this;
}

function addBlankCat(e)
{
  var c = new Category('category', 'default_category.png', machine.categories.length, [], machine);
  machine.addCategory(c,e);
  c.editName(null);
}
function addBlankOpt(cat, e)
{
  var o = new Option('option', 'default_option.png', cat.options.length, cat);
  cat.addOption(o,e);
  o.editName(null);
}
function endEdits(e)
{
  machine.endEdit();
}
function loadDefaults(e)
{
  loadMachine(null);
}
function loadMachine(machine)
{
  if(machine)
    callService('machine',populateMachineFromJSON,machine);
  else
    callService('machine',populateMachineFromJSON);
}
function wipe(e)
{
  machine = new Machine(machine.url, []);
}
function load(e)
{

}
function save(e)
{

}
function roll(e)
{
  var to;
  var rcat;
  var ropt;
  rollo.text = '';
  rollo.html.innerHTML = '';
  rollo.infinitewidth.style.width = machine.categories.length*460+'px';
  for(var i = 0; i < machine.categories.length; i++)
  {
    rollo.text += machine.categories[i].name+':';
    if(machine.categories[i].options.length > 0) 
    {
      to = machine.categories[i].options[Math.floor(Math.random()*machine.categories[i].options.length)];

      for(var j = 0; j < machine.categories[i].options.length; j++)
        machine.categories[i].options[j].deselect();
      to.select();

      rollo.text += to.name;

      rcat = "<div class='ctitle' style='width:auto; float:left; position:relative; bottom:11px;'><img class='cicon' src='images/icons/"+machine.categories[i].icon+"' style='float:left;' /><div class='ctext' style='width:auto; float:left;'><div class='cname' style='width:auto; float:left;'>"+machine.categories[i].name+":</div></div></div>";
      ropt = "<div class='option' style='width:auto; float:left; position:relative; bottom:4px;'><img class='oicon' src='images/icons/"+to.icon+"' style='float:left;' /><div class='otext' style='width:auto; float:left;'><div class='oname' style='width:auto; float:left;'>"+to.name+"</div></div></div>";
      if(i < machine.categories.length-1) rollo.html.innerHTML += rcat+ropt+"<div style='width:30px; height:100px; float:left;'></div>";
      else rollo.html.innerHTML += rcat+ropt;
    }
    else
    {
      rollo.text += '(no option available)';
    }
    rollo.text += ' ';
  }
  rollo.trueWidth = rollo.html.offsetWidth+10;
  view(null);
}
function view(e)
{
  displayMessage(rollo.text);
}
function copy(e)
{
  alert(rollo.text);
}
function hideMessage(e)
{
  document.getElementById('blur').style.display = 'none';
  document.getElementById('messagebox').style.display = 'none';
}
function displayMessage(message)
{
  document.getElementById('messagebox').innerHTML = message;
  document.getElementById('blur').style.display='block';
  document.getElementById('messagebox').style.display='block';
}

function mousemoved(e)
{
  if(machine == null) return;
  var percentAcrossScreen = ((e.clientX-machine.trueZeroX)/(machine.vizWidth));
  var percentDownScreen = ((e.clientY-machine.trueZeroY)/(machine.vizHeight));
  var offset;

  //machine
  offset = 0-(percentAcrossScreen * (machine.trueWidth-machine.vizWidth));
  offset = offset < ((machine.trueWidth-machine.vizWidth)*-1) ? ((machine.trueWidth-machine.vizWidth)*-1) : offset;
  offset = offset > 0 ? 0 : offset;
  machine.offset = offset;
  
  //categories
  for(var i = 0; i < machine.categories.length; i++)
  {
    offset = 0-(percentDownScreen * (machine.categories[i].trueHeight-machine.vizHeight));
    offset = offset < ((machine.categories[i].trueHeight-machine.vizHeight)*-1) ? ((machine.categories[i].trueHeight-machine.vizHeight)*-1) : offset;
    offset = offset > 0 ? 0 : offset;
    machine.categories[i].offset = offset;
  }

  //roll
  offset = 0-(percentAcrossScreen * (rollo.trueWidth-545));
  offset = offset < ((rollo.trueWidth-545)*-1) ? ((rollo.trueWidth-545)*-1) : offset;
  offset = offset > 0 ? 0 : offset;
  //rollo.offset = offset;

  //document.getElementById('debug').innerHTML = "clientX:"+e.clientX+" clientY:"+e.clientY+" trueZeroX:"+machine.trueZeroX+" trueWidth:"+machine.trueWidth+" offset:"+offset+" <br />";
}
function windowresized(e)
{
  if(machine)
    machine.trueZeroX = (window.innerWidth - machine.vizWidth) / 2; //the x of the left edge of the container with the categories in it
}

function init() 
{ 
  if(getURLParam('m') == null) loadMachine(null); 
  else loadMachine(getURLParam('m'));

  rollo = {};
  rollo.infinitewidth = document.createElement('div');
  rollo.infinitewidth.style.width = '5000px';
  rollo.infinitewidth.style.position = 'relative';
  rollo.html = document.createElement('div');
  rollo.html.setAttribute('id','rollscroll');
  rollo.html.style.position = 'relative';
  rollo.html.style.float = 'left';
  rollo.html.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;<- Roll To Design A Game!";
  rollo.text = "You haven't rolled yet!";
  rollo.trueWidth = 545;
  rollo.offset = 0;
  document.getElementById('rcontent').appendChild(rollo.infinitewidth);
  rollo.infinitewidth.appendChild(rollo.html);
  window.onresize = function(e) { windowresized() };
  document.addEventListener('mousemove', function(e) { mousemoved(e); });
  document.getElementById('redobtn').addEventListener('click', function(e) { loadDefaults(e); });
  document.getElementById('wipebtn').addEventListener('click', function(e) { wipe(e); });
  document.getElementById('loadbtn').addEventListener('click', function(e) { load(e); });
  document.getElementById('savebtn').addEventListener('click', function(e) { save(e); });
  document.getElementById('rollbtn').addEventListener('click', function(e) { roll(e); });
  document.getElementById('viewbtn').addEventListener('click', function(e) { view(e); });
  document.getElementById('blur').addEventListener('click', function(e) { hideMessage(e); });
  document.getElementById('messagebox').addEventListener('click', function(e) { hideMessage(e); });
  document.addEventListener('keydown', function(e) { if(e.keyIdentifier == 'Shift' && machine != null) machine.shift(e); });
  document.addEventListener('keyup', function(e) { if(e.keyIdentifier == 'Shift' && machine != null) machine.unshift(e); });
  setInterval(function(){tick()},20);
}

var machine;
var roll;

window.addEventListener('load', init, false);
