var buttonU = document.getElementById('buttonU');
var buttonS = document.getElementById('buttonS');


buttonU.onclick = function() {
header.style.cssText= `background-color:rgb(206, 236, 247);
border: 1px solid;
box-shadow:0px 0px 5px;`;

naw.style.cssText= `background-color:rgb(206, 236, 247);
border: 1px solid;
box-shadow:0px 0px 5px;
width: 15vw;
position: relative;
top: 15px;`;

document.getElementById("hh").style.cssText = `font-size: 3.2vw;
margin: 8px;`;

aside.style.cssText= `background-color:rgb(206, 236, 247);
border: 1px solid;
box-shadow:0px 0px 5px;
z-index: 2;
position: relative;
float: right;
bottom: 5.7vw;
width: 40vw;`;

document.getElementById("h1mm").style.cssText = `font-size: 2vw;
margin: 7px;`;

document.getElementById("h2mm").style.cssText = `font-size: 2vw;
position: relative;
bottom: 8px;
margin: 7px;`;

document.getElementById("ull").style.cssText = `font-size: 1.5vw;
position: relative;
bottom: 15px;`;

document.getElementById("main").style.cssText = `background-color:rgb(206, 236, 247);
border: 1px solid;
box-shadow:0px 0px 5px;
width: 40vw;
position: relative;
top: 30px;
z-index: 1;`;

document.getElementById("h1main").style.cssText = `margin: 9px;
font-size: 2.5vw;`;

document.getElementById("blockquote").style.cssText = `font-family: "Lucida Console", monospace;
position: relative;
font-size: 1.1vw;
margin: 9px;`;

document.getElementById("footer").style.cssText= `background-color:rgb(206, 236, 247);
border: 1px solid;
box-shadow:0px 0px 5px;
padding: 7px 7px 8px;
outline-offset: 10px;
font-size: 1.6vw;
position: relative;
top: 40px;`;

document.getElementById("ul").style.cssText = `font-size: 1.5vw;
text-align: left;`;

form.style.cssText = `position: relative;
float: right;
background-color:rgb(206, 236, 247);
border: 1px solid;
box-shadow:0px 0px 5px;
padding: 7px;
bottom: 5px;`;
}

buttonS.onclick =  function() {
header.style.cssText = "none";
naw.style.cssText = "none";
document.getElementById("hh").style.cssText = "none";
aside.style.cssText = "none";
document.getElementById("h1mm").style.cssText = "none";
document.getElementById("h2mm").style.cssText = "none";
document.getElementById("ull").style.cssText = "none";
document.getElementById("main").style.cssText = "none";
document.getElementById("h1main").style.cssText = "none";
document.getElementById("blockquote").style.cssText = "none";
document.getElementById("footer").style.cssText = "none";
document.getElementById("ul").style.cssText = "none";
form.style.cssText = "none";
}

buttonU.onclick;
buttonS.onclick;