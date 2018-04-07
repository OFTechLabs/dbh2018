import { Action, State, StateContext } from '@ngxs/store';
import { RegisterAction } from './registration.action';

export class RegistrationStateModel {
  constructor(private _description: string, private _initialWealth: number, private _annualContribution: number, private _targetWealth: number, private _targetYear: number) {}

  get initialWealth(): number {
    return this._initialWealth;
  }

  get annualContribution(): number {
    return this._annualContribution;
  }

  get targetWealth(): number {
    return this._targetWealth;
  }

  get description(): string {
    return this._description;
  }

  get targetYear(): number {
    return this._targetYear;
  }
}

@State<RegistrationStateModel>({
  name: 'registration',
  defaults: new RegistrationStateModel('', 0, 0, 0, 0)
})
export class RegistrationState {
  @Action(RegisterAction)
  feedAnimals({ getState, setState }: StateContext<RegistrationStateModel>, action: RegisterAction) {
    const formModel = action.payload.registrationForm.model;
    setState(new RegistrationStateModel(formModel.description, formModel.initialDeposit, formModel.annualDeposit, formModel.targetWealth, formModel.targetYear));
  }
}
