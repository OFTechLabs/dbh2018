import { State } from '@ngxs/store';

@State<Registration>({
  name: 'registration',
  defaults: new Registration(0, 0, 0)
})
export class Registration {
  constructor(private _initialWealth: number, private _annualContribution: number, private _targetWealth: number) {}

  get initialWealth(): number {
    return this._initialWealth;
  }

  get annualContribution(): number {
    return this._annualContribution;
  }

  get targetWealth(): number {
    return this._targetWealth;
  }
}
