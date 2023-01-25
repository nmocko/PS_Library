const express = require('express');
const logger = require('morgan');
const app = express();
const qs = require('querystring');

// Configuring the application
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.locals.pretty = app.get('env') === 'development';

// Determining the contents of the middleware stack
app.use(logger('dev'));
// app.use(express.static(__dirname + '/public'));

// *** Route definitions ***

// The first route
app.get('/', function (req, res) {
    res.render('index');
});

app.post('/submit', function (req, res) {

    var body = '';   

    req.on('data', function (data) {
        body += data;
        var post = qs.parse(body);
        console.log(post.imie);
        var linia = 'Witaj ' + post.imie;
        switch (req.accepts(['html', 'text', 'json', 'xml'])) {
            case 'json':
                // Send the JSON greeting
                res.type('application/json');
                res.json({ welcome: "Hello World" });
                console.log("The server sent a JSON document to the browser");
                break;
    
            case 'xml':
                // Send the XML greeting
                res.type('application/xml');
                res.send('<welcome>Hello World</welcome>');
                console.log("The server sent an XML document to the browser");
                break;
    
            default:
                // Send the text plain greeting
                res.type('text/plain');
                res.send(linia);
                console.log("The server sent a plain text to the browser");
        }

    })
    

})

// The second route
app.get('/submit', function (req, res) {
    // Return the greeting in the format preferred by the WWW client
    console.log(req.query.imie)
    var linia = 'Witaj ' + req.query.imie;
    console.log(linia);
    switch (req.accepts(['html', 'text', 'json', 'xml'])) {
        case 'json':
            // Send the JSON greeting
            res.type('application/json');
            res.json({ welcome: "Hello World" });
            console.log("The server sent a JSON document to the browser");
            break;

        case 'xml':
            // Send the XML greeting
            res.type('application/xml');
            res.send('<welcome>Hello World</welcome>');
            console.log("The server sent an XML document to the browser");
            break;

        default:
            // Send the text plain greeting
            res.type('text/plain');
            res.send(linia);
            console.log("The server sent a plain text to the browser");
    }
});

// The application is to listen on port number 3000
app.listen(3000, function () {
    console.log('The application is available on port 3000');
});