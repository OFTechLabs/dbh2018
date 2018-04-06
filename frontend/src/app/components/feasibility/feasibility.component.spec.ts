import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeasibilityComponent } from './feasibility.component';

describe('FeasibilityComponent', () => {
  let component: FeasibilityComponent;
  let fixture: ComponentFixture<FeasibilityComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [FeasibilityComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FeasibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
