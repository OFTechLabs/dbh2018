import { State } from '@ngxs/store';

@State({
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
