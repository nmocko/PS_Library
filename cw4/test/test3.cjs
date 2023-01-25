//Source:  https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/
var supertest = require("supertest");

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:8000");

// UNIT test begin
describe('GET /submit?name=', function () {
      it('respond with "/etc"', function (done) {
            server
                  .get('/submit?name=%2Fetc')
                  .expect('Content-Type', /text\/plain/)
                  .expect(200, "/etc jest katalogiem", done);
      });
      it('respond with "/home/reny/hash.txt"', function (done) {
            server
                  .get('/submit?name=%2Fhome%2Freny%2Fhash.txt')
                  .expect('Content-Type', /text\/plain/)
                  .expect(200, "/home/reny/hash.txt jest plikiem, a jego zawartość to:\n d47d08f5d4ea8bde0bfd4e96fff25d5b6c55539d\n", done);
      });
      it('respond with "/nie/istnieje"', function (done) {
            server
                  .get('/submit?name=%2Fnie%2Fistnieje')
                  .expect('Content-Type', /text\/plain/)
                  .expect(200, "To nie jest plik, ani katalog", done);
      });
});