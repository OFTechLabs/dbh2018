import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  registrationForm = this.formBuilder.group({
    description: null,
    initialDeposit: null,
    annualDeposit: null,
    targetWealth: null,
    targetYear: null
  });

  years: number[] = [];

  constructor(private formBuilder: FormBuilder) {
    for (let i = 2019; i <= 2058; i++) {
      this.years.push(i);
    }
  }

  ngOnInit() {}

  onSubmit() {}
}
