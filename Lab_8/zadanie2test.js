
function liczby(napis) {
    var jupi = 0;
    for (let i in napis)
    {
        if (47 < napis[i].charCodeAt(0) && napis[i].charCodeAt(0) < 58)
        {
            jupi += 1;
        }
    }
    return jupi;
}

function litery(napis) {
    var jupi = 0;
    for (let i in napis)
    {
        if (47 >= napis[i].charCodeAt(0) || napis[i].charCodeAt(0) >= 58)
        {
            jupi += 1;
        }
    }
    return jupi;
}

function suma(napis) {
    var jupii = 0;
    var z = 10;
    for (let i in napis)
    {
        if (47 < napis[i].charCodeAt(0) && napis[i].charCodeAt(0) < 58)
        {
            let a = napis[i].charCodeAt(0) - 48
            jupii += a;
            jupii *= z;
        }
        else
        {
            jupii /= 10;
            return jupii;
        }
    }
    jupii /= 10;
    return jupii;
}

var expect = chai.expect;

describe('The liczby() function', function() {
 it('Returns 3 for 123', function() {
   expect(liczby('123')).to.equal(3);
 });
 it('Returns 2 for 11aa', function() {
   expect(liczby('11aa')).to.equal(2);
 });
 it('Returns 4 for b3345a', function() {
    expect(liczby('b3345a')).to.equal(4);
  });
  it('Returns 1 for bac2', function() {
    expect(liczby('bac2')).to.equal(1);
  });
  it('Returns 0 for kot', function() {
    expect(liczby('kot')).to.equal(0);
  });
});

describe('The litery() function', function() {
    it('Returns 0 for 123', function() {
      expect(litery('123')).to.equal(0);
    });
    it('Returns 2 for 11aa', function() {
      expect(litery('11aa')).to.equal(2);
    });
    it('Returns 2 for b3345a', function() {
       expect(litery('b3345a')).to.equal(2);
     });
     it('Returns 3 for bac2', function() {
       expect(litery('bac2')).to.equal(3);
     });
     it('Returns 3 for kot', function() {
       expect(litery('kot')).to.equal(3);
     });
   });

describe('The suma() function', function() {
    it('Returns 123 for 123', function() {
      expect(suma('123')).to.equal(123);
    });
    it('Returns 11 for 11aa', function() {
      expect(suma('11aa')).to.equal(11);
    });
    it('Returns 0 for b3345a', function() {
       expect(suma('b3345a')).to.equal(0);
     });
     it('Returns 0 for bac2', function() {
       expect(suma('bac2')).to.equal(0);
     });
     it('Returns 0 for kot', function() {
       expect(suma('kot')).to.equal(0);
     });
     it('Returns 1 for 1', function() {
        expect(suma('1')).to.equal(1);
      });
   });   