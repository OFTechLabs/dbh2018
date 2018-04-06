import { State } from '@ngxs/store';

export class RegistrationStateModel {
  constructor(private _initialWealth: number, private _annualContribution: number, private _targetWealth: number) {}

  get initialWealth(): number {
    return this._initialWealth;
  }

  get annualContribution(): number {
    return this._annualContribution;
  }

  get targetWealth(): number {
    return this._targetWealth;
  }
}

@State<RegistrationStateModel>({
  name: 'registration',
  defaults: new RegistrationStateModel(0, 0, 0)
})
export class RegistrationState {}
