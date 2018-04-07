import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BlockchainHttpService } from '../../blockchain/blockchain.http.service';

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

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {}

  onSubmit() {}
}
