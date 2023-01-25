import React, { useEffect } from "react";
import cat from "./catbooks.gif"

export default function App() {

  var e = document.getElementById("myCanvas");
  var c = e.getContext('2d');

  const draw = () => {

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
image.src=cat;
image.onload = function(){
c.drawImage(this, -25,3, 250, 170);  
e.style.scale = skala;
e.style.transform = 'rotateY(' + kat + 'deg)';
skala += step;
kat += 1;
if (skala > 1) {
    step *= -1;
}
if (skala < 0.4) {
    step *= -1;

}
e.current = requestAnimationFrame(draw);

} 
  }
// e.current = requestAnimationFrame(tick);
//     return () => {
//       cancelAnimationFrame(e.current);
//     }

  // });
  
  var skala = 0.4;
  var kat = 90;
  var step = 0.006;

  // const tick = () => {
  //   e.style.scale = skala;
  //   e.style.transform = 'rotateY(' + kat + 'deg)';
  //   skala += step;
  //   kat += 1;
  //   if (skala > 1) {
  //       step *= -1;
  //   }
  //   if (skala < 0.4) {
  //       step *= -1;

  //   }
  //   e.current = requestAnimationFrame(tick);
  // };

  useEffect(() => {
    e.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(e.current);
    };
  });




  return (
      <canvas
        id="myCanvas"
        width="200"
        height="300"
        style={{ border: "1px solid #000000" }}
      >
        Your browser does not support the HTML canvas tag.
      </canvas>
  );
}