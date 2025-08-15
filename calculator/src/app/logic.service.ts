import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogicService {

  constructor() { }

  // PROPERTIES 

  // Tracks values entered into calculator during same "session" - clearing involves emptying this Array 
  sessionHistory: Array<any> = [];
  // Tracks most recent Input val (incl. operators)
  currentValue!: string;
  // Tracks prior Display val
  priorValue!: string;
  // Tracks currently selected Operator 
  currentOperator!: string;
  // Tracks if numeric digit is currently a valid input based on where you are in workflow (must go digit > operator > digit)
  firstNumberPresent!: number;
  // Tracks if numeric digit is currently a valid input based on where you are in workflow (must go digit > operator > digit)
  secondNumberPresent!: number;
  // Tracks if operator has been entered 
  firstOperatorPresent!: string;
  // Tracks if operator has been entered 
  secondOperatorPresent!: string;
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
      this.result = this.mathOperations(this.firstNumberPresent, this.secondNumberPresent, this.firstOperatorPresent)
      this.firstOperatorPresent = this.secondOperatorPresent;
      console.log(this.result);
      return this.result;
    }
    return 0;
  }

  // Workflow Restriction (number, operator, number, operator (perform), number (perform), operator (perform)
  // Find if input value is number or operator 
  // Array Logic 
  // if empty and input is number, add number to array 
  // if empty and input is operator, no action 
  // if number present and input is number, replace existing number 
  // if number present and input is operator, add operator to array 
  // if np and op and input is number, add number to array 
  // if np and op and input is operator, no action 
  // if np and op and np and input is number, replace existing number 
  // if np and op and np and input is operator, perform operation on number based on np1, op1, np2 and store op2 for next op 

  identifyInput(val: string): boolean {
    // If can convert String val to Number and isFinite value, continue 
    if (Number.isFinite(Number(val))) {
        this.processNumber(Number(val))
      }
    else if (['+', '-', '*', '/', '.', '='].includes(val)) {
      this.processOperator(val)
    } 
    return false;
  }

  processNumber(val: number) {
    if (!this.firstNumberPresent) {
      this.firstNumberPresent = val;
      this.sessionHistory.push(val);
    } else if (this.firstNumberPresent && !this.secondNumberPresent) {
      this.secondNumberPresent = val;
      this.sessionHistory.push(val);
    } else {
      this.firstNumberPresent = this.secondNumberPresent;
      this.secondNumberPresent = NaN;
      this.sessionHistory.shift();
    }
  }

  processOperator(val: string) {
    if (!this.firstOperatorPresent) {
      this.firstOperatorPresent = val;
      this.sessionHistory.push(val);
    } else if (this.firstOperatorPresent && !this.secondOperatorPresent) {
      this.secondOperatorPresent = val;
      this.sessionHistory.push(val);
      this.performOperation(this.secondOperatorPresent);
    }
  }

}
  // identifyInput = 'number' | 'operator', validateInput = true | false, 
  // Find type > if conditionally valid, perform operations > else fail 
