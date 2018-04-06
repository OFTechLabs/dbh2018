import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-feasibility',
  templateUrl: './feasibility.component.html',
  styleUrls: ['./feasibility.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeasibilityComponent implements OnInit {
  @Input() feasibilityPercentage;

  constructor() {}

  ngOnInit() {}
}
