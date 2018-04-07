import { RegistrationFormStateModel } from '../containers/registration-form/registration-form.state';
import { DynamicStrategyResponseJson } from '../services/dynamic-assetmix-optimizer/dynamic-assetmix-optimizer.json.model';

export class Register {
  static readonly type = '[Registration] Register action';

  constructor(public payload: RegistrationFormStateModel) {}
}

export class SubscribeContract {
  static readonly type = '[Registration] Subscribe to Contract action';

  constructor(public dynamicStrategy: DynamicStrategyResponseJson) {}
}

export class OptimizeAllocationStrategy {
  static readonly type = '[Registration] Optimize allocation strategy';

  constructor() {}
}

export class CancelConfirmation {
  static readonly type = '[Registration] Cancel confirmation';

  constructor() {}
}
