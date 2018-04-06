import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeasibilityCardComponent } from './feasibility-card.component';

describe('FeasibilityCardComponent', () => {
  let component: FeasibilityCardComponent;
  let fixture: ComponentFixture<FeasibilityCardComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [FeasibilityCardComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FeasibilityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
