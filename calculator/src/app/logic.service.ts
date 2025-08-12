import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogicService {

  constructor() { }

  // PROPERTIES 

  // Tracks values entered into calculator during same "session" - clearing involves emptying this Array 
  sessionHistory: Array<string> = [];
  // Tracks most recent Input val (incl. operators)
  currentValue: string = '';
  // Tracks upcoming operator 
  currentOperator!: string;
  // Tracks prior Display val 
  priorValue: string = '';

  // FUNCTIONS 
  mathOperations(val: number, val2: number, operator: string) {
    switch (operator) {
      case '+': return val = val2; 
      case '-': return val - val2;
      case '*': return val * val2;
      case '/': return val / val2;
      default: throw new Error('Invalid operator')
    }
  }

  checkInput(val: string) {
    // If can convert String val to Number and isFinite value, continue 
    if (Number.isFinite(Number(val))) {
      // If currentValue is operator, continue (to protect against multiple digit entries)
      if (['+', '-', '*', '/', '.', '=', ''].includes(this.currentValue)) {
        // If is a valid number and currentValue is operator, change currentValue to number and then operate
        this.currentValue = val;
        return 'number'
      } 
      // else if is operator and this.currentValue is Number, continue
    } else if (['+', '-', '*', '/', '.', '='].includes(val) && Number.isFinite(Number(this.currentValue)) ) {
      // set currentValue to operator value and set currentOperator to operator value
      this.currentOperator = val;
      this.currentValue = val;
      return 'operator'
    } else {
      return 'invalid'
    }
    return
  }
}
