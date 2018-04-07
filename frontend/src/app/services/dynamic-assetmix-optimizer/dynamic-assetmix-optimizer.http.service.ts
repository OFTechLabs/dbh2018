import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistrationStateModel } from '../../model/registration.state';
import { CoefficientJson, DynamicStrategyRequestJson, TerminalWealthRequestJson, WealthQuantilesRequestJson } from './dynamic-assetmix-optimizer.json.model';
import { UserSetttings } from '../blockchain/blockchain.http.service';

const API_ROOT = 'http://ec2-35-156-214-22.eu-central-1.compute.amazonaws.com';

@Injectable()
export class DynamicAssetmixOptimizerHttpService {
  constructor(private http: HttpClient) {}

  async getDynamicStrategy(registration: RegistrationStateModel): Promise<CoefficientJson> {
    const requestJson: DynamicStrategyRequestJson = {
      initial_wealth: registration.initialWealth,
      wealth_target: registration.targetWealth,
      periodic_cashflow: registration.annualContribution,
      investment_horizon: 40 // todo
    };

    return this.http.post<CoefficientJson>(API_ROOT + '/get_dynamic_strategy', requestJson).toPromise();
  }

  // todo return type?
  async getTerminalWealth(userSettings: UserSetttings): Promise<any> {
    const requestJson: TerminalWealthRequestJson = {
      initial_wealth: userSettings.balance,
      wealth_target: userSettings.goal,
      periodic_cashflow: 100, // todo
      investment_horizon: userSettings.horizon,
      constant: userSettings.beta0,
      coeff_wealth: userSettings.beta1,
      coeff_t: userSettings.beta2
    };

    return this.http.post<any>(API_ROOT + '/get_terminal_wealth', requestJson).toPromise();
  }

  // todo return type?
  async getWealthQuantiles(userSettings: UserSetttings): Promise<any> {
    const requestJson: WealthQuantilesRequestJson = {
      initial_wealth: userSettings.balance,
      wealth_target: userSettings.goal,
      periodic_cashflow: 100, // todo
      investment_horizon: userSettings.horizon,
      constant: userSettings.beta0,
      coeff_wealth: userSettings.beta1,
      coeff_t: userSettings.beta2,
      quantiles: [10, 50, 90]
    };

    return this.http.post<any>(API_ROOT + '/get_wealth_quantiles', requestJson).toPromise();
  }
}
