import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistrationStateModel } from '../../model/registration.state';
import {
  DynamicStrategyRequestJson,
  DynamicStrategyResponseJson,
  ProbabilityResponseJson,
  QuantilesResultJson,
  TerminalWealthResponseJson,
  WealthQuantilesRequestJson
} from './dynamic-assetmix-optimizer.json.model';
import { UserSetttings } from '../blockchain/blockchain.http.service';

const API_ROOT = 'http://ec2-35-156-214-22.eu-central-1.compute.amazonaws.com:5000/api';
const QUANTILES = [0.1, 0.5, 0.9];

@Injectable()
export class DynamicAssetmixOptimizerHttpService {
  constructor(private http: HttpClient) {}

  async getDynamicStrategy(registration: RegistrationStateModel): Promise<DynamicStrategyResponseJson> {
    const currentYear = new Date().getFullYear();
    const horizon = registration.model.targetYear - currentYear;

    const requestJson: DynamicStrategyRequestJson = {
      initial_wealth: registration.model.initialWealth,
      wealth_target: registration.model.targetWealth,
      periodic_cashflow: registration.model.annualContribution,
      investment_horizon: horizon
    };

    return this.http.post<DynamicStrategyResponseJson>(API_ROOT + '/get_dynamic_strategy', requestJson).toPromise();
  }

  async getTerminalWealth(userSettings: UserSetttings): Promise<TerminalWealthResponseJson> {
    const requestJson = this.createTerminalWealthRequest(userSettings);

    return this.http.post<TerminalWealthResponseJson>(API_ROOT + '/get_terminal_wealth', requestJson).toPromise();
  }

  async getSuccesProbabilityDynamicStrategy(userSettings: UserSetttings): Promise<ProbabilityResponseJson> {
    const requestJson = this.createTerminalWealthRequest(userSettings);

    return this.http.post<ProbabilityResponseJson>(API_ROOT + '/get_succes_probability_dynamic_strategy', requestJson).toPromise();
  }

  async getWealthQuantiles(userSettings: UserSetttings): Promise<QuantilesResultJson> {
    const requestJson: WealthQuantilesRequestJson = {
      initial_wealth: userSettings.balance,
      wealth_target: userSettings.goal,
      periodic_cashflow: 100, // todo
      investment_horizon: userSettings.horizon,
      constant: userSettings.beta0,
      coeff_wealth: userSettings.beta1,
      coeff_t: userSettings.beta2,
      quantiles: QUANTILES
    };

    return this.http.post<QuantilesResultJson>(API_ROOT + '/get_wealth_quantiles_dynamic_strategy', requestJson).toPromise();
  }

  private createTerminalWealthRequest(userSettings: UserSetttings) {
    return {
      initial_wealth: userSettings.balance,
      wealth_target: userSettings.goal,
      periodic_cashflow: 100, // todo
      investment_horizon: userSettings.horizon,
      constant: userSettings.beta0,
      coeff_wealth: userSettings.beta1,
      coeff_t: userSettings.beta2
    };
  }
}
