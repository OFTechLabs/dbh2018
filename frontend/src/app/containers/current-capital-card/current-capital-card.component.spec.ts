import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentCapitalCardComponent } from './current-capital-card.component';

describe('CurrentCapitalCardComponent', () => {
  let component: CurrentCapitalCardComponent;
  let fixture: ComponentFixture<CurrentCapitalCardComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [CurrentCapitalCardComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentCapitalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
