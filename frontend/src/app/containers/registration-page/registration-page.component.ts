import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';
import { RegistrationPageStatus } from '../../model/registration-page-status.enum';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  @Select(state => state.registration._registrationPageStatus)
  status$: Observable<RegistrationPageStatus>;

  registationPageStatusses = RegistrationPageStatus;

  ngOnInit() {}
}
