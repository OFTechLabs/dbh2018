import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_ROOT = 'http://ec2-18-194-189-100.eu-central-1.compute.amazonaws.com/bloc/v2.2/';
const address = '60b3b9e6280f851c97b4e76532773d419e7cd51a';

const contract_name = 'DynamicStrategy';
const admin_user = 'Admin';
const admin_pass = 'admin';
const admin_address = '271031f502b654e5380ab4665c75bd7c888b2a0b';

const url = API_ROOT + 'users/' + admin_user + '/' + admin_address + '/contract/' + contract_name + '/' + address + '/call?resolve';

interface Response {
  status: string;
  hash: string;
  data: { contents: any[] };
}

@Injectable()
export class BlockchainHttpService {
  constructor(private http: HttpClient) {}

  public async subscribe(amount: number, goal: number, horizon: number, beta0: number, beta1: number, beta2: number): Promise<string> {
    const req = {
      password: admin_pass,
      method: 'subscribe',
      value: 0,
      args: { beta2: beta2, balance: amount, horizon: horizon, beta0: beta0, beta1: beta1, goal: goal }
    };

    return this.http.post<string>(url, req).toPromise();
  }

  public async settings(address1: string): Promise<UserSetttings> {
    const balanceHistory = <number[]>await this.doApiCall('getBalanceHistory');
    const currentYear = <number>await this.doApiCall('getCurrentYear');

    const userSettings: UserSetttings = {
      referenceAddress: address1,
      balance: balanceHistory[balanceHistory.length - 1],
      balanceHistory: balanceHistory,
      startYear: 2018,
      currentYear: currentYear,
      elapsedYears: 1,
      yearHistory: [],
      goal: 1,
      horizon: 1,
      beta0: 1,
      beta1: 1,
      beta2: 1,
      currentBond: 1,
      currentStock: 1,
      bondHistory: [],
      stockHistory: []
    };

    return userSettings;
  }

  private async doApiCall(methodName: string) {
    const req = this.getRequestJsonForMethod(methodName);
    const val: Response = await this.http.post<Response>(url, req).toPromise();
    return val.data.contents[0];
  }

  private getRequestJsonForMethod(apiMethod: string) {
    return {
      password: 'admin',
      method: apiMethod,
      value: 0,
      args: {
        user: admin_address
      }
    };
  }
}

export interface UserSetttings {
  referenceAddress: string;
  balance: number;
  balanceHistory: number[];
  startYear: number;
  currentYear: number;
  elapsedYears: number;
  yearHistory: number[];
  goal: number;
  horizon: number;
  beta0: number;
  beta1: number;
  beta2: number;
  currentBond: number;
  currentStock: number;
  bondHistory: number[];
  stockHistory: number[];
}
