//Source:  https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/
var supertest = require("supertest");
var chai = require('chai')
, expect = chai.expect
chai.use(require('chai-json'));
var MongoClient = require('mongodb').MongoClient;


// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:3000");

// UNIT test begin
describe('GET /', function() {

      it('test route /', function(done) {
         server
         .get('/')
         .expect('Content-Type', /html/)
         .expect(200, '<!DOCTYPE html>\n' +
         '<html lang="en">\n' +
         '  <head>\n' +
         '    <meta charset="utf-8">\n' +
         '    <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
         '    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">\n' +
         '    <title>Your first page</title>\n' +
         '  </head>\n' +
         '  <body>\n' +
         '    <main class="container">\n' +
         '      <h1>Hello World</h1>\n' +
         '      <h2>1+2=3</h2>\n' +
         '    </main>\n' +
         '    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>\n' +
         '  </body>\n' +
         '</html>', done);
      });



      it('test route /json/:name', function(done) {
        server
        .get('/json/dane2.json')
        .expect('Content-Type', /html/)
        .expect(200, '<!DOCTYPE html>\n' +
        '<html lang="en">\n' +
        '  <head>\n' +
        '    <meta charset="utf-8">\n' +
        '    <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
        '    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">\n' +
        '    <title>Your first page</title>\n' +
        '  </head>\n' +
        '  <body>\n' +
        '    <main class="container">\n' +
        '      <h1>Hello World</h1>\n' +
        '      <h2></h2>\n' +
        '    </main>\n' +
        '    <table style="width:100%" border="1">\n' +
        '      <thead>\n' +
        '        <tr> \n' +
        '          <th>x </th>\n' +
        '          <th>Operation </th>\n' +
        '          <th>y </th>\n' +
        '          <th>Result </th>\n' +
        '        </tr>\n' +
        '        <tr> </tr>\n' +
        '      </thead>\n' +
        '      <tbody> </tbody>\n' +
        '      <tr> \n' +
        '        <td>1</td>\n' +
        '        <td>+</td>\n' +
        '        <td>1</td>\n' +
        '        <td>2</td>\n' +
        '      </tr>\n' +
        '      <tr> \n' +
        '        <td>8</td>\n' +
        '        <td>-</td>\n' +
        '        <td>-3</td>\n' +
        '        <td>11</td>\n' +
        '      </tr>\n' +
        '      <tr> \n' +
        '        <td>2</td>\n' +
        '        <td>/</td>\n' +
        '        <td>2</td>\n' +
        '        <td>1</td>\n' +
        '      </tr>\n' +
        '      <tr> \n' +
        '        <td>4</td>\n' +
        '        <td>+</td>\n' +
        '        <td>200</td>\n' +
        '        <td>204</td>\n' +
        '      </tr>\n' +
        '      <tr> \n' +
        '        <td>7</td>\n' +
        '        <td>*</td>\n' +
        '        <td>2</td>\n' +
        '        <td>14</td>\n' +
        '      </tr>\n' +
        '      <tr> \n' +
        '        <td>-1</td>\n' +
        '        <td>-</td>\n' +
        '        <td>-12</td>\n' +
        '        <td>11</td>\n' +
        '      </tr>\n' +
        '    </table>\n' +
        '    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>\n' +
        '  </body>\n' +
        '</html>', done);
     });

     it('chai-json', function (done) {
        expect("dane2.json").to.be.a.jsonFile()
        expect("dane2.json").to.be.a.jsonFile().and.contain.jsonWithProps({"x": 1, "y": 1, "operation": "+"})
        expect("dane2.json").to.be.a.jsonFile().and.contain.jsonWithProps({"x": 8, "y": -3, "operation": "-"})
        expect("dane2.json").to.be.a.jsonFile().and.contain.jsonWithProps({"x": 7, "y": 2, "operation": "*"})
        done()
    });

  it('tet route /result', function (done) {
    server
    .get('/result')
    .expect('Content-Type', /html/)
    .expect(200, '<!DOCTYPE html>\n' +
    '<html lang="en">\n' +
    '  <head>\n' +
    '    <meta charset="utf-8">\n' +
    '    <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    '    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">\n' +
    '    <title>Your first page</title>\n' +
    '  </head>\n' +
    '  <body>\n' +
    '    <main class="container">\n' +
    '      <h1>Hello World</h1>\n' +
    '      <h2></h2>\n' +
    '    </main>\n' +
    '    <table style="width:100%" border="1">\n' +
    '      <thead>\n' +
    '        <tr> \n' +
    '          <th>x </th>\n' +
    '          <th>Operation </th>\n' +
    '          <th>y </th>\n' +
    '          <th>Result </th>\n' +
    '        </tr>\n' +
    '        <tr> </tr>\n' +
    '      </thead>\n' +
    '      <tbody> </tbody>\n' +
    '      <tr> \n' +
    '        <td>2</td>\n' +
    '        <td>divide</td>\n' +
    '        <td>2</td>\n' +
    '        <td>1</td>\n' +
    '      </tr>\n' +
    '      <tr> \n' +
    '        <td>3</td>\n' +
    '        <td>add</td>\n' +
    '        <td>4</td>\n' +
    '        <td>7</td>\n' +
    '      </tr>\n' +
    '      <tr> \n' +
    '        <td>4</td>\n' +
    '        <td>multiply</td>\n' +
    '        <td>5</td>\n' +
    '        <td>20</td>\n' +
    '      </tr>\n' +
    '      <tr> \n' +
    '        <td>10</td>\n' +
    '        <td>substract</td>\n' +
    '        <td>2</td>\n' +
    '        <td>8</td>\n' +
    '      </tr>\n' +
    '    </table>\n' +
    '    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>\n' +
    '  </body>\n' +
    '</html>', done)

  })

  it('test route /calculate/:operation/:x/:y', function (done) {
    server
    .get('/calculate/divide/16/4')
    .expect('Content-Type', /html/)
    .expect(200, '<!DOCTYPE html>\n' +
    '<html lang="en">\n' +
    '  <head>\n' +
    '    <meta charset="utf-8">\n' +
    '    <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    '    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">\n' +
    '    <title>Your first page</title>\n' +
    '  </head>\n' +
    '  <body>\n' +
    '    <main class="container">\n' +
    '      <h1>Hello World</h1>\n' +
    '      <h2>16 / 4 = 4 </h2>\n' +
    '    </main>\n' +
    '    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>\n' +
    '  </body>\n' +
    '</html>', done)

    var url = "mongodb+srv://reny:k0gw5kYBXrEiA2bi@cluster0.wzmkclt.mongodb.net/?retryWrites=true&w=majority"

      MongoClient.connect(url, function(err, db) {
         if (err) throw err;
         var dbo = db.db("lab11");
         var myquery = { x: "16", y: "4", operation: "divide"};
         dbo.collection("operations").deleteOne(myquery, function(err, obj) {
           if (err) throw err;
           db.close();
         });
       })

  })

});
