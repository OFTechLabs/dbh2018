import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-capital',
  templateUrl: './current-capital.component.html',
  styleUrls: ['./current-capital.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentCapitalComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
