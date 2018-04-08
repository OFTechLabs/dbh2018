import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Input() description: string;

  @Input() imageUrl: string;

  @Input() width: number;

  constructor() {}

  ngOnInit() {}
}
