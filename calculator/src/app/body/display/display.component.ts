import { Component } from '@angular/core';
import { LogicService } from '../../logic.service';

@Component({
  selector: 'app-display',
  standalone: false,
  templateUrl: './display.component.html',
  styleUrl: './display.component.scss'
})
export class DisplayComponent {

  constructor(private logicService: LogicService) {

  }

  ngOnInit() {
    this.logicService.display$.subscribe(display => {
      if (display) {
        this.updateDisplay(display);
      }
    });
  }

  updateDisplay(value: number) {
    this.displayValue = value;
  }

  displayValue!: number;
}
