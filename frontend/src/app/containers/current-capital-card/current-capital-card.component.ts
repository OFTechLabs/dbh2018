import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-capital-card',
  templateUrl: './current-capital-card.component.html',
  styleUrls: ['./current-capital-card.component.scss']
})
export class CurrentCapitalCardComponent implements OnInit {
  @Input() public currentCapital: number;

  @Input() public currentYear: number;

  constructor() {}

  ngOnInit() {}
}
