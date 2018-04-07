import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-goal-card',
  templateUrl: './goal-card.component.html',
  styleUrls: ['./goal-card.component.scss']
})
export class GoalCardComponent implements OnInit {
  @Input() public description: string;

  public targetMonth = 3;

  @Input() public targetYear: number;

  @Input() public targetAmount: number;

  constructor() {}

  ngOnInit() {}
}
