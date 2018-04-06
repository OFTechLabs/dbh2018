import { Component, OnInit } from '@angular/core';
import { GoalStateModel } from '../../model/goal.state';

@Component({
  selector: 'app-goal-card',
  templateUrl: './goal-card.component.html',
  styleUrls: ['./goal-card.component.scss']
})
export class GoalCardComponent implements OnInit {
  goal: GoalStateModel = new GoalStateModel('my retirement', 11, 2040, 30000);

  constructor() {}

  ngOnInit() {}
}
