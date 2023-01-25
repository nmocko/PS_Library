//Source:  https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/
var supertest = require("supertest");
var chai = require('chai')
, expect = chai.expect
, should = chai.should();
chai.use(require('chai-json'));
var MongoClient = require('mongodb').MongoClient;


// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:3000");

// UNIT test begin
describe('GET /', function() {
      it('respond with html', function(done) {
         server
         .get('/')
         .expect('Content-Type', /html/)
         .expect(200, '\n' +
         '<!DOCTYPE html>\n' +
         '<html lang="en">\n' +
         '  <head>\n' +
         '    <meta charset="utf-8">\n' +
         '    <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
         '    <link\n' +
         '        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"\n' +
         '        rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"\n' +
         '        crossorigin="anonymous">\n' +
         '    <title>Your first page</title>\n' +
         '  </head>\n' +
         '  <body>\n' +
         '    <main class="container">\n' +
         '      <h1>Hello World</h1>\n' +
         "      <h2 id='a'><h2>\n" +
         '    </main>\n' +
         '    <script\n' +
         '        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"\n' +
         '        integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"\n' +
         '        crossorigin="anonymous">\n' +
         '\n' +
         '    </script>\n' +
         '  </body>\n' +
         '  <script>\n' +
         '\n' +
         "  var e = document.getElementById('a');\n" +
         "  e.innerHTML = 1 + '+' + 2 + '=' + 3;\n" +
         '</script>\n' +
         '</html>\n', done);
      });



      it('respond with html', function(done) {
        server
        .get('/json/dane1.json')
        .expect('Content-Type', /html/)
        .expect(200, '<!DOCTYPE html>\n' +
        '<html lang="en">\n' +
        '  <head>\n' +
        '    <meta charset="utf-8">\n' +
        '    <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
        '    <link\n' +
        '        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"\n' +
        '        rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"\n' +
        '        crossorigin="anonymous">\n' +
        '    <title>Your first page</title>\n' +
        '  </head>\n' +
        '  <body>\n' +
        '\n' +
        '  <table style="width:100%" border=1 >\n' +
        '  <thead>\n' +
        '    <tr>\n' +
        '      <th>x</th>\n' +
        '      <th>Operation</th>\n' +
        '      <th>y</th>\n' +
        '      <th>Result</th>\n' +
        '    </tr>\n' +
        '  </thead>\n' +
        '  <tbody id="data-output">\n' +
        '    \n' +
        '  </tbody>\n' +
        '</table>\n' +
        '\n' +
        '<script\n' +
        '        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"\n' +
        '        integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"\n' +
        '        crossorigin="anonymous">\n' +
        '\n' +
        '    </script>\n' +
        '  </body>\n' +
        '\n' +
        '  <script>\n' +
        '  var tabela = document.getElementById("data-output");\n' +
        '  tabela.innerHTML = "<tr><td>1</td><td>+</td><td>2</td><td>3</td></tr><tr><td>8</td><td>-</td><td>2</td><td>6</td></tr><tr><td>6</td><td>/</td><td>3</td><td>2</td></tr><tr><td>4</td><td>+</td><td>8</td><td>12</td></tr><tr><td>7</td><td>*</td><td>7</td><td>49</td></tr><tr><td>-1</td><td>-</td><td>2</td><td>-3</td></tr> ";\n' +
        '\n' +
        '  </script>\n' +
        '  </html>\n', done);
     });
     it('chai-json', function (done) {
        expect("dane1.json").to.be.a.jsonFile()
        expect("dane1.json").to.be.a.jsonFile().and.contain.jsonWithProps({"x": 1, "y": 2, "operation": "+"})
        expect("dane1.json").to.be.a.jsonFile().and.contain.jsonWithProps({"x": 4, "y": 8, "operation": "+"})
        expect("dane1.json").to.be.a.jsonFile().and.contain.jsonWithProps({"x": 7, "y": 7, "operation": "*"})
        done()
       });

       it('response with route /result', function (done) {
         server
         .get('/result')
         .expect('Content-Type', /html/)
         .expect(200, '<!DOCTYPE html>\n' +
         '<html lang="en">\n' +
         '  <head>\n' +
         '    <meta charset="utf-8">\n' +
         '    <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
         '    <link\n' +
         '        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"\n' +
         '        rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"\n' +
         '        crossorigin="anonymous">\n' +
         '    <title>Your first page</title>\n' +
         '  </head>\n' +
         '  <body>\n' +
         '\n' +
         '  <table style="width:100%" border=1 >\n' +
         '  <thead>\n' +
         '    <tr>\n' +
         '      <th>x</th>\n' +
         '      <th>Operation</th>\n' +
         '      <th>y</th>\n' +
         '      <th>Result</th>\n' +
         '    </tr>\n' +
         '  </thead>\n' +
         '  <tbody id="data-output">\n' +
         '    \n' +
         '  </tbody>\n' +
         '</table>\n' +
         '\n' +
         '<script\n' +
         '        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"\n' +
         '        integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"\n' +
         '        crossorigin="anonymous">\n' +
         '\n' +
         '    </script>\n' +
         '  </body>\n' +
         '\n' +
         '  <script>\n' +
         '  var tabela = document.getElementById("data-output");\n' +
         '  tabela.innerHTML = "<tr><td>2</td><td>divide</td><td>2</td><td>1</td></tr><tr><td>3</td><td>add</td><td>4</td><td>7</td></tr><tr><td>4</td><td>multiply</td><td>5</td><td>20</td></tr><tr><td>10</td><td>substract</td><td>2</td><td>8</td></tr> ";\n' +
         '\n' +
         '  </script>\n' +
         '  </html>\n', done)

       })
      

      
      it('response with route /caluclate/:operation/:x/:y', function (done) {
         server
         .get('/calculate/divide/16/4')
        .expect('Content-Type', /html/)
        .expect(200, '\n' +
        '<!DOCTYPE html>\n' +
        '<html lang="en">\n' +
        '  <head>\n' +
        '    <meta charset="utf-8">\n' +
        '    <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
        '    <link\n' +
        '        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"\n' +
        '        rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"\n' +
        '        crossorigin="anonymous">\n' +
        '    <title>Your first page</title>\n' +
        '  </head>\n' +
        '  <body>\n' +
        '    <main class="container">\n' +
        '      <h1>Hello World</h1>\n' +
        "      <h2 id='a'><h2>\n" +
        '    </main>\n' +
        '    <script\n' +
        '        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"\n' +
        '        integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"\n' +
        '        crossorigin="anonymous">\n' +
        '\n' +
        '    </script>\n' +
        '  </body>\n' +
        '  <script>\n' +
        '\n' +
        "  var e = document.getElementById('a');\n" +
        '  e.innerHTML = "16 / 4 = 4 ";\n' +
        '</script>\n' +
        '</html>\n', done);

        var url = "mongodb+srv://reny:k0gw5kYBXrEiA2bi@cluster0.wzmkclt.mongodb.net/?retryWrites=true&w=majority";

      MongoClient.connect(url, function(err, db) {
         if (err) throw err;
         var dbo = db.db("lab11");
         var myquery = { x: "16", y: "4", operation: "divide"};
         dbo.collection("operations").deleteOne(myquery, function(err, obj) {
           if (err) throw err;
           db.close();
         });
       }); 

      });


});
