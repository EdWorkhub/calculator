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
  // Tracks prior Input val 
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

  mathOperations(val: number, val2: number) {
    
  }
}
