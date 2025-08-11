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
  currentValue!: string;
  // Tracks upcoming operator 
  currentOperator!: string;
  // Tracks prior Display val 
  lastValue!: string;

  // FUNCTIONS 
  addDigit(val: number, val2: number) {
    const additionTotal = (val + val2);
    return additionTotal;
  }

  subtrackDigit(val: number, val2: number) {
    const subtractionTotal = (val - val2);
    return subtractionTotal;
  }

  multiplyDigit(val: number, val2: number) {
    const multiplicationTotal = (val * val2);
    return multiplicationTotal;
  }

  divideDigit(val: number, val2: number) {
    const divisionTotal = (val / val2);
    return divisionTotal;
  }

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
    if (Number.isFinite(Number(val))) {
      this.currentValue = val;
      return 'number'
    } else if (['+', '-', '*', '/', '.', '='].includes(val)) {
      return 'operator'
    }
  }
}
