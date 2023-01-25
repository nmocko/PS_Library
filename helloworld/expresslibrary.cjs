const express = require('express');
const helmet = require('helmet');
var fs = require('fs');
const app = express();
const MongoClient = require('mongodb').MongoClient;
app.use(helmet({crossOriginEmbedderPolicy: false}));
var router = express.Router();

app.use(helmet.contentSecurityPolicy({
    directives: {
      styleSrc: ["https://www.w3schools.com/w3css/4/w3.css", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css", "'self'", "'unsafe-inline'",
    "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css"],
    },
  }));

// app.use(bodyParser.urlencoded({ extended: true })); 

function nowaksiazka(tab, response) {

    var url = "mongodb+srv://reny:k0gw5kYBXrEiA2bi@cluster0.wzmkclt.mongodb.net/?retryWrites=true&w=majority";
  
  MongoClient.connect(url, function(err, db) {

	var json = {"tytul": tab[1], "autorzy": tab[4], "ilosc": tab[2], "zdjecie": "okladki/" + tab[3]};
    var dbo = db.db("library");
    dbo.collection("books").insertOne(json, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        dbo.collection("books").find({}).toArray(function(err, result) {
            if (err) throw err;
  
            html(response, result)
            db.close();
          });
      });
  });
}

function wyporzycz (tab, res) {

    var url = "mongodb+srv://reny:k0gw5kYBXrEiA2bi@cluster0.wzmkclt.mongodb.net/?retryWrites=true&w=majority";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("library");
        dbo.collection("books").find({}).toArray(function(err, dane) {
          if (err) throw err;
        

	var istnieje = 0;


	let j = 0;

	for (let i in dane) {
		if (dane[i].tytul == tab[1]) {
			istnieje = 1;
			if (dane[i].ilosc == 0) {
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

    dbo.collection("users").find({}).toArray(function(err,czyt){
        for (let i in czyt) {
            if (czyt[i].imie == tab[2] && czyt[i].nazwisko == tab[3]) {
                console.log('Wyporzyczono') 
                var qq = czyt[i]._id
                console.log(tab[1], qq)
                dbo.collection("users").updateOne({_id: qq},{ $push: {"ksiazki": tab[1]}})


                let a = parseInt(dane[j].ilosc);
                a = a - 1;
                console.log(a);
                var q = dane[j]._id;
    
    
                dbo.collection("books").updateOne({_id: q},{ $set: {"ilosc": a}}, function (){
                    dbo.collection("books").find({}).toArray(function(err, daneee) {
                        html(res, daneee)
                        db.close();
                     })
    
        
                })
            }
        }

    })


        });
      });
}

function zwrot (tab, res) {

    var url = "mongodb+srv://reny:k0gw5kYBXrEiA2bi@cluster0.wzmkclt.mongodb.net/?retryWrites=true&w=majority";

    MongoClient.connect(url, function(err, db) {

    if (err) throw err;
    var dbo = db.db("library");

        
    dbo.collection("users").find({}).toArray(function(err,czyt){
        for (let i in czyt) {
            if (czyt[i].imie == tab[2] && czyt[i].nazwisko == tab[3]) {
                for (let j in czyt[i].ksiazki) {
                    console.log(czyt[i].ksiazki)
                    if (czyt[i].ksiazki[j] == tab[1]) {
                        console.log(czyt[i].ksiazki[j])
                        var qq = czyt[i]._id
                        dbo.collection("users").updateOne({_id: qq},{ $pull: {"ksiazki": tab[1]}})

                        dbo.collection("books").find({}).toArray(function(err, dane) {

                            for (let z in dane) {
                                if (dane[z].tytul == tab[1]){
                                    var q = dane[z]._id;
                                    let a = parseInt(dane[z].ilosc);
                                    a = a + 1;

                                    dbo.collection("books").updateOne({_id: q},{ $set: {"ilosc": a}}, function () {
                                        dbo.collection("books").find({}).toArray(function(err, daneee) {
                                            html(res, daneee)
                                            db.close();
                                            return;
                                         })
                        
                            
                                    })

                                }
                            }
                        });




                    }
                }
    
            }
        }

    })

    });


}

function html(response, dane) {

    var text = '';
	text += `<!DOCTYPE html>
<html lang="pl">
  <!-- Zmień wartość "lang" z 'en' na 'pl' -->

  <head>
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
    Admin: <br \>
    D DODAJ (tytuł książki (spacje === '_')) (ilosc) (URL zdjęcia okładki) (Autorzy) <br />
    User: <br \>
    W WYPORZYCZ (tytuł książki) (Imie Nazwisko czytelnika) <br />
    Z ZWRÓĆ (tytuł książki) (Imie Nazwisko czytelnika) <br /> 
</div>
</div>

<form id='1' method="GET" action='/user'>
    <div style="padding-left: 25%; padding-top: 16px;">
    <textarea name="name1" rows="2" cols="80"></textarea>
    <div style="padding-left: 24%;">
    <button type="submit" class="w3-button w3-red w3-round-xlarge w3-border w3-border-black">Usert!</button>
</div>
</div>
  </form>

  <form id='2' method="GET" action='/admin'>
    <div style="padding-left: 25%; padding-top: 16px;">
    <textarea name="name2" rows="2" cols="80"></textarea>
    <div style="padding-left: 24%;">
    <button type="submit" class="w3-button w3-red w3-round-xlarge w3-border w3-border-black">Admin!</button>
</div>
</div>
</form>

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

  <div class="w3-row w3-container" id='accordion' style="width: 75%; margin-left: auto; margin-right: auto;">`;


	for (let i in dane) {
		text += `    <div class="w3-col m6 l4  w3-margin-bottom">
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
		
		<button class="w3-pannel w3-border w3-border-black w3-block w3-light-grey w3-left-align w3-text-small"><b>Ilość:</b> ${dane[i].ilosc}</button>
		
		</div> 
		</div>
		</div>`;
	}

	text += `</div>  

    <div class="w3-bar w3-center" style="width: 60%; margin-right: auto; margin-left: auto;">
      <div class="w3-bar-item w3-mobile" style="width:24%; margin-left: auto; margin-right: auto;">Biblioteka Główna Akademii Górniczo-Hutniczej</div>
      <div class="w3-bar-item w3-mobile" style="width: 38%; margin-left: auto; margin-right: auto;"><i class="material-icons">&#xe0be;</i><a class="w3-text-blue" href="mail: bgagh@bg.agh.edu.pl">bgagh@bg.agh.edu.pl</a></div>
      <div class="w3-bar-item w3-mobile" style="width: 38%; margin-left: auto; margin-right: auto;"> <i class="fa fa-phone"></i><a class="w3-text-blue" href="tel: +48126173208">+48 12 617 32 08</a></div>
    </div> 

  </body>

</html>`;


response.send(text);
	
}

router.get('/', function (req, res) {
    var url = "mongodb+srv://reny:k0gw5kYBXrEiA2bi@cluster0.wzmkclt.mongodb.net/?retryWrites=true&w=majority";
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("library");
        dbo.collection("books").find({}).toArray(function(err, result) {
          if (err) throw err;
          html(res, result)
          db.close();
        });
      });

})

router.get('/user', function (req, res) {
    var url = "mongodb+srv://reny:k0gw5kYBXrEiA2bi@cluster0.wzmkclt.mongodb.net/?retryWrites=true&w=majority";
    console.log('user')
    var id = req.query.name1;
    console.log(id)
    const myArray = id.split(" ");

    if (myArray[0] === "W" || myArray[0] === "WYPORZYCZ")
    {
        wyporzycz(myArray, res);
        console.log('wyyy')
    }
    else if (myArray[0] === "Z" || myArray[0] === "ZWRÓĆ")
    {
        zwrot(myArray, res);
        console.log('zwww')
    }
    else {
        console.log("Błędna komenda\n ");
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("library");
            dbo.collection("books").find({}).toArray(function(err, result) {
              if (err) throw err;
    
              html(res, result)
              db.close();
            });
          });
    }
});

router.get('/admin', function (req, res) {
    var url = "mongodb+srv://reny:k0gw5kYBXrEiA2bi@cluster0.wzmkclt.mongodb.net/?retryWrites=true&w=majority";
    console.log('admin')
    var id = req.query.name2;
    console.log(id);
    const myArray = id.split(" ");

    if (myArray[0] === "D" || myArray[0] === "DODAJ")
    {
        nowaksiazka(myArray, res);
    }
    else if (myArray[0] === "W" || myArray[0] === "WYPORZYCZ")
    {
        wyporzycz(myArray, res);
        console.log('wyyy')
    }
    else if (myArray[0] === "Z" || myArray[0] === "ZWRÓĆ")
    {
        zwrot(myArray, res);
        console.log('zwww')
    }
    else {
        console.log("Błędna komenda\n ");
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("library");
            dbo.collection("books").find({}).toArray(function(err, result) {
              if (err) throw err;

              html(res, result)
              db.close();
            });
          });
    }
});


router.get('/okladki/*', function(req, res){  
    var n = req.originalUrl;
	var hrefParts = n.split('/');
    res.sendFile('/home/reny/AGH/programowanie_skryptowe_js/helloworld/okladki/' + hrefParts[2]);
})

app.listen(3050, function () {
    console.log('The application is available on port 3050');
  });

app.use('/', router);


