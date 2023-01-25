import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';

var x;
var id = null;
var f = 0;
var input = document.getElementById('mess');
function Licznik(props) {

  return (
    <span> {props.time} </span>
  )
}



const App = () => {

  var [t, setT] = useState(0);


  const myFunction = () => {
    setT(x);
    if (x !== 0 && x !== '0') {
      x -= 1;
      f = 0;
    }
    else if (f !== 1){
      input.value='0';
      f = 1;
    }
  };

  useEffect(() => {
    const keyDownHandler = event => {

      if (event.key === 'Enter') {
        event.preventDefault();
        x = input.value;
        console.log(x);
        clearInterval(id);
        setT(x);
        if (x !== '0'){
          x -= 1;
        }
        id = setInterval(myFunction, 1000);
      }  
    };


    input.addEventListener('keydown', keyDownHandler);
    }, []);
    

  return (
    <div className="App">
      <Licznik time={t}/>
      <Licznik time={t}/>
      <Licznik time={t}/>
      <Licznik time={t}/>
      <Licznik time={t}/>
      <Licznik time={t}/>
      <Licznik time={t}/>
      <Licznik time={t}/>
    </div>
  )
}

export default App;
