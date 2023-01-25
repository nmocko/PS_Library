var button = document.getElementById('button');
var paragraph = document.getElementById('paragraph')
button.onclick = function() {
  paragraph.innerHTML += document.forms[0].elements[0].value + '<br />' + typeof(document.forms[0].elements[0]) + '<br />';
  paragraph.innerHTML += document.forms[0].elements[1].value  + '<br />' + typeof(document.forms[0].elements[1]) + '<br />';
};

button.onclick;