import { Action, State, StateContext, Store } from '@ngxs/store';
import { BlockchainHttpService } from '../services/blockchain/blockchain.http.service';
import { DynamicAssetmixOptimizerHttpService } from '../services/dynamic-assetmix-optimizer/dynamic-assetmix-optimizer.http.service';
import { DynamicStrategyResponseJson } from '../services/dynamic-assetmix-optimizer/dynamic-assetmix-optimizer.json.model';
import { RegistrationPageStatus } from './registration-page-status.enum';
import { OptimizeAllocationStrategy, Register, SubscribeContract } from './registration.action';

export class RegistrationUserModel {
  constructor(public description: string, public initialWealth: number, public annualContribution: number, public targetWealth: number, public targetYear: number) {}
}

export class RegistrationStateModel {
  constructor(public model: RegistrationUserModel, public registrationPageStatus: RegistrationPageStatus, public errors: { error: string }[]) {}
}

@State<RegistrationStateModel>({
  name: 'registration',
  defaults: new RegistrationStateModel(new RegistrationUserModel('', 0, 0, 0, 0), RegistrationPageStatus.FORM, [])
})
export class RegistrationState {
  constructor(private store: Store, private dynamicAssetmixOptimizerHttpService: DynamicAssetmixOptimizerHttpService, private blockchainHttpService: BlockchainHttpService) {}

  @Action(Register)
  registerUser({ getState, setState }: StateContext<RegistrationStateModel>, action: Register) {
    const formModel = action.payload.registrationForm.model;
    const newUserModel = new RegistrationUserModel(formModel.description, formModel.initialDeposit, formModel.annualDeposit, formModel.targetWealth, formModel.targetYear);
    setState(new RegistrationStateModel(newUserModel, RegistrationPageStatus.CALCULATION_ASSETMIX, []));
    this.store.dispatch(new OptimizeAllocationStrategy());
  }

  @Action(OptimizeAllocationStrategy)
  async optimizeAllocationStrategy({ getState, setState }: StateContext<RegistrationStateModel>) {
    const currentState = getState();
    const result: DynamicStrategyResponseJson = await this.dynamicAssetmixOptimizerHttpService.getDynamicStrategy(currentState);

    setState(new RegistrationStateModel(currentState.model, RegistrationPageStatus.CREATING_CONTRACT, []));
    this.store.dispatch(new SubscribeContract(result));
  }

  @Action(SubscribeContract)
  async subscribeToContract({ getState, setState }: StateContext<RegistrationStateModel>, action: SubscribeContract) {
    const currentState = getState();

    const currentYear = new Date().getFullYear();
    const horizon = currentState.model.targetYear - currentYear;
    const dynamicStrategy: DynamicStrategyResponseJson = action.dynamicStrategy;

    await this.blockchainHttpService.subscribe(
      currentState.model.initialWealth,
      currentState.model.targetWealth,
      horizon,
      dynamicStrategy.constant,
      dynamicStrategy.wealth,
      dynamicStrategy.t
    );
    setState(new RegistrationStateModel(currentState.model, RegistrationPageStatus.CONFIRMATION, []));
  }
}
