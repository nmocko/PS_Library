const express = require('express');
const logger = require('morgan');
const request = require('request');
const cors = require('cors');
/************* */
const app_3000 = express();
app_3000.set('views', __dirname + '/views');
app_3000.set('view engine', 'pug');

app_3000.use(logger('dev'));
app_3000.get('/', function (req, res) {

    res.render('index3000');
});
app_3000.listen(3000, function () {
    console.log('The application is available on port 3000');
});
/************* */
const app_3001 = express();
app_3001.use(cors({ orgin: 'http://localhost:3000'}))
app_3001.use(logger('dev'));
app_3001.get('/', function (req, res) {

    const now = new Date();
    let text = now.toDateString();
    let date = text;
    let time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();

    res.send(`
    <div>
    <span id='date'>${date}</span>
    <span id='time'>${time}</span>
 </div>`);
});
app_3001.listen(3001, function () {
    console.log('The application is available on port 3001');
});
/************* */
console.log("To stop the server, press 'CTRL + C'");
