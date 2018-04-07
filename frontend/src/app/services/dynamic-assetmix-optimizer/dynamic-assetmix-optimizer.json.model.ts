export interface CoefficientJson {
  constant: number;
  coeff_wealth: number;
  coeff_t: number;
}

export interface QuantilesJson {
  quantiles: number[];
}

export interface DynamicStrategyRequestJson {
  initial_wealth: number;
  periodic_cashflow: number;
  wealth_target: number;
  investment_horizon: number;
}

export interface TerminalWealthRequestJson extends DynamicStrategyRequestJson, CoefficientJson {}

export interface WealthQuantilesRequestJson extends TerminalWealthRequestJson, QuantilesJson {}
