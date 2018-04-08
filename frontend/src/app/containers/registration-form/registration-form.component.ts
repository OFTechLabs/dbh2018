import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Register } from '../../model/registration.action';
import 'rxjs/add/operator/map';
import { UpdateFormValue } from '@ngxs/form-plugin';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  registrationForm = this.formBuilder.group({
    initialDeposit: 10000,
    annualDeposit: 0,
    targetWealth: 60000,
    targetYear: '2058'
  });

  years: number[] = [];

  constructor(private formBuilder: FormBuilder, private store: Store) {
    for (let i = 2023; i <= 2058; i++) {
      this.years.push(i);
    }
  }

  ngOnInit() {}

  async onSubmit() {
    this.store
      .selectOnce(state => state.registrationstate)
      .map(selected => {
        this.store.dispatch(new Register(selected));
      })
      .subscribe();
  }
}
