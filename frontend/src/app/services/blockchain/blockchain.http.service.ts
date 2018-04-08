import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BILLION_FRACTION = 1000000000;
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

  private static getRequestJsonForMethod(apiMethod: string) {
    return {
      password: 'admin',
      method: apiMethod,
      value: 0,
      args: {
        user: admin_address
      }
    };
  }

  public async subscribe(amount: number, goal: number, horizon: number, beta0: number, beta1: number, beta2: number): Promise<string> {
    const req = {
      password: admin_pass,
      method: 'subscribe',
      value: 0,
      args: { beta2: beta2, balance: amount, horizon: horizon, beta0: beta0, beta1: beta1, goal: goal }
    };

    return this.http
      .post<string>(url, req, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .toPromise();
  }

  public async settings(address1: string): Promise<UserSetttings> {
    const balanceHistory = <number[]>await this.doApiCallReturnFirstResult('getBalanceHistory');
    const currentYear = <number>await this.doApiCallReturnFirstResult('getCurrentYear');
    const yearHistory = <number[]>await this.doApiCallReturnFirstResult('getYearHistory');
    let stockHistory = <number[]>await this.doApiCallReturnFirstResult('getStockHistory');
    let bondHistory = <number[]>await this.doApiCallReturnFirstResult('getBondHistory');
    const userAllocationInStock = <number>await this.doApiCallReturnFirstResult('getUserAllocation') / BILLION_FRACTION;

    const userAllocation = <number[]>await this.doApiCallReturnArray('getUserAllocation');

    stockHistory = stockHistory.map(val => val / BILLION_FRACTION);
    bondHistory = bondHistory.map(val => val / BILLION_FRACTION);

    return {
      referenceAddress: address1,
      balance: userAllocation[0],
      balanceHistory: balanceHistory,
      startYear: userAllocation[2],
      currentYear: currentYear,
      elapsedYears: userAllocation[3],
      yearHistory: yearHistory,
      goal: userAllocation[1],
      horizon: userAllocation[4],
      beta0: 1,
      beta1: 1,
      beta2: 1,
      currentBond: 1 - userAllocationInStock,
      currentStock: userAllocationInStock,
      bondHistory: bondHistory,
      stockHistory: stockHistory
    };
  }

  private async doApiCallReturnFirstResult(methodName: string) {
    const req = BlockchainHttpService.getRequestJsonForMethod(methodName);
    const val: Response = await this.http
      .post<Response>(url, req, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .toPromise();
    return val.data.contents[0];
  }

  private async doApiCallReturnArray(methodName: string) {
    const req = BlockchainHttpService.getRequestJsonForMethod(methodName);
    const val: Response = await this.http.post<Response>(url, req).toPromise();
    return val.data.contents;
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
