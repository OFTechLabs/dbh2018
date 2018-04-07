import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-return-card',
  templateUrl: './return-card.component.html',
  styleUrls: ['./return-card.component.scss']
})
export class ReturnCardComponent implements OnInit {
  @Input() contractStartYear: number;

  @Input() currentYear: number;

  @Input() targetAmount: number;

  @Input() realization: number[];

  @Input() simulationGood: number[];

  @Input() simulationExpected: number[];

  @Input() simulationBad: number[];

  constructor() {}

  ngOnInit() {}
}
