import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-feasibility-card',
  templateUrl: './feasibility-card.component.html',
  styleUrls: ['./feasibility-card.component.scss']
})
export class FeasibilityCardComponent implements OnInit {
  @Input() public feasibility: number;

  constructor() {}

  ngOnInit() {}
}
