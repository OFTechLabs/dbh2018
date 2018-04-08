import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalImageComponent } from './goal-image.component';

describe('GoalImageComponent', () => {
  let component: GoalImageComponent;
  let fixture: ComponentFixture<GoalImageComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [GoalImageComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
