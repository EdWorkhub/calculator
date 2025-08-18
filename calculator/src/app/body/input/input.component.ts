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
  numericValues: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  operatorValues: Array<string> = ["+", "-", "*", "/", "="]

  // FUNCTIONS 

  submitInput(value: string | number) {
    this.logicService.parseInput(value)
  }
}
