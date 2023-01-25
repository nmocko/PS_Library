// const Operation = require('./module.mjs');
import Operation from './module.mjs';

const suma1 = new Operation(parseInt(process.argv[2]), parseInt(process.argv[3]));
const suma2 = new Operation(parseInt(process.argv[2]), parseInt(process.argv[3]));

console.log(suma1.sum());
console.log(suma2.sum());
