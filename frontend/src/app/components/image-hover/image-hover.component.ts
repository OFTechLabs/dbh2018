import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-hover',
  templateUrl: './image-hover.component.html',
  styleUrls: ['./image-hover.component.scss']
})
export class ImageHoverComponent implements OnInit {
  @Input() imageUrl: string;

  @Input() imageUrlHover: string;

  constructor() {}

  ngOnInit() {}
}
