const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;

var b = function () {
// Application using the 'Pug' template system
var express = require('express'),
    logger = require('morgan');
var app = express();
var x = 1;
var y = 2;
var z = x + y;

// Configuring the application
app.set('views', __dirname + '/views');               // Files with views can be found in the 'views' directory
app.set('view engine', 'pug');                        // Use the 'Pug' template system
app.locals.pretty = app.get('env') === 'development'; // The resulting HTML code will be indented in the development environment

// Determining the contents of the middleware stack
app.use(logger('dev'));                            // Add an HTTP request recorder to the stack — every request will be logged in the console in the 'dev' format
// app.use(express.static(__dirname + '/public')); // Place the built-in middleware 'express.static' — static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory

// *** Route definitions ***

// The first route
app.get('/', function (req, res) {
    var line = '';
    line = x + '+' + y + '=' + z;
    res.render('index', {line: line}); // Render the 'index' view
});

app.get('/json/:name', function (req, res) {
    // var mydata = JSON.parse("dane1.json");
    // console.log(mydata);
    var dane = fs.readFileSync(req.params.name, "utf8");
    let json = JSON.parse(dane);
    console.log(json[1].x);
    console.log(json[3].y);
    console.log(json[4].operation);
    let wynik;
  
    for (let i in json) {
      console.log(json[i].operation);
      if (json[i].operation == '+') {
        json[i].res = json[i].x + json[i].y;
      }
      else if (json[i].operation == '-') {
        json[i].res = json[i].x - json[i].y;
      }
      else if (json[i].operation == '*') {
        json[i].res = json[i].x * json[i].y;
      }
      else if (json[i].operation == '/') {
        json[i].res = json[i].x / json[i].y;
      }
    }
    res.render('index', {json: json}); // Render the 'index' view
});


app.get('/calculate/:operation/:x/:y', function (req, res) {

  let wynik
  var operation = '';
  operation += req.params.x + ' ';
  if (req.params.operation == 'add') {
    wynik = parseInt(req.params.x) + parseInt(req.params.y);
    operation += '+ ';
  }
  else if (req.params.operation == 'substract') {
    wynik = parseInt(req.params.x) - parseInt(req.params.y);
    operation += '- ';
  }
  else if (req.params.operation == 'multiply') {
    wynik = parseInt(req.params.x) * parseInt(req.params.y);
    operation += '* ';
  }
  else if (req.params.operation == 'divide') {
    wynik = parseInt(req.params.x) / parseInt(req.params.y);
    operation += '/ ';
  }
  operation += req.params.y + ' = ';
  operation += wynik + ' ';

  var url = "mongodb+srv://reny:k0gw5kYBXrEiA2bi@cluster0.wzmkclt.mongodb.net/?retryWrites=true&w=majority";
  
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("lab11");
    var myobj = { x: req.params.x, y: req.params.y, operation: req.params.operation };
    dbo.collection("operations").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });

  res.render('index', {line: operation}); // Render the 'index' view
});

app.get('/result', function (req, res) {
  var url = "mongodb+srv://reny:k0gw5kYBXrEiA2bi@cluster0.wzmkclt.mongodb.net/?retryWrites=true&w=majority";

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("lab11");
    dbo.collection("operations").find({}).toArray(function(err, result) {
      if (err) throw err;
      var wynik;
      for (let i in result) {
        if (result[i].operation == 'add') {
          result[i].res = parseInt(result[i].x) + parseInt(result[i].y);
        }
        else if (result[i].operation == 'substract') {
          result[i].res = parseInt(result[i].x) - parseInt(result[i].y);
        }
        else if (result[i].operation == 'multiply') {
          result[i].res = parseInt(result[i].x) * parseInt(result[i].y);
        }
        else if (result[i].operation == 'divide') {
          result[i].res = parseInt(result[i].x) / parseInt(result[i].y);
        } 
      }
      res.render('index', {json: result});

      db.close();
    });
  });
});

// The application is to listen on port number 3000
app.listen(3000, function () {
    console.log('The application is available on port 3000');
});

}

b();
module.exports.b = b;