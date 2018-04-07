import { Action, State, StateContext, Store } from '@ngxs/store';
import { OptimizeAllocationStrategy, Register, SubscribeContract } from './registration.action';
import { BlockchainHttpService } from '../services/blockchain/blockchain.http.service';
import { DynamicAssetmixOptimizerHttpService } from '../services/dynamic-assetmix-optimizer/dynamic-assetmix-optimizer.http.service';
import { DynamicStrategyResponseJson } from '../services/dynamic-assetmix-optimizer/dynamic-assetmix-optimizer.json.model';

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
  constructor(private _model: RegistrationUserModel, private _loadingSmartContract: boolean, private _loadingAssetOptimization: boolean, private _errors: { error: string }[]) {}

  get model(): RegistrationUserModel {
    return this._model;
  }

  get loadingSmartContract(): boolean {
    return this._loadingSmartContract;
  }

  get loadingAssetOptimization(): boolean {
    return this._loadingAssetOptimization;
  }

  get errors(): { error: string }[] {
    return this._errors;
  }
}

@State<RegistrationStateModel>({
  name: 'registration',
  defaults: new RegistrationStateModel(new RegistrationUserModel('', 0, 0, 0, 0), false, false, [])
})
export class RegistrationState {
  constructor(private store: Store, private dynamicAssetmixOptimizerHttpService: DynamicAssetmixOptimizerHttpService) {}

  @Action(Register)
  registerUser({ getState, setState }: StateContext<RegistrationStateModel>, action: Register) {
    const formModel = action.payload.registrationForm.model;
    const newUserModel = new RegistrationUserModel(formModel.description, formModel.initialDeposit, formModel.annualDeposit, formModel.targetWealth, formModel.targetYear);
    setState(new RegistrationStateModel(newUserModel, false, true, []));
    this.store.dispatch(new OptimizeAllocationStrategy());
  }

  @Action(OptimizeAllocationStrategy)
  async optimizeAllocationStrategy({ getState, setState }: StateContext<RegistrationStateModel>) {
    const currentState = getState();
    const result: DynamicStrategyResponseJson = await this.dynamicAssetmixOptimizerHttpService.getDynamicStrategy(currentState);

    setState(new RegistrationStateModel(currentState.model, true, false, []));
    this.store.dispatch(new SubscribeContract(result));
  }

  @Action(SubscribeContract)
  async subscribeToContract({ getState, setState }: StateContext<RegistrationStateModel>, action: SubscribeContract) {
    const currentState = getState();

    const currentYear = new Date().getFullYear();
    const horizon = currentState.model.targetYear - currentYear;
    const dynamicStrategy: DynamicStrategyResponseJson = action.dynamicStrategy;

    await BlockchainHttpService.subscribe(
      currentState.model.initialWealth,
      currentState.model.targetWealth,
      horizon,
      dynamicStrategy.constant,
      dynamicStrategy.wealth,
      dynamicStrategy.t
    );
    setState(new RegistrationStateModel(currentState.model, false, false, []));
  }
}
