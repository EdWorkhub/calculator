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
  lastInput!: string;
  isNumber!: boolean;
  isOperator!: boolean;
  buttonActive: boolean = true;

  // FUNCTIONS 
  onClickButton(val: string) {
    this.logicService.checkInput(val);
  }



}
