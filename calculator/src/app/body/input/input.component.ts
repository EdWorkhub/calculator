import { Component } from '@angular/core';
import { LogicService } from '../../logic.service';

@Component({
  selector: 'app-input',
  standalone: false,
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {

  constructor(private logicService: LogicService) {}

  // PROPERTIES 
  currentValue!: number;
  lastInput!: string;
  isNumber!: boolean;
  isOperator!: boolean;
  buttonActive: boolean = true;

  // FUNCTIONS 
  onClickButton(val: string) {
    // Get val from template 
    // identifyInput checks to see if number or operator 
    // Passes to validateInput to check to see if is valid entry based on position within workflow 
    // validateInput then passes to mathOperations if determined to be valid input 
    // Should pass result to DisplayComponent 

    // If val is valid (i.e number or operator)
    if (this.logicService.identifyInput(val)) {
      // Perform Operation
      this.currentValue = this.logicService.performOperation(val);
      console.log(this.currentValue);
    } else {
      let value = Number(val);
      console.log(value);
    }
  }
}
