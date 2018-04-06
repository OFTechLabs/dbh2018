import { State } from '@ngxs/store';

export class GoalStateModel {
  constructor(private _description?: string, private _targetMonth?: number, private _targetYear?: number, private _targetAmount?: number) {}

  get description(): string {
    return this._description;
  }

  get targetMonth(): number {
    return this._targetMonth;
  }

  get targetYear(): number {
    return this._targetYear;
  }

  get targetAmount(): number {
    return this._targetAmount;
  }
}

@State<GoalStateModel>({
  name: 'goal',
  defaults: new GoalStateModel('', 0, 0, 0)
})
export class GoalState {}
