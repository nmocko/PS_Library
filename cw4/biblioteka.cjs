var http = require('http');
var fs = require('fs');
var path = require('path');
var nStatic = require('node-static');
var express = require('express'); 
var app = express(); 
var qs = require('querystring');

const re = new RegExp('/okladki/*');

function nowaksiazka(tab) {
	var plik = fs.readFileSync('ksiazki.json');
	let dane = JSON.parse(plik);
	var json = {"tytul": tab[1], "autorzy": tab[4], "ilość": tab[2], "zdjecie": "okladki/" + tab[3]};
	dane.push(json);
	var napis = JSON.stringify(dane);
	fs.writeFileSync('ksiazki.json', napis );


	console.log('dodano książkę')
}

function wyporzycz (tab) {
	var istnieje = 0;

	var plik = fs.readFileSync('ksiazki.json');
	let dane = JSON.parse(plik);

	let j = 0;

	for (let i in dane) {
		if (dane[i].tytul == tab[1]) {
			istnieje = 1;
			if (dane[i].ilość == 0) {
				console.log('Wszystkie książki o tym tytule zostały wyporyczone');
				return
			}
			j = i;
		}
	}

	if (istnieje == 0) {
		console.log('nie posiadamytej książki')
		return
	}

	var plik2 = fs.readFileSync('czytelnicy.json')
	let czyt = JSON.parse(plik2)

	for (let i in czyt) {
		if (czyt[i].imie == tab[2] && czyt[i].nazwisko == tab[3]) {
			console.log('Wyporzyczono') 
			czyt[i].książki.push(tab[1])
			let a = parseInt(dane[j].ilość);
			a = a - 1;
			dane[j].ilość = a;

			var napis = JSON.stringify(dane);
			fs.writeFileSync('ksiazki.json', napis );

			napis = JSON.stringify(czyt);
			fs.writeFileSync('czytelnicy.json', napis );

		}
	}

}

function zwrot (tab) {

	var plik2 = fs.readFileSync('czytelnicy.json')
	let czyt = JSON.parse(plik2)

	for (let i in czyt) {
		if (czyt[i].imie == tab[2] && czyt[i].nazwisko == tab[3]) {
			for (let j in czyt[i].książki) {
				if (czyt[i].książki[j] == tab[1]) {
					delete czyt[i].książki[j];
				}
			}

		}
	}

	var napis = JSON.stringify(czyt);
	fs.writeFileSync('czytelnicy.json', napis );

	var plik = fs.readFileSync('ksiazki.json');
	let dane = JSON.parse(plik);

	for (let i in dane) {
		if (dane[i].tytul == tab[1]) {
			let a = parseInt(dane[i].ilość);
			a = a + 1;
			dane[i].ilość = a;

		}
	}

	napis = JSON.stringify(dane);
	fs.writeFileSync('ksiazki.json', napis );


}

function html(response) {


	var plik = fs.readFileSync('ksiazki.json');
	let dane = JSON.parse(plik);


	response.write( `<!DOCTYPE html>
<html lang="pl">
  <!-- Zmień wartość "lang" z 'en' na 'pl' -->

  <head>
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' catbooks.gif; 
  script-src 'self'; style-src  'self' https://www.w3schools.com/w3css/4/w3.css https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css 'unsafe-inline'
  https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css https://fonts.googleapis.com/icon?family=Material+Icons 
  ">
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1">
    <link rel="stylesheet"
          href="https://www.w3schools.com/w3css/4/w3.css"><!-- Icons -->
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css">
   <link href="https://fonts.googleapis.com/icon?family=Material+Icons" 
          rel="stylesheet">
    <script src="http://cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"></script>
    <link href="http://cdn.jsdelivr.net/chartist.js/latest/chartist.min.css" rel="stylesheet" type="text/css" />
    <link href='http://fonts.googleapis.com/css?family=Oxygen:300' rel='stylesheet' type='text/css'>
  </head>

  <body>

  <div class="w3-container w3-bar w3-light-grey">
      
    <div class="w3-hide-medium w3-hide-small">
      <a href="#" class="w3-bar-item w3-button"><i class="fas fa-book-open"></i></a>

      <div class="w3-dropdown-hover" style="margin-left: auto; margin-right: auto;">
        <button class="w3-button">Książki &nbsp;&nbsp;<i class="fa fa-caret-down"></i></button>
        <div class="w3-dropdown-content w3-bar-block w3-card-4">
          <a href="#" class="w3-bar-item w3-button">Do wyporzyczenia</a>
          <a href="#" class="w3-bar-item w3-button">Do kupienia</a>
        </div>
      </div>

      <div style="float: right; width: 25%;" >
        <input type="text" style="width: 68%; float: left;" class="w3-bar-item w3-round-large w3-border w3-border-black w3-input" placeholder="Szukaj"></i>
        <a href="#" style="width: 30%; float: right" class="w3-bar-item w3-button w3-round-large w3-border w3-border-black w3-white">Szukaj</a> 
      </div>

    </div>

    <div class="w3-hide-large">

      <a href="#" class="w3-bar"><i class="w3-large fas fa-book-open"  style="padding-left: 48%; padding-top: 10px;"></i></a>
      
      <div class="w3-dropdown-hover w3-block">
        <button class="w3-button w3-block">Książki &nbsp;&nbsp;<i class="fa fa-caret-down"></i></button>
        <div class="w3-dropdown-content w3-bar-block" style="width: 95%;">
          <a href="#" class="w3-bar-item w3-block w3-button">Do wyporzyczenia</a>
          <a href="#" class="w3-bar-item  w3-block w3-button ">Do kupienia</a>
        </div>
      </div>

      <div style="float: right; width: 25%;" >
        <input type="text" style="width: 68%; float: left;" class="w3-bar-item w3-round-large w3-border w3-border-black w3-input" placeholder="Szukaj"></i>
        <a href="#" style="width: 30%; float: right" class="w3-bar-item w3-button w3-round-large w3-border w3-border-black w3-white">Szukaj</a> 
      </div>

      <div class=" w3-dropdown-hover w3-block">
        <button class="w3-button w3-block"><i class="fa fa-search"></i></button>
        <div class="w3-dropdown-content w3-bar-block" style="width: 95%;">
          <input href="#"  class="w3-bar-item w3-border w3-border-black w3-input" placeholder="Szukaj"></i>
          <a href="#"  class="w3-bar-item w3-button  w3-border w3-border-black w3-white">Szukaj</a> 
        </div>
      </div>
      
    </div>

</div>

<div style="padding-left: 30%; padding-top: 15px;">
<div class="w3-center w3-panel w3-card-4 w3-border w3-border-red" style="width: 45%;">
    <b>Komendy: <br /></b>
    D DODAJ (tytuł książki (spacje === '_')) (ilosc) (URL zdjęcia okładki) (Autorzy) <br />
    W WYPORZYCZ (tytuł książki) (Imie Nazwisko czytelnika) <br />
    Z ZWRÓĆ (tytuł książki) (Imie Nazwisko czytelnika) <br /> 
</div>
</div>

<form method="post" action="/submit">
    <div style="padding-left: 25%; padding-top: 16px;">
    <textarea name="name" rows="2" cols="80"></textarea>
    <div style="padding-left: 24%;">
    <button id="button" type="submit" class="w3-button w3-red w3-round-xlarge w3-border w3-border-black">Start!</button>
</div>
</div>
  </from>

<h2 class="w3-xxlarge" style="padding-top: 140px ;padding-left: 40px; width: 85%; margin-left: auto; margin-right: auto;">
  <b id="twoje">Witaj w Bibliotece Głównej AGH</b>
</h2>

<div class="w3-row w3-container" id='acc' style="width: 75%; margin-left: auto; margin-right: auto;">
</div>  

  <div>
    <h1 class="w3-xxlarge" style="padding-left: 40px; width: 85%; margin-left: auto; margin-right: auto;">
      <b>Zawartość księgozbioru</b>
    </h1>
  </div>

  <div class="w3-row w3-container" id='accordion' style="width: 75%; margin-left: auto; margin-right: auto;">` )


	for (let i in dane) {
		response.write( `    <div class="w3-col m6 l4  w3-margin-bottom">
		<div class="card w3-container" style="height: 120%;">
			<div id='ksiegozbior-${i}' class="w3-card-4 poj" style ="">
	
		<header class="w3-container w3-light-grey w3-border w3-border-black">
			<h3 class="w3-text-dark-grey ">${dane[i].tytul}</h3>
		</header>
	
		<div class="w3-container w3-border w3-border-black">
			<b class="w3-text-xx-large">${dane[i].autorzy}</b>
		</div>
		
		<div class="w3-border w3-border-black">
			<img src="${dane[i].zdjecie}" style="width:100%;  object-fit: cover;">
		</div>
		
		<button class="w3-pannel w3-border w3-border-black w3-block w3-light-grey w3-left-align w3-text-small"><b>Ilość:</b> ${dane[i].ilość}</button>
		
		</div> 
		</div>
		</div>` )
	}

	response.write( `</div>  
    <div class="w3-bar w3-center" style="width: 60%; margin-right: auto; margin-left: auto;">
      <div class="w3-bar-item w3-mobile" style="width:24%; margin-left: auto; margin-right: auto;">Biblioteka Główna Akademii Górniczo-Hutniczej</div>
      <div class="w3-bar-item w3-mobile" style="width: 38%; margin-left: auto; margin-right: auto;"><i class="material-icons">&#xe0be;</i><a class="w3-text-blue" href="mail: bgagh@bg.agh.edu.pl">bgagh@bg.agh.edu.pl</a></div>
      <div class="w3-bar-item w3-mobile" style="width: 38%; margin-left: auto; margin-right: auto;"> <i class="fa fa-phone"></i><a class="w3-text-blue" href="tel: +48126173208">+48 12 617 32 08</a></div>
    </div> 
  </body>
</html>`)

response.end();
	
}



http.createServer(function (request, response) {
	console.log("--------------------------------------");
	console.log("The relative URL of the current request: " + request.url + "\n");
	var url = new URL(request.url, `http://${request.headers.host}`); // Create the URL object
	if (url.pathname == '/submit') { // Processing the form content, if the relative URL is '/submit'
		/* ************************************************** */
		console.log("Creating a response header");
		// Creating an answer header — we inform the browser that the body of the answer will be plain text
		/* ************************************************** */
		console.log("Creating a response body");
		

    var body = '';          

    request.on('data', function (data) {
      body += data;
      console.log(body);
      console.log(123)
      var post = qs.parse(body);
      console.log(post.name);
      var x = post.name;

      const myArray = x.split(" ");
      console.log(myArray);
      if (myArray[0] === "D" || myArray[0] === "DODAJ")
      {
          nowaksiazka(myArray);
      }
      else if (myArray[0] === "W" || myArray[0] === "WYPORZYCZ")
      {
          wyporzycz(myArray);
          console.log('wyyy')
      }
      else if (myArray[0] === "Z" || myArray[0] === "ZWRÓĆ")
      {
          zwrot(myArray);
      }
      else {
          console.log("Błędna komenda\n ");
      }
        
    });
    
    request.on('end', function() {
      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        html(response);
    })
		
	}
	else if (re.test(url.pathname)) {
		var n = url.pathname;
		var hrefParts = n.split('/');
		var img = fs.readFileSync(hrefParts[1] + '/' + hrefParts[2]);
     	response.writeHead(200, {'Content-Type': 'image/gif' });
     	response.end(img, 'binary');
	}
	else if (url.pathname == '/favicon.ico') {
		var img = fs.readFileSync('catbooks.gif');
     	response.writeHead(200, {'Content-Type': 'image/gif' });
     	response.end(img, 'binary');
	}

	else { // Generating the form
		/* ************************************************** */
		console.log("Creating a response header2")
		// Creating a response header — we inform the browser that the body of the response will be HTML text
		response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
		/* ************************************************** */
		console.log("Creating a response body");
		// and now we put an HTML form in the body of the answer
		html(response);
		/* ************************************************** */
		console.log("Sending the response");
		response.end();  // The end of the response — send it to the browser
	}
} ).listen(8000);


// server.listen(8000);
// var server = http.createServer(requestListener).listen(8000);
console.log("The server was started on port 8000");
console.log("To stop the server, press 'CTRL + C'");
