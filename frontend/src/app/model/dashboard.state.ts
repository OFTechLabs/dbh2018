import { Action, State, StateContext } from '@ngxs/store';
import { LoadDashboard } from './dashboard.actions';
import { BlockchainHttpService } from '../services/blockchain/blockchain.http.service';
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
  constructor(public userModel: DasboardUserModel, public results: DashboardResultsModel, public loading: boolean) {}
}

@State<DashboardModel>({
  name: 'dashboard',
  defaults: new DashboardModel(null, null, true)
})
export class DashboardState {
  constructor(private blockchainHttpService: BlockchainHttpService, private dynamicAssetMiOptimizer: DynamicAssetmixOptimizerHttpService) {}

  @Action(LoadDashboard)
  async loadUserModel({ getState, setState }: StateContext<DashboardModel>, action: LoadDashboard) {
    const currentState = getState();
    const address = await this.blockchainHttpService.users(1);
    console.log(address);
    const settings = await this.blockchainHttpService.settings(1);
    console.log(settings);

    const newUserModel = new DasboardUserModel('', 0, 0, settings.goal, settings.balance, settings.horizon, settings.fstock, settings.fbonds);
    const doneLoading = currentState.results !== null;
    const newModel = new DashboardModel(newUserModel, currentState.results, doneLoading);
    setState(newModel);
  }

  @Action(LoadDashboard)
  async loadResultsModel({ getState, setState }: StateContext<DashboardModel>, action: LoadDashboard) {
    const currentState = getState();

    const settings = await this.blockchainHttpService.settings(1);
    const quantiles: QuantilesResultJson = await this.dynamicAssetMiOptimizer.getWealthQuantiles(settings);

    const pointOne = this.getValuesFromquantile(quantiles['0.10']);
    const pointFive = this.getValuesFromquantile(quantiles['0.50']);
    const pointNine = this.getValuesFromquantile(quantiles['0.90']);

    const newResultsModel = new DashboardResultsModel(0, [], pointNine, pointFive, pointOne);
    const doneLoading = currentState.userModel !== null;
    const newModel = new DashboardModel(currentState.userModel, newResultsModel, doneLoading);
    setState(newModel);
  }

  private getValuesFromquantile(quantiles: { [key: string]: number }): number[] {
    const values: number[] = [];
    for (const key in Object.keys(quantiles)) {
      if (quantiles.hasOwnProperty(key)) {
        values.push(quantiles[key]);
      }
    }
    return values;
  }
}
