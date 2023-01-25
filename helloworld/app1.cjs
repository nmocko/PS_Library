const { table } = require('console');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;

var a = function () {
// No use of any template system
var express = require('express'),
  logger = require('morgan');
var app = express();
var x = 1;
var y = 2;

// Determining the contents of the middleware stack
app.use(logger('dev'));                            // Place an HTTP request recorder on the stack — each request will be logged in the console in 'dev' format
// app.use(express.static(__dirname + '/public')); // Place the built-in middleware 'express.static' — static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory

// *** Route definitions ***

// The first route
app.get('/', function (req, res) {
  var xx = x;
  var yy = y;
  var z = x + y;
  res.send(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
        crossorigin="anonymous">
    <title>Your first page</title>
  </head>
  <body>
    <main class="container">
      <h1>Hello World</h1>
      <h2 id='a'><h2>
    </main>
    <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
        crossorigin="anonymous">

    </script>
  </body>
  <script>

  var e = document.getElementById('a');
  e.innerHTML = ` + xx + ` + '+' + ` + yy + ` + '=' + ` + z + `;
</script>
</html>
`); // Send a response to the browser
});

// The application is to listen on port number 3000

app.get('/json/:name', function (req, res) {

  var table = '';
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
      wynik = json[i].x + json[i].y;
    }
    else if (json[i].operation == '-') {
      wynik = json[i].x - json[i].y;
    }
    else if (json[i].operation == '*') {
      wynik = json[i].x * json[i].y;
    }
    else if (json[i].operation == '/') {
      wynik = json[i].x / json[i].y;
    }

    table += "<tr><td>" + json[i].x + "</td><td>" + json[i].operation +  "</td><td>" + json[i].y + "</td><td>" +  wynik + "</td></tr>";
  }
  console.log(table);

  

  res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
        crossorigin="anonymous">
    <title>Your first page</title>
  </head>
  <body>

  <table style="width:100%" border=1 >
  <thead>
    <tr>
      <th>x</th>
      <th>Operation</th>
      <th>y</th>
      <th>Result</th>
    </tr>
  </thead>
  <tbody id="data-output">
    
  </tbody>
</table>

<script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
        crossorigin="anonymous">

    </script>
  </body>

  <script>
  var tabela = document.getElementById("data-output");
  tabela.innerHTML = "` + table +` ";

  </script>
  </html>
`); // Send a response to the browser

});

app.listen(3000, function () {
  console.log('The application is available on port 3000');
});

app.get('/calculate/:operation/:x/:y', function (req, res) {

  console.log(req.params.operation)
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
  console.log(operation)


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

  
  res.send(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
        crossorigin="anonymous">
    <title>Your first page</title>
  </head>
  <body>
    <main class="container">
      <h1>Hello World</h1>
      <h2 id='a'><h2>
    </main>
    <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
        crossorigin="anonymous">

    </script>
  </body>
  <script>

  var e = document.getElementById('a');
  e.innerHTML = "` + operation + `";
</script>
</html>
`); // Send a response to the browser
});


app.get('/result', function (req, res) {

  var url = "mongodb+srv://reny:k0gw5kYBXrEiA2bi@cluster0.wzmkclt.mongodb.net/?retryWrites=true&w=majority";

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("lab11");
    dbo.collection("operations").find({}).toArray(function(err, result) {
      if (err) throw err;
      var table = '';
      var wynik;
      for (let i in result) {
        if (result[i].operation == 'add') {
          wynik = parseInt(result[i].x) + parseInt(result[i].y);
        }
        else if (result[i].operation == 'substract') {
          wynik = parseInt(result[i].x) - parseInt(result[i].y);
        }
        else if (result[i].operation == 'multiply') {
          wynik = parseInt(result[i].x) * parseInt(result[i].y);
        }
        else if (result[i].operation == 'divide') {
          wynik = parseInt(result[i].x) / parseInt(result[i].y);
        }
        

        table += "<tr><td>" + result[i].x + "</td><td>" + result[i].operation +  "</td><td>" + result[i].y + "</td><td>" +  wynik + "</td></tr>";
           
      }

      res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
        crossorigin="anonymous">
    <title>Your first page</title>
  </head>
  <body>

  <table style="width:100%" border=1 >
  <thead>
    <tr>
      <th>x</th>
      <th>Operation</th>
      <th>y</th>
      <th>Result</th>
    </tr>
  </thead>
  <tbody id="data-output">
    
  </tbody>
</table>

<script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
        crossorigin="anonymous">

    </script>
  </body>

  <script>
  var tabela = document.getElementById("data-output");
  tabela.innerHTML = "` + table +` ";

  </script>
  </html>
`);

      db.close();
    });
  });


});

}

a();
module.exports.a = a;
