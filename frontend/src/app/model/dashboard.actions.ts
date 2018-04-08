import { RegistrationStateModel } from './registration.state';

export class LoadDashboard {
  static readonly type = '[Dashboard] load dashboard';

  constructor(public payload: RegistrationStateModel) {}
}

export class LoadDashboardResults {
  static readonly type = '[Dashboard] load dashboard results';

  constructor(public payload: RegistrationStateModel) {}
}
