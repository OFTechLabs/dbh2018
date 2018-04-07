import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { RegistrationState, RegistrationStateModel } from '../../model/registration.state';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  @Select(RegistrationState) registration$: Observable<RegistrationStateModel>;

  ngOnInit() {}
}
