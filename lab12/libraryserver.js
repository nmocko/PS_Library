const express = require('express');
const logger = require('morgan');
const app = express();
const qs = require('querystring');
var fs = require('fs');
const MongoClient = require('mongodb').MongoClient;

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.locals.pretty = app.get('env') === 'development';
var logged = -1;

app.use(logger('dev'));

var czytelnicy = []
var biblioteka = []

app.get('/', function (req, res) {

    var url = "mongodb+srv://reny:k0gw5kYBXrEiA2bi@cluster0.wzmkclt.mongodb.net/?retryWrites=true&w=majority";

    MongoClient.connect(url, function(err, db) {

    if (err) throw err;
    var dbo = db.db("library");

    dbo.collection("books").find({}).toArray(function(err, book){

            var dan = JSON.stringify(book); 
            res.render('library.pug', {biblioteka: dan});

            for (let i in book) {
                biblioteka[i] = []
                biblioteka[i][0] = book[i].tytul
                biblioteka[i][1] = book[i].ilosc
                biblioteka[i][2] = book[i].zdjecie
                biblioteka[i][3] = book[i].autorzy
            }

    });

});
});

app.put('/', function (req, res) {
    console.log("logowanie")

    const name = req.query.login;
    const pew = req.query.haslo;
    console.log(name, pew)
    czytelnicy = []

    var url = "mongodb+srv://reny:k0gw5kYBXrEiA2bi@cluster0.wzmkclt.mongodb.net/?retryWrites=true&w=majority";

    MongoClient.connect(url, function(err, db) {

    if (err) throw err;
    var dbo = db.db("library");

        dbo.collection("users").find({}).toArray(function(err, users){

            for (let i in users) {
                czytelnicy[i] = []
                czytelnicy[i][0] = users[i].imie
                czytelnicy[i][1] = users[i].nazwisko
                czytelnicy[i][2] = users[i].ksiazki.length
                czytelnicy[i][3] = users[i].ksiazki
                czytelnicy[i][4] = []
                czytelnicy[i][4][0] = users[i].login
                czytelnicy[i][4][1] = users[i].haslo

            }
            let f = 0
            for (let i in czytelnicy){
                if (name === czytelnicy[i][4][0] && pew === czytelnicy[i][4][1])
                {
                    f = 1
                    res.type('application/json');
                    res.json({"imie": czytelnicy[i][0], "nazwisko": czytelnicy[i][1], "ksiazki": czytelnicy[i][3], "nr": i});
                    logged = i;
        
                    break;
                }
        
            }
            if (f == 0) 
            {
                res.type('application/json')
                res.json({"imie": 0, "nazwisko": 0, "ksiazki": 0, "nr": -1})
            }


    })

});



})

app.post('/', function (req, res) {

    var body = '';   

    req.on('data', function (data) {
        body += data;
        var post = qs.parse(body);
        console.log(post.imie);

        // Send the text plain greeting
        var url = "mongodb+srv://reny:k0gw5kYBXrEiA2bi@cluster0.wzmkclt.mongodb.net/?retryWrites=true&w=majority";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("library");
        dbo.collection("books").find({}).toArray(function(err, dane) {
          if (err) throw err;
     

	    let j = post.index;


        var flag = 0
        if (logged === -1) {
            console.log('Musisz być zalogowany, aby móc wyporzyczać');
            res.type('application/json')
            res.json({"nr": -1})
            return
        }
        if (dane[post.index].ilosc === 0) {
            console.log("Wszytskie egzemplarze tej ksiazki zostały wyporzyczone");
            res.type('application/json')
            res.json({"nr": -2})
            return
        }
        for (let i in czytelnicy[logged][3]) {
            if (dane[j].tytul === czytelnicy[logged][3][i][0])
            {
                console.log("Już wyporzyczyłeś jeden egzemplarz tej książki");
                res.type('application/json')
                res.json({"nr": -3})
                return;
            }
        }



    dbo.collection("users").find({}).toArray(function(err,czyt){
        for (let i in czyt) {
            if (czyt[i].imie == post.imie && czyt[i].nazwisko ==post.nazwisko) {
                console.log('Wyporzyczono') 
                var qq = czyt[i]._id
                dbo.collection("users").updateOne({_id: qq},{ $push: {"ksiazki": [post.tytul, post.autorzy, post.link, post.index]}})

                let a = parseInt(dane[j].ilosc);
                a = a - 1;
                console.log(a);
                var q = dane[j]._id;
    
                dbo.collection("books").updateOne({_id: q},{ $set: {"ilosc": a}})

                res.type('application/json')
                res.json({"nr": 1})
                return;
            }
        }

    })


        });
      });

    })
    
})
// :imie&:naziwsko&:&tytul
app.delete('/', function(req, res) {
    console.log('Delete')
    console.log(req.query.imie)

    var url = "mongodb+srv://reny:k0gw5kYBXrEiA2bi@cluster0.wzmkclt.mongodb.net/?retryWrites=true&w=majority";

    MongoClient.connect(url, function(err, db) {

    if (err) throw err;
    var dbo = db.db("library");

        
    dbo.collection("users").find({}).toArray(function(err,czyt){
        for (let i in czyt) {

            if (czyt[i].imie == req.query.imie && czyt[i].nazwisko == req.query.nazwisko) {
                for (let j in czyt[i].ksiazki) {
                    if (czyt[i].ksiazki[j][0] == req.query.tytul) {
                        var qq = czyt[i]._id
                        dbo.collection("users").updateOne({_id: qq},{ $pull: {"ksiazki": [req.query.tytul, req.query.autorzy, 
                            req.query.link, req.query.index]}})

                        dbo.collection("books").find({}).toArray(function(err, dane) {

                            for (let z in dane) {
                                if (dane[z].tytul == req.query.tytul){
                                    var q = dane[z]._id;
                                    let a = parseInt(dane[z].ilosc);
                                    a = a + 1;

                                    dbo.collection("books").updateOne({_id: q},{ $set: {"ilosc": a}})
                                    res.type('application/json')
                                    res.json({"nr": 1})

                                }
                            }
                        });




                    }
                }
    
            }
        }

    })

    });

})

app.get('/catbooks.gif', function(req, res) {
    res.sendFile('/home/reny/AGH/programowanie_skryptowe_js/Lab_9/catbooks.gif');
})

app.listen(3000, function () {
    console.log('The application is available on port 3000');
});