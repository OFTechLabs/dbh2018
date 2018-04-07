import { Action, State, StateContext } from '@ngxs/store';
import { RegisterAction, SubscribeContractAction } from './registration.action';
import { Store } from '@ngxs/store';
import { BlockchainHttpService } from '../services/blockchain/blockchain.http.service';

export class RegistrationUserModel {
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

export class RegistrationStateModel {
  constructor(private _model: RegistrationUserModel, private _loading: boolean, private _errors: { error: string }[]) {}

  get model(): RegistrationUserModel {
    return this._model;
  }

  get loading(): boolean {
    return this._loading;
  }

  get errors(): { error: string }[] {
    return this._errors;
  }
}

@State<RegistrationStateModel>({
  name: 'registration',
  defaults: new RegistrationStateModel(new RegistrationUserModel('', 0, 0, 0, 0), false, [])
})
export class RegistrationState {
  constructor(private store: Store) {}

  @Action(RegisterAction)
  registerUser({ getState, setState }: StateContext<RegistrationStateModel>, action: RegisterAction) {
    const formModel = action.payload.registrationForm.model;
    const newUserModel = new RegistrationUserModel(formModel.description, formModel.initialDeposit, formModel.annualDeposit, formModel.targetWealth, formModel.targetYear);
    setState(new RegistrationStateModel(newUserModel, true, []));
    this.store.dispatch(new SubscribeContractAction());
  }

  @Action(SubscribeContractAction)
  async subscribeToContract({ getState, setState }: StateContext<RegistrationStateModel>, action: SubscribeContractAction) {
    const currentState = getState();

    const currentYear = new Date().getFullYear();
    const horizon = currentState.model.targetYear - currentYear;
    await BlockchainHttpService.subscribe(currentState.model.initialWealth, currentState.model.targetWealth, horizon, 0, 50000000, 0);
    setState(new RegistrationStateModel(currentState.model, false, []));
  }
}
