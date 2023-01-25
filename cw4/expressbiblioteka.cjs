const express = require('express');
const helmet = require('helmet');
const app = express();
const MongoClient = require('mongodb').MongoClient;
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', function (req, res) {
    var url = "mongodb+srv://reny:k0gw5kYBXrEiA2bi@cluster0.wzmkclt.mongodb.net/?retryWrites=true&w=majority";


})

app.get('/subimt', function (req, res) {
    var url = "mongodb+srv://reny:k0gw5kYBXrEiA2bi@cluster0.wzmkclt.mongodb.net/?retryWrites=true&w=majority";

    var id = req.query.name;
    console.log(id);
})

app.listen(3030, function () {
    console.log('The application is available on port 3000');
  });


