// /** Operation -- class to calculation 
//  * Will be exported
// */

// class Operation {
//   /**
//  * @constructor
//  * @param {int} x - first number
//  * @param {int} y - second number
//  */
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//   }

//   /** sum - function to add two numbers 
//    * x and y defined in constructior*/ 
//   sum() {
//     const a = this.x + this.y;
//     return a;
//   }
// }
// /** Export module */
// module.exports = Operation;

/** Operation -- class to calculation 
 * Will be exported
*/

export default class Operation {
    /**
 * @constructor
 * @param {int} x - first number
 * @param {int} y - second number
 */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

    /** sum - function to add two numbers 
   * x and y defined in constructior*/ 

  sum() {
    const a = this.x + this.y;
    return a;
  }
}
