import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentCapitalComponent } from './current-capital.component';

describe('CurrentCapitalComponent', () => {
  let component: CurrentCapitalComponent;
  let fixture: ComponentFixture<CurrentCapitalComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [CurrentCapitalComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentCapitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
