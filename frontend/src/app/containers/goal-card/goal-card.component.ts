import { Component, OnInit } from '@angular/core';
import { Goal } from '../../model/goal';

@Component({
  selector: 'app-goal-card',
  templateUrl: './goal-card.component.html',
  styleUrls: ['./goal-card.component.scss']
})
export class GoalCardComponent implements OnInit {
  goal: Goal = new Goal('my retirement', 11, 2040, 30000);

  constructor() {}

  ngOnInit() {}
}
