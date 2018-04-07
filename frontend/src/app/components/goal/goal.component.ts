import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoalComponent implements OnInit {
  @Input() public description: string;

  public targetMonth = 3;

  @Input() public targetYear: number;

  @Input() public targetAmount: number;

  constructor() {}

  ngOnInit() {}

  getMonthName(monthIndex: number) {
    return monthNames[monthIndex];
  }
}
