var buttonL = document.getElementById('login');
var logged = -1;

var dane = {
    labels: ['Pan Tadeusz', 'Wesele', 'Solaris', 'Lalka'],
    series: [[3, 1, 2, 6]]
}

var czytelnicy = [['Jan', 'Kowalski', 0, [], ['j_kowal', 'haslo']], ['Aleksandra', 'Jankowska', 0, [], ['ola', '1234']], ['Julia', 'Nowak', 0, [], ['jn', 'jn']]];
var biblioteka = [['Pan Tadeusz', 3, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuIBW0JL1-GaVattVZJRJv3YFyJP3o-Ry4bg&usqp=CAU', 'Adam Mickiewicz'],
['Wesele', 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZxriutyUILpaXGF0YSMgAOmIiPZhhYz-p_7kUitAOqHxN2P2z-fCVLd8gWQufg_DIr0k&usqp=CAU', 'Stanisław Wyspiański'],
['Solaris', 2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPOI_jMS3JRE4uNS4IgK_tV3RdMsq8fx9AVw&usqp=CAU' ,'Stanisław Lem'],
['Lalka', 6, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpFFS1ljJAdzdem3GzC1CYS6HK-xuTswSrVRH4XdDAA5-H82ZYJxfJH3J3CqpBvbHaAJc&usqp=CAU', 'Bolesław Prus']];

library_write();

var ee = document.getElementById('canvass');
var cc = ee.getContext('2d');

function wykres() {

    // cc.clearRect(0, 0, 900, 160);

    Chartist.Bar('.ct-chart', dane, 
     {width: 900, height: 300, axisY: {
        onlyInteger: true,
        offset: 20
      }});

    var iloscksiazek = biblioteka.length;
    let a = 0;
    let w = Math.floor(900 / (iloscksiazek));
    let s = Math.floor(w / 2) + 3;
    while (a < iloscksiazek) {
        imagen(a, s)
        a += 1;
        s += w;
        s -= 10;
    }
}

function imagen(a2, x2) {
    var imagee = new Image();
        imagee.src = biblioteka[a2][2];
        imagee.onload = function() {
            cc.drawImage(this, x2, 0, 44, 90);
         }
        }
wykres();


buttonL.onclick = function baza() {

    const name = document.forms[0].elements[0].value;
    const pew = document.forms[0].elements[1].value;
    for (let i in czytelnicy){
        if (name === czytelnicy[i][4][0] && pew === czytelnicy[i][4][1])
        {
            var naglowek = document.getElementById('twoje');

            naglowek.innerHTML = 'Witaj ' + czytelnicy[i][0] + ' ' + czytelnicy[i][1] + '<br \>Twoje wyporzyczone książki:';
            logged = i;
            write();
            break;
        }

    }
}

function red_border() {

    for (let i in biblioteka) {
        if (biblioteka[i][1] === 0) {
            let name = 'ksiegozbior-' + i;
            let b = document.getElementById(name);
            b.style.cssText = `box-shadow: 0px 0px 3px 3px #FF9595;`;

        }
    }
}

function library_write () {

    const container = document.getElementById('accordion');

    container.innerHTML = '';

    biblioteka.forEach((result, idx) => {
    const card = document.createElement('div');
    card.classList = 'card-body';

    const content = `
    <div  ondblclick="wyporzycz(${idx})" class="w3-col m6 l4  w3-margin-bottom">
    <div class="card w3-container" style="height: 120%;">
        <div id='ksiegozbior-${idx}' class="w3-card-4 poj" style ="">

    <header class="w3-container w3-light-grey w3-border w3-border-black">
        <h3 class="w3-text-dark-grey ">${biblioteka[idx][0]}</h3>
    </header>

    <div class="w3-container w3-border w3-border-black">
        <b class="w3-text-xx-large">${biblioteka[idx][3]}</b>
    </div>
    
    <div class="w3-border w3-border-black">
        <img src="${biblioteka[idx][2]}" style="width:100%;  object-fit: cover;">
    </div>
    
    <button class="w3-pannel w3-border w3-border-black w3-block w3-light-grey w3-left-align w3-text-small"><b>Ilość:</b> ${biblioteka[idx][1]}</button>
    
    </div> 
    </div>
    </div>
    `;

    container.innerHTML += content;
})
red_border();

Chartist.Bar('.ct-chart', dane, 
     {width: 900, height: 300, axisY: {
        onlyInteger: true,
        offset: 20
      }});
}


function wyporzycz(index) {
    if (logged === -1) {
        console.log('Musisz być zalogowany, aby móc wyporzyczać');
        return;
    }
    if (biblioteka[index][1] === 0) {
        console.log("Wszytskie egzemplarze tej ksiazki zostały wyporzyczone");
        return;
    }
    for (let i in czytelnicy[logged][3]) {
        if (biblioteka[index][0] === czytelnicy[logged][3][i][0])
        {
            console.log("Już wyporzyczyłeś jeden egzemplarz tej książki");
            return;
        }
    }
    biblioteka[index][1] -= 1;
    dane.series[0][index] -= 1;
    czytelnicy[logged][3][czytelnicy[logged][2]] = [biblioteka[index][0], biblioteka[index][3], biblioteka[index][2], index];
    czytelnicy[logged][2] += 1;

    library_write();
    write();
    return;

}

function zwroc(index) {

    var index_biblioteka = czytelnicy[logged][3][index][3];
    biblioteka[index_biblioteka][1] += 1;
    dane.series[0][index_biblioteka] += 1;
    var filtered = czytelnicy[logged][3].filter(function(value, index, arr){ 
        return value[0] != biblioteka[index_biblioteka][0];
    });

    czytelnicy[logged][3] = filtered;
    czytelnicy[logged][2] -= 1;


    library_write();
    write();
    return;
}

function write() {
    const cont = document.getElementById('acc');
    cont.innerHTML = '';

    czytelnicy[logged][3].forEach((result, idx) => {
    const car = document.createElement('div');
    car.classList = 'card-body';

    const conte = `
    <div id='wyporzyczone-${idx}' ondblclick="zwroc(${idx})" class="w3-col m6 l4  w3-margin-bottom">
    <div class="card w3-container" style="height: 120%;">
        <div class="w3-card-4 poj" >

    <header class="w3-container w3-light-grey w3-border w3-border-black">
        <h3 class="w3-text-dark-grey ">${czytelnicy[logged][3][idx][0]}</h3>
    </header>

    <div class="w3-container w3-border w3-border-black">
        <b class="w3-text-xx-large">${czytelnicy[logged][3][idx][1]}</b>
    </div>
    
    <div class="w3-border w3-border-black">
        <img src="${czytelnicy[logged][3][idx][2]}" style="width:100%;  object-fit: cover;">
    </div>
    
    </div> 
    </div>
    </div>
    `;

    cont.innerHTML += conte;
    })
}



var e = document.getElementById('canvas');
var c = e.getContext('2d');

c.fillStyle='#7ce7e6';
c.fillRect(0, 0, 640, 480);


c.beginPath()
c.lineWidth = 2;
c.strokeStyle='black';
c.fillStyle='#8cb044';
c.rect(30, 100, 150, 25);
c.fill();
c.stroke();

c.beginPath();
c.lineWidth = 2;
c.strokeStyle='black';
c.fillStyle='#b04b44';
c.rect(20, 125, 150, 25);
c.fill();
c.stroke();

c.beginPath();
c.lineWidth = 2;
c.strokeStyle='black';
c.fillStyle='#aea0e4';
c.rect(45, 150, 140, 30);
c.fill();
c.stroke();

c.beginPath();
c.lineWidth = 2;
c.strokeStyle='black';
c.fillStyle='#00e18f';
c.rect(20, 180, 140, 30);
c.fill();
c.stroke();

c.beginPath();
c.lineWidth = 2;
c.strokeStyle='black';
c.fillStyle='#f5ed3c';
c.rect(30, 210, 140, 28);
c.fill();
c.stroke();


c.beginPath();
c.lineWidth = 2;
c.strokeStyle='black';
c.fillStyle='#b04b44';
c.rect(10, 238, 150, 25);
c.fill();
c.stroke();

c.beginPath();
c.lineWidth = 2;
c.strokeStyle='black';
c.fillStyle='#8cb044';
c.rect(40, 263, 145, 23);
c.fill();
c.stroke();

c.beginPath();
c.lineWidth = 2;
c.strokeStyle='black';
c.fillStyle='#f5ed3c';
c.rect(20, 286, 145, 20);
c.fill();
c.stroke();

c.beginPath();
c.font = '20px Arial';
c.strokeText('B', 70, 144);

c.beginPath();
c.font = '20px Arial';
c.strokeText('G', 70, 172);

c.beginPath();
c.font = '20px Arial';
c.strokeText('A', 70, 202);

c.beginPath();
c.font = '20px Arial';
c.strokeText('G', 70, 231);

c.beginPath();
c.font = '20px Arial';
c.strokeText('H', 70, 258);

var image = new Image();
image.src='catbooks.gif';
image.onload = function(){
c.drawImage(this, -25,3, 250, 170);   
}


const logo = document.getElementById("canvas");
let skala = 0.4;
let kat = 90;
let step = 0.006;


async function animacjaloga () {
    logo.style.scale = skala;
    logo.style.transform = 'rotateY(' + kat + 'deg)';
    skala += step;
    kat += 1;
    if (skala > 1) {
        step *= -1;
    }
    if (skala < 0.4) {
        step *= -1;

    }
    requestAnimationFrame(animacjaloga);
}

requestAnimationFrame(animacjaloga); 
