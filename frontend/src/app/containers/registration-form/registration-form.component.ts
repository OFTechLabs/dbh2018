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

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {}

  onSubmit() {
    console.log(this.registrationForm);
  }
}
