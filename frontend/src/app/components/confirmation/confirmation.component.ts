import { Component, Input, OnInit } from '@angular/core';
import { RegistrationStateModel } from '../../model/registration.state';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  @Input() registrationState: RegistrationStateModel;

  constructor() {}

  ngOnInit() {}
}
