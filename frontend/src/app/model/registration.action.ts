import { RegistrationFormStateModel } from '../containers/registration-form/registration-form.state';

export class RegisterAction {
  static readonly type = '[Registration] Register action';

  constructor(public payload: RegistrationFormStateModel) {}
}

export class SubscribeContractAction {
  static readonly type = '[Registration] Subscribe to Contract action';

  constructor() {}
}
