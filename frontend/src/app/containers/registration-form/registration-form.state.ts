import { State } from '@ngxs/store';

export interface RegistrationFormStateModel {
  registrationForm: {
    model: {
      initialDeposit: number;
      annualDeposit: number;
      targetWealth: number;
      targetYear: string;
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
      model: {
        initialDeposit: 10000,
        annualDeposit: 0,
        targetWealth: 60000,
        targetYear: '2058'
      },
      dirty: false,
      status: '',
      errors: {}
    }
  }
})
export class RegistrationFormState {}
