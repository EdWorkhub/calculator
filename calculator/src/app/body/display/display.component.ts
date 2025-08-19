import { Component } from '@angular/core';
import { LogicService } from '../../logic.service';

@Component({
  selector: 'app-display',
  standalone: false,
  templateUrl: './display.component.html',
  styleUrl: './display.component.scss'
})
export class DisplayComponent {

  constructor(private logicService: LogicService) {}

  ngOnInit() {
    this.logicService.display$.subscribe(display => {
      this.displayValue = display;
    })
  }

  updateDisplay(value: number): void {
    this.displayValue = value;
  }
  
  testNumber: number = 1;
  displayValue!: number;
}
