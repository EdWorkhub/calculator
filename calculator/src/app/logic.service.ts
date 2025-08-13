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
  // Tracks prior Display val
  priorValue!: string;
  // Tracks currently selected Operator 
  currentOperator!: string;
  // Tracks if numeric digit is currently a valid input based on where you are in workflow (must go digit > operator > digit)
  numberPresent!: boolean;
  // Tracks if operator has been entered 
  operatorPresent!: boolean; 
  // Tracks result of operation 
  result!: number; 

  // FUNCTIONS 
  mathOperations(val: number, val2: number, operator: string): number {
    switch (operator) {
      case '+': return val = val2; 
      case '-': return val - val2;
      case '*': return val * val2;
      case '/': return val / val2;
      default: throw new Error('Invalid operator')
    }
  }

  performOperation(val: string): number {
    // If all three values are truthy 
    if (this.priorValue, this.currentOperator, this.currentValue) {
      // Perform operation 
      this.result = this.mathOperations(parseInt(val), parseInt(this.priorValue), this.currentOperator)
      console.log(this.result);
      return this.result;
    }
    return 0;
  }

  identifyInput(val: string): boolean {
    // If can convert String val to Number and isFinite value, continue 
    if (Number.isFinite(Number(val))) {
        return this.validateInput('number');
      }
    else if (['+', '-', '*', '/', '.', '='].includes(val)) {
      this.currentOperator = val;
      return this.validateInput('operator');
      
    } 
    return false;
  }

  validateInput(val: string): boolean {
    if (val === 'number' && !this.numberPresent) {
      // If val is number and no number is present, set val to number and make number present 
      this.currentValue = val;
      this.numberPresent = true; 
      return false // no operation
    } else if (val === 'number' && this.numberPresent) {
      // If val is number and number is last input, replace last input with new number 
      this.currentValue = val;
      this.numberPresent = true; 
      return false // no operation 
      // If val is operator and no number is yet present, skip or throw error? 
    } else if (val === 'operator' && !this.numberPresent) {
      return false;
    } else if (val === 'operator' && this.numberPresent && !this.operatorPresent) {
      // If val is operator, current value is number and no currentOperator exists, 
      // set operator to currentValue and number to priorValue
      this.priorValue = this.currentValue;
      this.currentValue = val;
      this.operatorPresent = true;
      return false // no operation 
    } else if (val === 'operator' && this.numberPresent && this.operatorPresent) {
      // If val is operator, current value is number and operator is already present
      // Perform operation
      // this.performOperation(this.currentValue);
      // this.priorValue = this.currentValue;
      return true;
  }
  return false;
}
}
  // identifyInput = 'number' | 'operator', validateInput = true | false, 
  // Find type > if conditionally valid, perform operations > else fail 
