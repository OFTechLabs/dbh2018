import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';
import { RegistrationPageStatus } from '../../model/registration-page-status.enum';
import { RegistrationState, RegistrationStateModel } from '../../model/registration.state';
import { CancelConfirmation, SelectGoal } from '../../model/registration.action';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  @Select(RegistrationState) registrationState$: Observable<RegistrationStateModel>;

  @Select(state => state.registration.registrationPageStatus)
  status$: Observable<RegistrationPageStatus>;

  registationPageStatusses = RegistrationPageStatus;

  constructor(private store: Store) {}

  ngOnInit() {}

  cancel() {
    this.store.dispatch(new CancelConfirmation());
  }

  selectGoal(goalDescription: string) {
    this.store.dispatch(new SelectGoal(goalDescription));
  }
}
