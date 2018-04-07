import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-goal-image',
  templateUrl: './goal-image.component.html',
  styleUrls: ['./goal-image.component.scss']
})
export class GoalImageComponent implements OnInit {
  @Input() goalDescription: string;

  goalImages: Map<String, String> = new Map<String, String>();

  constructor() {
    this.goalImages['Car'] = './assets/car-ride.png';
    this.goalImages['Boat'] = './assets/boat-icon.png';
    this.goalImages['Retirement'] = './assets/retirement-icon.png';
    this.goalImages['House'] = './assets/house-icon.png';
  }

  ngOnInit() {}

  getImageUrl() {
    return this.goalImages[this.goalDescription];
  }
}
