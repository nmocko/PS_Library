
var paragraph = document.getElementById('paragraph');
var x = 0;
var o = 0;
while (true){
    let napis = window.prompt("napis","napis");
    if (napis === null)
    {
        break;
    }
    var n1 = 0;
    var n1 = 0;
    var n3 = 0;

    n1 = liczby(napis);
    n2 = litery(napis);
    n3 = suma(napis);
    x += n3;
    // document.write('Tekst 3');
    o += 1;
    paragraph.innerHTML += napis + '<br />' + n1 + '    ' + n2 + '  ' + x + '<br />';

}


function liczby(napis) {
    "use strict";
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
    "use strict";
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
    "use strict";
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


