import * as fs from 'node:fs';

var content;

// node, go fetch this file. when you come back, please run this "read" callback function
fs.readFile('~/Testy', function read(err, data) {
    content = data;
    console.log(data);
});

// in the meantime, please continue and run this console.log
console.log(content);

// async function myReadfile () {
//     try {
      
//       const file = await fs.readFile('~/Testy', 'utf-8');
//       console.log(file);
//       return file;
//     }
//     catch (err) { console.error( err ) }
//   };

// console.log(myReadfile());