import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageHoverComponent } from './image-hover.component';

describe('ImageHoverComponent', () => {
  let component: ImageHoverComponent;
  let fixture: ComponentFixture<ImageHoverComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ImageHoverComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageHoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
