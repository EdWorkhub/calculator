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
  // Tracks prior Display val a
  priorValue!: string;
  // Tracks currently selected Operator 
  currentOperator: string = '';
  // Tracks if numeric digit is currently a valid input based on where you are in workflow (must go digit > operator > digit)
  currentTypeNumeric: boolean = false;
  // Tracks result of operation 
  result!: Number; 

  // FUNCTIONS 
  mathOperations(val: number, val2: number, operator: string): Number {
    switch (operator) {
      case '+': return val = val2; 
      case '-': return val - val2;
      case '*': return val * val2;
      case '/': return val / val2;
      default: throw new Error('Invalid operator')
    }
  }

  identifyInput(val: string): void {
    // If can convert String val to Number and isFinite value, continue 
    if (Number.isFinite(Number(val))) {
        this.validateInput('number')
      }
    else if (['+', '-', '*', '/', '.', '='].includes(val)) {
        this.validateInput('operator')
    } 
  }

  validateInput(val: string): boolean {
    // Only functions if current val is numeric and new val is operator or vice versa 
    // If newly entered value is a number and current value is either blank or an operator, continue 
    if (val === 'number' && !this.currentTypeNumeric) {
      // Set current type to number   
      this.currentTypeNumeric = true;
      // Set prior value to current value if current value not empty 
      if (this.currentValue) {
        this.priorValue = this.currentValue;
      }
      // Update current value to val 
      this.currentValue = val;
      return true
      // Call performOperation 
    } else if (val === 'operator' && this.currentTypeNumeric) {
      this.currentTypeNumeric = false; 
      if (this.currentValue) {
        this.priorValue = this.currentValue;
      }
      this.currentOperator = val;
      this.currentValue = val; 
      return true
    } else {
      return false
    }
  }
}
  // 

  // identifyInput = 'number' | 'operator', validateInput = true | false, 
  // Find type > if conditionally valid, perform operations > else fail 
