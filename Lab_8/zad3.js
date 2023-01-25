var button = document.getElementById('button');
var paragraph = document.getElementById('paragraph');
var biblioteka = [];
var czytelnicy = [];
var iloscksiazek = 0;
var iloscczytelnikow = 0;
var dane = {
    labels: [],
    series: [[]]
}
var e = document.getElementById('canvas');
var c = e.getContext('2d');



button.onclick = function() {

//   paragraph.innerHTML += document.forms[0].elements[0].value + '<br />';
  const myArray = document.forms[0].elements[0].value.split(" ");

  if (myArray[0] === "D" || myArray[0] === "DODAJ")
  {
    nowaksiazka(myArray);
  }
  else if (myArray[0] === "W" || myArray[0] === "WYPORZYCZ")
  {
    wyporzycz(myArray);
  }
  else if (myArray[0] === "Z" || myArray[0] === "ZWRÓĆ")
  {
    zwrot(myArray);
  }
  else if (myArray[0] === "WC")
  {
    wypisz();
  }
  else if (myArray[0] === "WDK")
  {
    wykaz();
  }
  else {
    console.log("Błędna komenda\n ");
  }

  write ();

};

function nowaksiazka(array) {
    biblioteka[iloscksiazek] = [];
    biblioteka[iloscksiazek] = [array[1], parseInt(array[2]), array[3], array[4]];
    dane.labels[iloscksiazek] = array[1];
    dane.series[0][iloscksiazek] = parseInt(array[2]);
    console.log("Dodano")
    iloscksiazek += 1;
}

function wyporzycz(array) {
    let i = 0;
    while (i < iloscksiazek) {
        console.log(biblioteka[i][0]);
        if (array[1] === biblioteka[i][0]) {
            if (biblioteka[i][1] === 0)
            {
                console.log("Wyporzyczone");
                return 0;
            }
            let j = 0;
            while (j < iloscczytelnikow) {
                if (array[2] === czytelnicy[j][0] && array[3] === czytelnicy[j][1]) {
                    var ile = czytelnicy[j][2];
                    czytelnicy[j][3][ile] = array[1];
                    czytelnicy[j][2] += 1;
                    break;
                }
                j += 1;
            }
            if (j === iloscczytelnikow) {
                czytelnicy[iloscczytelnikow] = [];
                czytelnicy[iloscczytelnikow][0] = array[2];
                czytelnicy[iloscczytelnikow][1] = array[3];
                czytelnicy[iloscczytelnikow][2] = 1;
                czytelnicy[iloscczytelnikow][3] = [];
                czytelnicy[iloscczytelnikow][3][0] = array[1];
                iloscczytelnikow += 1;
            }
            biblioteka[i][1] -= 1;
            dane.series[0][i] -= 1;
            console.log("Wyporzyczone");
            return 1;

        }
        i += 1;
    }
    if (i === iloscksiazek) {
        console.log("Nie mamy tej ksiązki");
        return 0;
    }
    
}

function zwrot(array) {
    let i = 0;
    while (i < iloscczytelnikow) {
        if (array[2] == czytelnicy[i][0] && array[3] == czytelnicy[i][1])
        {
            console.log(i)
            let j = 0;
            while (j < czytelnicy[i][2]) {
                if (czytelnicy[i][3][j] == array[1]) {
                    var filtered = czytelnicy[i][3].filter(function(value, index, arr){ 
                        return value != array[1];
                    });
                    czytelnicy[i][3] = filtered;
                    czytelnicy[i][2] -= 1;
                    let z = 0;
                    while (z < iloscksiazek) {
                        if (biblioteka[z][0] === array[1]) {
                            biblioteka[z][1] += 1;
                            dane.series[0][z] += 1;
                            break;
                        }
                        z += 1;
                    }
                    console.log("Zwrócone");
                    return 1;
                }

                j += 1;
            }

            if (j === czytelnicy[i][2]) {
                console.log("Nie wporzyczyłeś tej książki 1")
                return 0;
            }

        }
        i += 1;
    }
    if (i === iloscczytelnikow) {
        console.log("Nie wporzyczyłeś tej książki 2")
        return 0;
    }

}

function wypisz() {
    paragraph.innerHTML += 'WYKAZ CZYTELNIKÓW: <br />';
    for (let i in czytelnicy) {
        paragraph.innerHTML += czytelnicy[i][0] + ' ' + czytelnicy[i][1] + ': <br />';
        for (let j in czytelnicy[i][3]) {
            paragraph.innerHTML += `${parseInt(j)+1}. `  + czytelnicy[i][3][j] + '<br />';
        }

    }

}

function wykaz() {
    paragraph.innerHTML += "WYKAZ KSIĄŻEK: <br />";
    for (let i in biblioteka) {
        paragraph.innerHTML += `${parseInt(i)+1}. ` + biblioteka[i][0] + ' ' + biblioteka[i][1] + '<br />';
    }
}

function write() {

    c.clearRect(0, 0, canvas.width, canvas.height);

    Chartist.Bar('.ct-chart', dane, 
    {width: 500, height: 300});


    let a = 0;
    let w = Math.floor(450 / (iloscksiazek));
    let s = Math.floor(w / 2) + 20;
    while (a < iloscksiazek) {
        image(a, s)
        a += 1;
        s += w;
    }
}

function image(a2, x2) {
    var image = new Image();
        image.src = biblioteka[a2][2];
        image.onload = function() {
            c.drawImage(this, x2, 0, 44, 90);
         };
}

button.onclick;
