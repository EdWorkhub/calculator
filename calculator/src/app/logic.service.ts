import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogicService {

  constructor() { }

  // V2 
  // PROPERTIES 
  // Input Tracking 
  accumulatorValue!: number;
  inputValue!: number;
  operatorValue!: string; 

  // This could probably be done in Component? 
  parseInput(value: string | number): void {
    if (typeof value === 'string') {
      console.log('Operator: ', value);
      this.processOperator(value);
    } else {
      console.log('Number: ', value);
      this.processNumber(value);
    }
  }

  processOperator(value: string): void {
    // If no valid numbers yet entered return 
    if (!this.accumulatorValue) {
      return
      // If accumulator valid and no input value, set operator 
    } else if (this.accumulatorValue && !this.inputValue) {
      this.operatorValue = value;
      // If both accumulator and input valid, perform operation 
    } else {
      this.accumulatorValue = (this.performOperations(this.operatorValue));
      this.updateAccumulatorDisplay();
      console.log(this.accumulatorValue);
      // Then update operator for next process
      this.operatorValue = value;
    }
  }

  processNumber(value: number): void {
    // If no valid numbers set as accumulator 
    if (!this.accumulatorValue) {
      this.accumulatorValue = value;
      this.updateAccumulatorDisplay();
      // If accumulator and operator present, set as inputValue 
    } else if (this.accumulatorValue) {
      this.inputValue = value;
      this.updateInputDisplay();
    }
  }

  performOperations(value: string): number {
    switch (value) {
      case '+': return this.accumulatorValue + this.inputValue;
      case '-': return this.accumulatorValue - this.inputValue;
      case '*': return this.accumulatorValue * this.inputValue;
      case '/': 
      // Protect against divide by zero, bitch
      if (this.inputValue === 0) {
        console.log('bitch');
        return 0;
      }
      return this.accumulatorValue / this.inputValue;
      // Thanks Shiannnnnaaaaaaa
      // Protecting against duplicate equals entries 
      case '=': 
      if (this.operatorValue === '=') { 
        return 0;
       } else {
         return this.performOperations(this.operatorValue) 
        }
    }
    return 0
  }

  clearDisplay(): void {
    this.accumulatorValue = 0; 
    this.inputValue = 0;
    this.operatorValue = '';
    this.updateAccumulatorDisplay();
  }

  // Do I need two BS here? 
  returnAccumulatorDisplay(): number {
    return this.accumulatorValue;
  }
  returnInputDisplay(): number {
    return this.inputValue;
  }

  private displayValue = new BehaviorSubject<number>(0);
  display$ = this.displayValue.asObservable(); 
  updateAccumulatorDisplay() {
    this.displayValue.next(this.returnAccumulatorDisplay());
  }
  updateInputDisplay() {
  this.displayValue.next(this.returnInputDisplay());
  }
}