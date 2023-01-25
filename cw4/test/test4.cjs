//Source:  https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/
var supertest = require("supertest");

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:8000");

// UNIT test begin
describe('POST /submit', function () {
      it('name=D Pan 10 Pan_Tadeusz.jpeg Adam', function (done) {
            server
            .post('/submit')
            .send("name=D Pan 10 Pan_Tadeusz.jpeg Adam")
            .expect('Content-Type', "text/html; charset=utf-8")
            .expect(200, '<!DOCTYPE html>\n' +
            '<html lang="pl">\n' +
            `  <!-- Zmień wartość "lang" z 'en' na 'pl' -->\n` +
            '\n' +
            '  <head>\n' +
            `  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' catbooks.gif; \n` +
            "  script-src 'self'; style-src  'self' https://www.w3schools.com/w3css/4/w3.css https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css 'unsafe-inline'\n" +
            '  https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css https://fonts.googleapis.com/icon?family=Material+Icons \n' +
            '  ">\n' +
            '    <meta charset="UTF-8">\n' +
            '    <meta name="viewport"\n' +
            '          content="width=device-width, initial-scale=1">\n' +
            '    <link rel="stylesheet"\n' +
            '          href="https://www.w3schools.com/w3css/4/w3.css"><!-- Icons -->\n' +
            '    <link rel="stylesheet"\n' +
            '          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">\n' +
            '    <link rel="stylesheet"\n' +
            '          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css">\n' +
            '   <link href="https://fonts.googleapis.com/icon?family=Material+Icons" \n' +
            '          rel="stylesheet">\n' +
            '    <script src="http://cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"></script>\n' +
            '    <link href="http://cdn.jsdelivr.net/chartist.js/latest/chartist.min.css" rel="stylesheet" type="text/css" />\n' +
            "    <link href='http://fonts.googleapis.com/css?family=Oxygen:300' rel='stylesheet' type='text/css'>\n" +
            '  </head>\n' +
            '\n' +
            '  <body>\n' +
            '\n' +
            '  <div class="w3-container w3-bar w3-light-grey">\n' +
            '      \n' +
            '    <div class="w3-hide-medium w3-hide-small">\n' +
            '      <a href="#" class="w3-bar-item w3-button"><i class="fas fa-book-open"></i></a>\n' +
            '\n' +
            '      <div class="w3-dropdown-hover" style="margin-left: auto; margin-right: auto;">\n' +
            '        <button class="w3-button">Książki &nbsp;&nbsp;<i class="fa fa-caret-down"></i></button>\n' +
            '        <div class="w3-dropdown-content w3-bar-block w3-card-4">\n' +
            '          <a href="#" class="w3-bar-item w3-button">Do wyporzyczenia</a>\n' +
            '          <a href="#" class="w3-bar-item w3-button">Do kupienia</a>\n' +
            '        </div>\n' +
            '      </div>\n' +
            '\n' +
            '      <div style="float: right; width: 25%;" >\n' +
            '        <input type="text" style="width: 68%; float: left;" class="w3-bar-item w3-round-large w3-border w3-border-black w3-input" placeholder="Szukaj"></i>\n' +
            '        <a href="#" style="width: 30%; float: right" class="w3-bar-item w3-button w3-round-large w3-border w3-border-black w3-white">Szukaj</a> \n' +
            '      </div>\n' +
            '\n' +
            '    </div>\n' +
            '\n' +
            '    <div class="w3-hide-large">\n' +
            '\n' +
            '      <a href="#" class="w3-bar"><i class="w3-large fas fa-book-open"  style="padding-left: 48%; padding-top: 10px;"></i></a>\n' +
            '      \n' +
            '      <div class="w3-dropdown-hover w3-block">\n' +
            '        <button class="w3-button w3-block">Książki &nbsp;&nbsp;<i class="fa fa-caret-down"></i></button>\n' +
            '        <div class="w3-dropdown-content w3-bar-block" style="width: 95%;">\n' +
            '          <a href="#" class="w3-bar-item w3-block w3-button">Do wyporzyczenia</a>\n' +
            '          <a href="#" class="w3-bar-item  w3-block w3-button ">Do kupienia</a>\n' +
            '        </div>\n' +
            '      </div>\n' +
            '\n' +
            '      <div style="float: right; width: 25%;" >\n' +
            '        <input type="text" style="width: 68%; float: left;" class="w3-bar-item w3-round-large w3-border w3-border-black w3-input" placeholder="Szukaj"></i>\n' +
            '        <a href="#" style="width: 30%; float: right" class="w3-bar-item w3-button w3-round-large w3-border w3-border-black w3-white">Szukaj</a> \n' +
            '      </div>\n' +
            '\n' +
            '      <div class=" w3-dropdown-hover w3-block">\n' +
            '        <button class="w3-button w3-block"><i class="fa fa-search"></i></button>\n' +
            '        <div class="w3-dropdown-content w3-bar-block" style="width: 95%;">\n' +
            '          <input href="#"  class="w3-bar-item w3-border w3-border-black w3-input" placeholder="Szukaj"></i>\n' +
            '          <a href="#"  class="w3-bar-item w3-button  w3-border w3-border-black w3-white">Szukaj</a> \n' +
            '        </div>\n' +
            '      </div>\n' +
            '      \n' +
            '    </div>\n' +
            '\n' +
            '</div>\n' +
            '\n' +
            '<div style="padding-left: 30%; padding-top: 15px;">\n' +
            '<div class="w3-center w3-panel w3-card-4 w3-border w3-border-red" style="width: 45%;">\n' +
            '    <b>Komendy: <br /></b>\n' +
            "    D DODAJ (tytuł książki (spacje === '_')) (ilosc) (URL zdjęcia okładki) (Autorzy) <br />\n" +
            '    W WYPORZYCZ (tytuł książki) (Imie Nazwisko czytelnika) <br />\n' +
            '    Z ZWRÓĆ (tytuł książki) (Imie Nazwisko czytelnika) <br /> \n' +
            '</div>\n' +
            '</div>\n' +
            '\n' +
            '<form method="post" action="/submit">\n' +
            '    <div style="padding-left: 25%; padding-top: 16px;">\n' +
            '    <textarea name="name" rows="2" cols="80"></textarea>\n' +
            '    <div style="padding-left: 24%;">\n' +
            '    <button id="button" type="submit" class="w3-button w3-red w3-round-xlarge w3-border w3-border-black">Start!</button>\n' +
            '</div>\n' +
            '</div>\n' +
            '  </from>\n' +
            '\n' +
            '<h2 class="w3-xxlarge" style="padding-top: 140px ;padding-left: 40px; width: 85%; margin-left: auto; margin-right: auto;">\n' +
            '  <b id="twoje">Witaj w Bibliotece Głównej AGH</b>\n' +
            '</h2>\n' +
            '\n' +
            `<div class="w3-row w3-container" id='acc' style="width: 75%; margin-left: auto; margin-right: auto;">\n` +
            '</div>  \n' +
            '\n' +
            '  <div>\n' +
            '    <h1 class="w3-xxlarge" style="padding-left: 40px; width: 85%; margin-left: auto; margin-right: auto;">\n' +
            '      <b>Zawartość księgozbioru</b>\n' +
            '    </h1>\n' +
            '  </div>\n' +
            '\n' +
            `  <div class="w3-row w3-container" id='accordion' style="width: 75%; margin-left: auto; margin-right: auto;">    <div class="w3-col m6 l4  w3-margin-bottom">\n` +
            '\t\t<div class="card w3-container" style="height: 120%;">\n' +
            `\t\t\t<div id='ksiegozbior-0' class="w3-card-4 poj" style ="">\n` +
            '\t\n' +
            '\t\t<header class="w3-container w3-light-grey w3-border w3-border-black">\n' +
            '\t\t\t<h3 class="w3-text-dark-grey ">Pan_Tadeusz</h3>\n' +
            '\t\t</header>\n' +
            '\t\n' +
            '\t\t<div class="w3-container w3-border w3-border-black">\n' +
            '\t\t\t<b class="w3-text-xx-large">Adam_Mickiewicz</b>\n' +
            '\t\t</div>\n' +
            '\t\t\n' +
            '\t\t<div class="w3-border w3-border-black">\n' +
            '\t\t\t<img src="okladki/Pan_Tadeusz.jpeg" style="width:100%;  object-fit: cover;">\n' +
            '\t\t</div>\n' +
            '\t\t\n' +
            '\t\t<button class="w3-pannel w3-border w3-border-black w3-block w3-light-grey w3-left-align w3-text-small"><b>Ilość:</b> 1</button>\n' +
            '\t\t\n' +
            '\t\t</div> \n' +
            '\t\t</div>\n' +
            '\t\t</div>    <div class="w3-col m6 l4  w3-margin-bottom">\n' +
            '\t\t<div class="card w3-container" style="height: 120%;">\n' +
            `\t\t\t<div id='ksiegozbior-1' class="w3-card-4 poj" style ="">\n` +
            '\t\n' +
            '\t\t<header class="w3-container w3-light-grey w3-border w3-border-black">\n' +
            '\t\t\t<h3 class="w3-text-dark-grey ">Solaris</h3>\n' +
            '\t\t</header>\n' +
            '\t\n' +
            '\t\t<div class="w3-container w3-border w3-border-black">\n' +
            '\t\t\t<b class="w3-text-xx-large">Stanislaw_Lem</b>\n' +
            '\t\t</div>\n' +
            '\t\t\n' +
            '\t\t<div class="w3-border w3-border-black">\n' +
            '\t\t\t<img src="okladki/Solaris.jpeg" style="width:100%;  object-fit: cover;">\n' +
            '\t\t</div>\n' +
            '\t\t\n' +
            '\t\t<button class="w3-pannel w3-border w3-border-black w3-block w3-light-grey w3-left-align w3-text-small"><b>Ilość:</b> 1</button>\n' +
            '\t\t\n' +
            '\t\t</div> \n' +
            '\t\t</div>\n' +
            '\t\t</div>    <div class="w3-col m6 l4  w3-margin-bottom">\n' +
            '\t\t<div class="card w3-container" style="height: 120%;">\n' +
            `\t\t\t<div id='ksiegozbior-2' class="w3-card-4 poj" style ="">\n` +
            '\t\n' +
            '\t\t<header class="w3-container w3-light-grey w3-border w3-border-black">\n' +
            '\t\t\t<h3 class="w3-text-dark-grey ">Wesele</h3>\n' +
            '\t\t</header>\n' +
            '\t\n' +
            '\t\t<div class="w3-container w3-border w3-border-black">\n' +
            '\t\t\t<b class="w3-text-xx-large">Stanisław_Wyspiański</b>\n' +
            '\t\t</div>\n' +
            '\t\t\n' +
            '\t\t<div class="w3-border w3-border-black">\n' +
            '\t\t\t<img src="okladki/Wesele.jpeg" style="width:100%;  object-fit: cover;">\n' +
            '\t\t</div>\n' +
            '\t\t\n' +
            '\t\t<button class="w3-pannel w3-border w3-border-black w3-block w3-light-grey w3-left-align w3-text-small"><b>Ilość:</b> 0</button>\n' +
            '\t\t\n' +
            '\t\t</div> \n' +
            '\t\t</div>\n' +
            '\t\t</div>    <div class="w3-col m6 l4  w3-margin-bottom">\n' +
            '\t\t<div class="card w3-container" style="height: 120%;">\n' +
            `\t\t\t<div id='ksiegozbior-3' class="w3-card-4 poj" style ="">\n` +
            '\t\n' +
            '\t\t<header class="w3-container w3-light-grey w3-border w3-border-black">\n' +
            '\t\t\t<h3 class="w3-text-dark-grey ">Lalka</h3>\n' +
            '\t\t</header>\n' +
            '\t\n' +
            '\t\t<div class="w3-container w3-border w3-border-black">\n' +
            '\t\t\t<b class="w3-text-xx-large">Bolesław_Prus</b>\n' +
            '\t\t</div>\n' +
            '\t\t\n' +
            '\t\t<div class="w3-border w3-border-black">\n' +
            '\t\t\t<img src="okladki/Lalka.jpeg" style="width:100%;  object-fit: cover;">\n' +
            '\t\t</div>\n' +
            '\t\t\n' +
            '\t\t<button class="w3-pannel w3-border w3-border-black w3-block w3-light-grey w3-left-align w3-text-small"><b>Ilość:</b> 6</button>\n' +
            '\t\t\n' +
            '\t\t</div> \n' +
            '\t\t</div>\n' +
            '\t\t</div>    <div class="w3-col m6 l4  w3-margin-bottom">\n' +
            '\t\t<div class="card w3-container" style="height: 120%;">\n' +
            `\t\t\t<div id='ksiegozbior-4' class="w3-card-4 poj" style ="">\n` +
            '\t\n' +
            '\t\t<header class="w3-container w3-light-grey w3-border w3-border-black">\n' +
            '\t\t\t<h3 class="w3-text-dark-grey ">Pan</h3>\n' +
            '\t\t</header>\n' +
            '\t\n' +
            '\t\t<div class="w3-container w3-border w3-border-black">\n' +
            '\t\t\t<b class="w3-text-xx-large">Adam</b>\n' +
            '\t\t</div>\n' +
            '\t\t\n' +
            '\t\t<div class="w3-border w3-border-black">\n' +
            '\t\t\t<img src="okladki/Pan_Tadeusz.jpeg" style="width:100%;  object-fit: cover;">\n' +
            '\t\t</div>\n' +
            '\t\t\n' +
            '\t\t<button class="w3-pannel w3-border w3-border-black w3-block w3-light-grey w3-left-align w3-text-small"><b>Ilość:</b> 10</button>\n' +
            '\t\t\n' +
            '\t\t</div> \n' +
            '\t\t</div>\n' +
            '\t\t</div></div>  \n' +
            '    <div class="w3-bar w3-center" style="width: 60%; margin-right: auto; margin-left: auto;">\n' +
            '      <div class="w3-bar-item w3-mobile" style="width:24%; margin-left: auto; margin-right: auto;">Biblioteka Główna Akademii Górniczo-Hutniczej</div>\n' +
            '      <div class="w3-bar-item w3-mobile" style="width: 38%; margin-left: auto; margin-right: auto;"><i class="material-icons">&#xe0be;</i><a class="w3-text-blue" href="mail: bgagh@bg.agh.edu.pl">bgagh@bg.agh.edu.pl</a></div>\n' +
            '      <div class="w3-bar-item w3-mobile" style="width: 38%; margin-left: auto; margin-right: auto;"> <i class="fa fa-phone"></i><a class="w3-text-blue" href="tel: +48126173208">+48 12 617 32 08</a></div>\n' +
            '    </div> \n' +
            '  </body>\n' +
            '</html>', done);
      });
      it('name=W Pan_Tadeusz Adam Kostka', function (done) {
            server
            .post('/submit')
            .send("name=W Pan_Tadeusz Adam Kostka")
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect('Content-Type', "text/html; charset=utf-8")
            .expect(200, '<!DOCTYPE html>\n' +
            '<html lang="pl">\n' +
            `  <!-- Zmień wartość "lang" z 'en' na 'pl' -->\n` +
            '\n' +
            '  <head>\n' +
            `  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' catbooks.gif; \n` +
            "  script-src 'self'; style-src  'self' https://www.w3schools.com/w3css/4/w3.css https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css 'unsafe-inline'\n" +
            '  https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css https://fonts.googleapis.com/icon?family=Material+Icons \n' +
            '  ">\n' +
            '    <meta charset="UTF-8">\n' +
            '    <meta name="viewport"\n' +
            '          content="width=device-width, initial-scale=1">\n' +
            '    <link rel="stylesheet"\n' +
            '          href="https://www.w3schools.com/w3css/4/w3.css"><!-- Icons -->\n' +
            '    <link rel="stylesheet"\n' +
            '          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">\n' +
            '    <link rel="stylesheet"\n' +
            '          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css">\n' +
            '   <link href="https://fonts.googleapis.com/icon?family=Material+Icons" \n' +
            '          rel="stylesheet">\n' +
            '    <script src="http://cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"></script>\n' +
            '    <link href="http://cdn.jsdelivr.net/chartist.js/latest/chartist.min.css" rel="stylesheet" type="text/css" />\n' +
            "    <link href='http://fonts.googleapis.com/css?family=Oxygen:300' rel='stylesheet' type='text/css'>\n" +
            '  </head>\n' +
            '\n' +
            '  <body>\n' +
            '\n' +
            '  <div class="w3-container w3-bar w3-light-grey">\n' +
            '      \n' +
            '    <div class="w3-hide-medium w3-hide-small">\n' +
            '      <a href="#" class="w3-bar-item w3-button"><i class="fas fa-book-open"></i></a>\n' +
            '\n' +
            '      <div class="w3-dropdown-hover" style="margin-left: auto; margin-right: auto;">\n' +
            '        <button class="w3-button">Książki &nbsp;&nbsp;<i class="fa fa-caret-down"></i></button>\n' +
            '        <div class="w3-dropdown-content w3-bar-block w3-card-4">\n' +
            '          <a href="#" class="w3-bar-item w3-button">Do wyporzyczenia</a>\n' +
            '          <a href="#" class="w3-bar-item w3-button">Do kupienia</a>\n' +
            '        </div>\n' +
            '      </div>\n' +
            '\n' +
            '      <div style="float: right; width: 25%;" >\n' +
            '        <input type="text" style="width: 68%; float: left;" class="w3-bar-item w3-round-large w3-border w3-border-black w3-input" placeholder="Szukaj"></i>\n' +
            '        <a href="#" style="width: 30%; float: right" class="w3-bar-item w3-button w3-round-large w3-border w3-border-black w3-white">Szukaj</a> \n' +
            '      </div>\n' +
            '\n' +
            '    </div>\n' +
            '\n' +
            '    <div class="w3-hide-large">\n' +
            '\n' +
            '      <a href="#" class="w3-bar"><i class="w3-large fas fa-book-open"  style="padding-left: 48%; padding-top: 10px;"></i></a>\n' +
            '      \n' +
            '      <div class="w3-dropdown-hover w3-block">\n' +
            '        <button class="w3-button w3-block">Książki &nbsp;&nbsp;<i class="fa fa-caret-down"></i></button>\n' +
            '        <div class="w3-dropdown-content w3-bar-block" style="width: 95%;">\n' +
            '          <a href="#" class="w3-bar-item w3-block w3-button">Do wyporzyczenia</a>\n' +
            '          <a href="#" class="w3-bar-item  w3-block w3-button ">Do kupienia</a>\n' +
            '        </div>\n' +
            '      </div>\n' +
            '\n' +
            '      <div style="float: right; width: 25%;" >\n' +
            '        <input type="text" style="width: 68%; float: left;" class="w3-bar-item w3-round-large w3-border w3-border-black w3-input" placeholder="Szukaj"></i>\n' +
            '        <a href="#" style="width: 30%; float: right" class="w3-bar-item w3-button w3-round-large w3-border w3-border-black w3-white">Szukaj</a> \n' +
            '      </div>\n' +
            '\n' +
            '      <div class=" w3-dropdown-hover w3-block">\n' +
            '        <button class="w3-button w3-block"><i class="fa fa-search"></i></button>\n' +
            '        <div class="w3-dropdown-content w3-bar-block" style="width: 95%;">\n' +
            '          <input href="#"  class="w3-bar-item w3-border w3-border-black w3-input" placeholder="Szukaj"></i>\n' +
            '          <a href="#"  class="w3-bar-item w3-button  w3-border w3-border-black w3-white">Szukaj</a> \n' +
            '        </div>\n' +
            '      </div>\n' +
            '      \n' +
            '    </div>\n' +
            '\n' +
            '</div>\n' +
            '\n' +
            '<div style="padding-left: 30%; padding-top: 15px;">\n' +
            '<div class="w3-center w3-panel w3-card-4 w3-border w3-border-red" style="width: 45%;">\n' +
            '    <b>Komendy: <br /></b>\n' +
            "    D DODAJ (tytuł książki (spacje === '_')) (ilosc) (URL zdjęcia okładki) (Autorzy) <br />\n" +
            '    W WYPORZYCZ (tytuł książki) (Imie Nazwisko czytelnika) <br />\n' +
            '    Z ZWRÓĆ (tytuł książki) (Imie Nazwisko czytelnika) <br /> \n' +
            '</div>\n' +
            '</div>\n' +
            '\n' +
            '<form method="post" action="/submit">\n' +
            '    <div style="padding-left: 25%; padding-top: 16px;">\n' +
            '    <textarea name="name" rows="2" cols="80"></textarea>\n' +
            '    <div style="padding-left: 24%;">\n' +
            '    <button id="button" type="submit" class="w3-button w3-red w3-round-xlarge w3-border w3-border-black">Start!</button>\n' +
            '</div>\n' +
            '</div>\n' +
            '  </from>\n' +
            '\n' +
            '<h2 class="w3-xxlarge" style="padding-top: 140px ;padding-left: 40px; width: 85%; margin-left: auto; margin-right: auto;">\n' +
            '  <b id="twoje">Witaj w Bibliotece Głównej AGH</b>\n' +
            '</h2>\n' +
            '\n' +
            `<div class="w3-row w3-container" id='acc' style="width: 75%; margin-left: auto; margin-right: auto;">\n` +
            '</div>  \n' +
            '\n' +
            '  <div>\n' +
            '    <h1 class="w3-xxlarge" style="padding-left: 40px; width: 85%; margin-left: auto; margin-right: auto;">\n' +
            '      <b>Zawartość księgozbioru</b>\n' +
            '    </h1>\n' +
            '  </div>\n' +
            '\n' +
            `  <div class="w3-row w3-container" id='accordion' style="width: 75%; margin-left: auto; margin-right: auto;">    <div class="w3-col m6 l4  w3-margin-bottom">\n` +
            '\t\t<div class="card w3-container" style="height: 120%;">\n' +
            `\t\t\t<div id='ksiegozbior-0' class="w3-card-4 poj" style ="">\n` +
            '\t\n' +
            '\t\t<header class="w3-container w3-light-grey w3-border w3-border-black">\n' +
            '\t\t\t<h3 class="w3-text-dark-grey ">Pan_Tadeusz</h3>\n' +
            '\t\t</header>\n' +
            '\t\n' +
            '\t\t<div class="w3-container w3-border w3-border-black">\n' +
            '\t\t\t<b class="w3-text-xx-large">Adam_Mickiewicz</b>\n' +
            '\t\t</div>\n' +
            '\t\t\n' +
            '\t\t<div class="w3-border w3-border-black">\n' +
            '\t\t\t<img src="okladki/Pan_Tadeusz.jpeg" style="width:100%;  object-fit: cover;">\n' +
            '\t\t</div>\n' +
            '\t\t\n' +
            '\t\t<button class="w3-pannel w3-border w3-border-black w3-block w3-light-grey w3-left-align w3-text-small"><b>Ilość:</b> 0</button>\n' +
            '\t\t\n' +
            '\t\t</div> \n' +
            '\t\t</div>\n' +
            '\t\t</div>    <div class="w3-col m6 l4  w3-margin-bottom">\n' +
            '\t\t<div class="card w3-container" style="height: 120%;">\n' +
            `\t\t\t<div id='ksiegozbior-1' class="w3-card-4 poj" style ="">\n` +
            '\t\n' +
            '\t\t<header class="w3-container w3-light-grey w3-border w3-border-black">\n' +
            '\t\t\t<h3 class="w3-text-dark-grey ">Solaris</h3>\n' +
            '\t\t</header>\n' +
            '\t\n' +
            '\t\t<div class="w3-container w3-border w3-border-black">\n' +
            '\t\t\t<b class="w3-text-xx-large">Stanislaw_Lem</b>\n' +
            '\t\t</div>\n' +
            '\t\t\n' +
            '\t\t<div class="w3-border w3-border-black">\n' +
            '\t\t\t<img src="okladki/Solaris.jpeg" style="width:100%;  object-fit: cover;">\n' +
            '\t\t</div>\n' +
            '\t\t\n' +
            '\t\t<button class="w3-pannel w3-border w3-border-black w3-block w3-light-grey w3-left-align w3-text-small"><b>Ilość:</b> 1</button>\n' +
            '\t\t\n' +
            '\t\t</div> \n' +
            '\t\t</div>\n' +
            '\t\t</div>    <div class="w3-col m6 l4  w3-margin-bottom">\n' +
            '\t\t<div class="card w3-container" style="height: 120%;">\n' +
            `\t\t\t<div id='ksiegozbior-2' class="w3-card-4 poj" style ="">\n` +
            '\t\n' +
            '\t\t<header class="w3-container w3-light-grey w3-border w3-border-black">\n' +
            '\t\t\t<h3 class="w3-text-dark-grey ">Wesele</h3>\n' +
            '\t\t</header>\n' +
            '\t\n' +
            '\t\t<div class="w3-container w3-border w3-border-black">\n' +
            '\t\t\t<b class="w3-text-xx-large">Stanisław_Wyspiański</b>\n' +
            '\t\t</div>\n' +
            '\t\t\n' +
            '\t\t<div class="w3-border w3-border-black">\n' +
            '\t\t\t<img src="okladki/Wesele.jpeg" style="width:100%;  object-fit: cover;">\n' +
            '\t\t</div>\n' +
            '\t\t\n' +
            '\t\t<button class="w3-pannel w3-border w3-border-black w3-block w3-light-grey w3-left-align w3-text-small"><b>Ilość:</b> 0</button>\n' +
            '\t\t\n' +
            '\t\t</div> \n' +
            '\t\t</div>\n' +
            '\t\t</div>    <div class="w3-col m6 l4  w3-margin-bottom">\n' +
            '\t\t<div class="card w3-container" style="height: 120%;">\n' +
            `\t\t\t<div id='ksiegozbior-3' class="w3-card-4 poj" style ="">\n` +
            '\t\n' +
            '\t\t<header class="w3-container w3-light-grey w3-border w3-border-black">\n' +
            '\t\t\t<h3 class="w3-text-dark-grey ">Lalka</h3>\n' +
            '\t\t</header>\n' +
            '\t\n' +
            '\t\t<div class="w3-container w3-border w3-border-black">\n' +
            '\t\t\t<b class="w3-text-xx-large">Bolesław_Prus</b>\n' +
            '\t\t</div>\n' +
            '\t\t\n' +
            '\t\t<div class="w3-border w3-border-black">\n' +
            '\t\t\t<img src="okladki/Lalka.jpeg" style="width:100%;  object-fit: cover;">\n' +
            '\t\t</div>\n' +
            '\t\t\n' +
            '\t\t<button class="w3-pannel w3-border w3-border-black w3-block w3-light-grey w3-left-align w3-text-small"><b>Ilość:</b> 6</button>\n' +
            '\t\t\n' +
            '\t\t</div> \n' +
            '\t\t</div>\n' +
            '\t\t</div>    <div class="w3-col m6 l4  w3-margin-bottom">\n' +
            '\t\t<div class="card w3-container" style="height: 120%;">\n' +
            `\t\t\t<div id='ksiegozbior-4' class="w3-card-4 poj" style ="">\n` +
            '\t\n' +
            '\t\t<header class="w3-container w3-light-grey w3-border w3-border-black">\n' +
            '\t\t\t<h3 class="w3-text-dark-grey ">Pan</h3>\n' +
            '\t\t</header>\n' +
            '\t\n' +
            '\t\t<div class="w3-container w3-border w3-border-black">\n' +
            '\t\t\t<b class="w3-text-xx-large">Adam</b>\n' +
            '\t\t</div>\n' +
            '\t\t\n' +
            '\t\t<div class="w3-border w3-border-black">\n' +
            '\t\t\t<img src="okladki/Pan_Tadeusz.jpeg" style="width:100%;  object-fit: cover;">\n' +
            '\t\t</div>\n' +
            '\t\t\n' +
            '\t\t<button class="w3-pannel w3-border w3-border-black w3-block w3-light-grey w3-left-align w3-text-small"><b>Ilość:</b> 10</button>\n' +
            '\t\t\n' +
            '\t\t</div> \n' +
            '\t\t</div>\n' +
            '\t\t</div></div>  \n' +
            '    <div class="w3-bar w3-center" style="width: 60%; margin-right: auto; margin-left: auto;">\n' +
            '      <div class="w3-bar-item w3-mobile" style="width:24%; margin-left: auto; margin-right: auto;">Biblioteka Główna Akademii Górniczo-Hutniczej</div>\n' +
            '      <div class="w3-bar-item w3-mobile" style="width: 38%; margin-left: auto; margin-right: auto;"><i class="material-icons">&#xe0be;</i><a class="w3-text-blue" href="mail: bgagh@bg.agh.edu.pl">bgagh@bg.agh.edu.pl</a></div>\n' +
            '      <div class="w3-bar-item w3-mobile" style="width: 38%; margin-left: auto; margin-right: auto;"> <i class="fa fa-phone"></i><a class="w3-text-blue" href="tel: +48126173208">+48 12 617 32 08</a></div>\n' +
            '    </div> \n' +
            '  </body>\n' +
            '</html>', done);
      });
      it('name= Z Pan_Tadeusz Adam Kostka', function (done) {
            server
            .post('/submit')
            .send("name=Z Pan_Tadeusz Adam Kostka")
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect('Content-Type', "text/html; charset=utf-8")
            .expect(200, '<!DOCTYPE html>\n' +
            '<html lang="pl">\n' +
            `  <!-- Zmień wartość "lang" z 'en' na 'pl' -->\n` +
            '\n' +
            '  <head>\n' +
            `  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' catbooks.gif; \n` +
            "  script-src 'self'; style-src  'self' https://www.w3schools.com/w3css/4/w3.css https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css 'unsafe-inline'\n" +
            '  https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css https://fonts.googleapis.com/icon?family=Material+Icons \n' +
            '  ">\n' +
            '    <meta charset="UTF-8">\n' +
            '    <meta name="viewport"\n' +
            '          content="width=device-width, initial-scale=1">\n' +
            '    <link rel="stylesheet"\n' +
            '          href="https://www.w3schools.com/w3css/4/w3.css"><!-- Icons -->\n' +
            '    <link rel="stylesheet"\n' +
            '          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">\n' +
            '    <link rel="stylesheet"\n' +
            '          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css">\n' +
            '   <link href="https://fonts.googleapis.com/icon?family=Material+Icons" \n' +
            '          rel="stylesheet">\n' +
            '    <script src="http://cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"></script>\n' +
            '    <link href="http://cdn.jsdelivr.net/chartist.js/latest/chartist.min.css" rel="stylesheet" type="text/css" />\n' +
            "    <link href='http://fonts.googleapis.com/css?family=Oxygen:300' rel='stylesheet' type='text/css'>\n" +
            '  </head>\n' +
            '\n' +
            '  <body>\n' +
            '\n' +
            '  <div class="w3-container w3-bar w3-light-grey">\n' +
            '      \n' +
            '    <div class="w3-hide-medium w3-hide-small">\n' +
            '      <a href="#" class="w3-bar-item w3-button"><i class="fas fa-book-open"></i></a>\n' +
            '\n' +
            '      <div class="w3-dropdown-hover" style="margin-left: auto; margin-right: auto;">\n' +
            '        <button class="w3-button">Książki &nbsp;&nbsp;<i class="fa fa-caret-down"></i></button>\n' +
            '        <div class="w3-dropdown-content w3-bar-block w3-card-4">\n' +
            '          <a href="#" class="w3-bar-item w3-button">Do wyporzyczenia</a>\n' +
            '          <a href="#" class="w3-bar-item w3-button">Do kupienia</a>\n' +
            '        </div>\n' +
            '      </div>\n' +
            '\n' +
            '      <div style="float: right; width: 25%;" >\n' +
            '        <input type="text" style="width: 68%; float: left;" class="w3-bar-item w3-round-large w3-border w3-border-black w3-input" placeholder="Szukaj"></i>\n' +
            '        <a href="#" style="width: 30%; float: right" class="w3-bar-item w3-button w3-round-large w3-border w3-border-black w3-white">Szukaj</a> \n' +
            '      </div>\n' +
            '\n' +
            '    </div>\n' +
            '\n' +
            '    <div class="w3-hide-large">\n' +
            '\n' +
            '      <a href="#" class="w3-bar"><i class="w3-large fas fa-book-open"  style="padding-left: 48%; padding-top: 10px;"></i></a>\n' +
            '      \n' +
            '      <div class="w3-dropdown-hover w3-block">\n' +
            '        <button class="w3-button w3-block">Książki &nbsp;&nbsp;<i class="fa fa-caret-down"></i></button>\n' +
            '        <div class="w3-dropdown-content w3-bar-block" style="width: 95%;">\n' +
            '          <a href="#" class="w3-bar-item w3-block w3-button">Do wyporzyczenia</a>\n' +
            '          <a href="#" class="w3-bar-item  w3-block w3-button ">Do kupienia</a>\n' +
            '        </div>\n' +
            '      </div>\n' +
            '\n' +
            '      <div style="float: right; width: 25%;" >\n' +
            '        <input type="text" style="width: 68%; float: left;" class="w3-bar-item w3-round-large w3-border w3-border-black w3-input" placeholder="Szukaj"></i>\n' +
            '        <a href="#" style="width: 30%; float: right" class="w3-bar-item w3-button w3-round-large w3-border w3-border-black w3-white">Szukaj</a> \n' +
            '      </div>\n' +
            '\n' +
            '      <div class=" w3-dropdown-hover w3-block">\n' +
            '        <button class="w3-button w3-block"><i class="fa fa-search"></i></button>\n' +
            '        <div class="w3-dropdown-content w3-bar-block" style="width: 95%;">\n' +
            '          <input href="#"  class="w3-bar-item w3-border w3-border-black w3-input" placeholder="Szukaj"></i>\n' +
            '          <a href="#"  class="w3-bar-item w3-button  w3-border w3-border-black w3-white">Szukaj</a> \n' +
            '        </div>\n' +
            '      </div>\n' +
            '      \n' +
            '    </div>\n' +
            '\n' +
            '</div>\n' +
            '\n' +
            '<div style="padding-left: 30%; padding-top: 15px;">\n' +
            '<div class="w3-center w3-panel w3-card-4 w3-border w3-border-red" style="width: 45%;">\n' +
            '    <b>Komendy: <br /></b>\n' +
            "    D DODAJ (tytuł książki (spacje === '_')) (ilosc) (URL zdjęcia okładki) (Autorzy) <br />\n" +
            '    W WYPORZYCZ (tytuł książki) (Imie Nazwisko czytelnika) <br />\n' +
            '    Z ZWRÓĆ (tytuł książki) (Imie Nazwisko czytelnika) <br /> \n' +
            '</div>\n' +
            '</div>\n' +
            '\n' +
            '<form method="post" action="/submit">\n' +
            '    <div style="padding-left: 25%; padding-top: 16px;">\n' +
            '    <textarea name="name" rows="2" cols="80"></textarea>\n' +
            '    <div style="padding-left: 24%;">\n' +
            '    <button id="button" type="submit" class="w3-button w3-red w3-round-xlarge w3-border w3-border-black">Start!</button>\n' +
            '</div>\n' +
            '</div>\n' +
            '  </from>\n' +
            '\n' +
            '<h2 class="w3-xxlarge" style="padding-top: 140px ;padding-left: 40px; width: 85%; margin-left: auto; margin-right: auto;">\n' +
            '  <b id="twoje">Witaj w Bibliotece Głównej AGH</b>\n' +
            '</h2>\n' +
            '\n' +
            `<div class="w3-row w3-container" id='acc' style="width: 75%; margin-left: auto; margin-right: auto;">\n` +
            '</div>  \n' +
            '\n' +
            '  <div>\n' +
            '    <h1 class="w3-xxlarge" style="padding-left: 40px; width: 85%; margin-left: auto; margin-right: auto;">\n' +
            '      <b>Zawartość księgozbioru</b>\n' +
            '    </h1>\n' +
            '  </div>\n' +
            '\n' +
            `  <div class="w3-row w3-container" id='accordion' style="width: 75%; margin-left: auto; margin-right: auto;">    <div class="w3-col m6 l4  w3-margin-bottom">\n` +
            '\t\t<div class="card w3-container" style="height: 120%;">\n' +
            `\t\t\t<div id='ksiegozbior-0' class="w3-card-4 poj" style ="">\n` +
            '\t\n' +
            '\t\t<header class="w3-container w3-light-grey w3-border w3-border-black">\n' +
            '\t\t\t<h3 class="w3-text-dark-grey ">Pan_Tadeusz</h3>\n' +
            '\t\t</header>\n' +
            '\t\n' +
            '\t\t<div class="w3-container w3-border w3-border-black">\n' +
            '\t\t\t<b class="w3-text-xx-large">Adam_Mickiewicz</b>\n' +
            '\t\t</div>\n' +
            '\t\t\n' +
            '\t\t<div class="w3-border w3-border-black">\n' +
            '\t\t\t<img src="okladki/Pan_Tadeusz.jpeg" style="width:100%;  object-fit: cover;">\n' +
            '\t\t</div>\n' +
            '\t\t\n' +
            '\t\t<button class="w3-pannel w3-border w3-border-black w3-block w3-light-grey w3-left-align w3-text-small"><b>Ilość:</b> 1</button>\n' +
            '\t\t\n' +
            '\t\t</div> \n' +
            '\t\t</div>\n' +
            '\t\t</div>    <div class="w3-col m6 l4  w3-margin-bottom">\n' +
            '\t\t<div class="card w3-container" style="height: 120%;">\n' +
            `\t\t\t<div id='ksiegozbior-1' class="w3-card-4 poj" style ="">\n` +
            '\t\n' +
            '\t\t<header class="w3-container w3-light-grey w3-border w3-border-black">\n' +
            '\t\t\t<h3 class="w3-text-dark-grey ">Solaris</h3>\n' +
            '\t\t</header>\n' +
            '\t\n' +
            '\t\t<div class="w3-container w3-border w3-border-black">\n' +
            '\t\t\t<b class="w3-text-xx-large">Stanislaw_Lem</b>\n' +
            '\t\t</div>\n' +
            '\t\t\n' +
            '\t\t<div class="w3-border w3-border-black">\n' +
            '\t\t\t<img src="okladki/Solaris.jpeg" style="width:100%;  object-fit: cover;">\n' +
            '\t\t</div>\n' +
            '\t\t\n' +
            '\t\t<button class="w3-pannel w3-border w3-border-black w3-block w3-light-grey w3-left-align w3-text-small"><b>Ilość:</b> 1</button>\n' +
            '\t\t\n' +
            '\t\t</div> \n' +
            '\t\t</div>\n' +
            '\t\t</div>    <div class="w3-col m6 l4  w3-margin-bottom">\n' +
            '\t\t<div class="card w3-container" style="height: 120%;">\n' +
            `\t\t\t<div id='ksiegozbior-2' class="w3-card-4 poj" style ="">\n` +
            '\t\n' +
            '\t\t<header class="w3-container w3-light-grey w3-border w3-border-black">\n' +
            '\t\t\t<h3 class="w3-text-dark-grey ">Wesele</h3>\n' +
            '\t\t</header>\n' +
            '\t\n' +
            '\t\t<div class="w3-container w3-border w3-border-black">\n' +
            '\t\t\t<b class="w3-text-xx-large">Stanisław_Wyspiański</b>\n' +
            '\t\t</div>\n' +
            '\t\t\n' +
            '\t\t<div class="w3-border w3-border-black">\n' +
            '\t\t\t<img src="okladki/Wesele.jpeg" style="width:100%;  object-fit: cover;">\n' +
            '\t\t</div>\n' +
            '\t\t\n' +
            '\t\t<button class="w3-pannel w3-border w3-border-black w3-block w3-light-grey w3-left-align w3-text-small"><b>Ilość:</b> 0</button>\n' +
            '\t\t\n' +
            '\t\t</div> \n' +
            '\t\t</div>\n' +
            '\t\t</div>    <div class="w3-col m6 l4  w3-margin-bottom">\n' +
            '\t\t<div class="card w3-container" style="height: 120%;">\n' +
            `\t\t\t<div id='ksiegozbior-3' class="w3-card-4 poj" style ="">\n` +
            '\t\n' +
            '\t\t<header class="w3-container w3-light-grey w3-border w3-border-black">\n' +
            '\t\t\t<h3 class="w3-text-dark-grey ">Lalka</h3>\n' +
            '\t\t</header>\n' +
            '\t\n' +
            '\t\t<div class="w3-container w3-border w3-border-black">\n' +
            '\t\t\t<b class="w3-text-xx-large">Bolesław_Prus</b>\n' +
            '\t\t</div>\n' +
            '\t\t\n' +
            '\t\t<div class="w3-border w3-border-black">\n' +
            '\t\t\t<img src="okladki/Lalka.jpeg" style="width:100%;  object-fit: cover;">\n' +
            '\t\t</div>\n' +
            '\t\t\n' +
            '\t\t<button class="w3-pannel w3-border w3-border-black w3-block w3-light-grey w3-left-align w3-text-small"><b>Ilość:</b> 6</button>\n' +
            '\t\t\n' +
            '\t\t</div> \n' +
            '\t\t</div>\n' +
            '\t\t</div>    <div class="w3-col m6 l4  w3-margin-bottom">\n' +
            '\t\t<div class="card w3-container" style="height: 120%;">\n' +
            `\t\t\t<div id='ksiegozbior-4' class="w3-card-4 poj" style ="">\n` +
            '\t\n' +
            '\t\t<header class="w3-container w3-light-grey w3-border w3-border-black">\n' +
            '\t\t\t<h3 class="w3-text-dark-grey ">Pan</h3>\n' +
            '\t\t</header>\n' +
            '\t\n' +
            '\t\t<div class="w3-container w3-border w3-border-black">\n' +
            '\t\t\t<b class="w3-text-xx-large">Adam</b>\n' +
            '\t\t</div>\n' +
            '\t\t\n' +
            '\t\t<div class="w3-border w3-border-black">\n' +
            '\t\t\t<img src="okladki/Pan_Tadeusz.jpeg" style="width:100%;  object-fit: cover;">\n' +
            '\t\t</div>\n' +
            '\t\t\n' +
            '\t\t<button class="w3-pannel w3-border w3-border-black w3-block w3-light-grey w3-left-align w3-text-small"><b>Ilość:</b> 10</button>\n' +
            '\t\t\n' +
            '\t\t</div> \n' +
            '\t\t</div>\n' +
            '\t\t</div></div>  \n' +
            '    <div class="w3-bar w3-center" style="width: 60%; margin-right: auto; margin-left: auto;">\n' +
            '      <div class="w3-bar-item w3-mobile" style="width:24%; margin-left: auto; margin-right: auto;">Biblioteka Główna Akademii Górniczo-Hutniczej</div>\n' +
            '      <div class="w3-bar-item w3-mobile" style="width: 38%; margin-left: auto; margin-right: auto;"><i class="material-icons">&#xe0be;</i><a class="w3-text-blue" href="mail: bgagh@bg.agh.edu.pl">bgagh@bg.agh.edu.pl</a></div>\n' +
            '      <div class="w3-bar-item w3-mobile" style="width: 38%; margin-left: auto; margin-right: auto;"> <i class="fa fa-phone"></i><a class="w3-text-blue" href="tel: +48126173208">+48 12 617 32 08</a></div>\n' +
            '    </div> \n' +
            '  </body>\n' +
            '</html>', done);
      });
});