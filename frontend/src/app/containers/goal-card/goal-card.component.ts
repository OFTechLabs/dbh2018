import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-goal-card',
  templateUrl: './goal-card.component.html',
  styleUrls: ['./goal-card.component.scss']
})
export class GoalCardComponent implements OnInit {
  goal = { description: 'my retirement', targetMonth: 3, targetYear: 2058, targetAmount: 60000 };

  constructor() {}

  ngOnInit() {}
}
