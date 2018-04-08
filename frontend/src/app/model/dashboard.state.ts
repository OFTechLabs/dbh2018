import { Action, State, StateContext, Store } from '@ngxs/store';
import { LoadDashboard, LoadDashboardResults } from './dashboard.actions';
import { BlockchainHttpService, UserSetttings } from '../services/blockchain/blockchain.http.service';
import { DynamicAssetmixOptimizerHttpService } from '../services/dynamic-assetmix-optimizer/dynamic-assetmix-optimizer.http.service';
import { QuantilesResultJson } from '../services/dynamic-assetmix-optimizer/dynamic-assetmix-optimizer.json.model';

export class DasboardUserModel {
  constructor(
    public description: string,
    public initialWealth: number,
    public annualContribution: number,
    public targetWealth: number,
    public balance: number,
    public targetYear: number,
    public equityShare: number,
    public bondsShare: number
  ) {}
}

export class DashboardResultsModel {
  constructor(public feasibility: number, public realization: number[], public simulationGood: number[], public simulationExpected: number[], public simulationBad: number[]) {}
}

export class DashboardModel {
  constructor(public userModel: DasboardUserModel, public results: DashboardResultsModel, public userSettings: UserSetttings, public loading: boolean) {}
}

@State<DashboardModel>({
  name: 'dashboard',
  defaults: new DashboardModel(null, null, null, true)
})
export class DashboardState {
  constructor(private store: Store, private blockchainHttpService: BlockchainHttpService, private dynamicAssetMiOptimizer: DynamicAssetmixOptimizerHttpService) {}

  @Action(LoadDashboard)
  async loadUserModel({ getState, setState }: StateContext<DashboardModel>, action: LoadDashboard) {
    const settings = await this.blockchainHttpService.settings(action.payload.subscriptionId);

    const newUserModel = new DasboardUserModel(
      action.payload.model.description,
      action.payload.model.initialWealth,
      action.payload.model.annualContribution,
      action.payload.model.targetWealth,
      settings.balance,
      settings.horizon,
      settings.stockHistory[0],
      settings.bondHistory[0]
    );
    const currentState = getState();
    const doneLoading = currentState.results !== null;
    const newModel = new DashboardModel(newUserModel, currentState.results, settings, !doneLoading);
    setState(newModel);
    this.store.dispatch(new LoadDashboardResults(action.payload));
  }

  @Action(LoadDashboardResults)
  async loadResultsModel({ getState, setState }: StateContext<DashboardModel>, action: LoadDashboard) {
    const settings = getState().userSettings;
    const quantiles: QuantilesResultJson = await this.dynamicAssetMiOptimizer.getWealthQuantiles(action.payload.model.targetWealth, settings, action.payload.strategy);

    const pointOne = this.getValuesFromquantile(quantiles['0.1']);
    const pointFive = this.getValuesFromquantile(quantiles['0.5']);
    const pointNine = this.getValuesFromquantile(quantiles['0.9']);

    const feasibility = await this.dynamicAssetMiOptimizer.getSuccesProbabilityDynamicStrategy(action.payload.model.targetWealth, settings, action.payload.strategy);
    const newResultsModel = new DashboardResultsModel(
      feasibility.Probablity_terminal_wealth_exceeds_target,
      settings.balanceHistory.map(big => big),
      pointNine,
      pointFive,
      pointOne
    );
    const currentState = getState();
    const doneLoading = currentState.userModel !== null;
    const newModel = new DashboardModel(currentState.userModel, newResultsModel, currentState.userSettings, !doneLoading);
    setState(newModel);
  }

  private getValuesFromquantile(quantiles: { [key: string]: number }): number[] {
    const values: number[] = [];
    for (const key in quantiles) {
      if (quantiles.hasOwnProperty(key)) {
        values.push(quantiles[key]);
      }
    }
    return values;
  }
}
