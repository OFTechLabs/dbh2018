import { State } from '@ngxs/store';

export interface RegistrationFormStateModel {
  registrationForm: {
    model: {
      description: string;
      initialDeposit: number;
      annualDeposit: number;
      targetWealth: number;
      targetYear: number;
    };
    dirty: boolean;
    status: string;
    errors: {};
  };
}

@State<RegistrationFormStateModel>({
  name: 'registrationstate',
  defaults: {
    registrationForm: {
      model: undefined,
      dirty: false,
      status: '',
      errors: {}
    }
  }
})
export class RegistrationFormState {}
