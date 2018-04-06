import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { GoalStateModel } from '../../model/goal.state';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoalComponent implements OnInit {
  @Input() goal: GoalStateModel;

  constructor() {}

  ngOnInit() {}

  getMonthName(monthIndex: number) {
    return monthNames[monthIndex];
  }
}
