import * as Web3 from 'web3';
import { abiArray } from './abi';
import { Injectable } from '@angular/core';
import BigNumber from 'web3/bower/bignumber.js/bignumber';

@Injectable()
export class BlockchainHttpService {
  public web3: Web3;
  public contract;

  constructor() {}

  async bootstrapWeb3() {
    this.web3 = new Web3(new Web3.providers.HttpProvider('http://ec2-18-184-38-165.eu-central-1.compute.amazonaws.com:8545/'));
    this.contract = this.web3.eth.contract(abiArray).at('0x731a10897d267e19B34503aD902d0A29173Ba4B1');
    this.web3.eth.defaultAccount = '0x00a329c0648769A73afAc7F9381E08FB43dBEA72';
  }

  public async subscribe(amount: number, goal: number, horizon: number, beta0: number, beta1: number, beta2: number): Promise<boolean> {
    return await this.contract.subscribe(amount, goal, horizon, beta0, beta1, beta2);
  }

  public async setcurrenttime(year: number): Promise<boolean> {
    return await this.contract.setcurrenttime(year);
  }

  public async users(input: number): Promise<any> {
    return await this.contract.users(input);
  }

  public async update(): Promise<boolean> {
    return await this.contract.update();
  }

  public async totalBalance(): Promise<number> {
    return await this.contract.total_balance();
  }

  public async settings(address: number): Promise<UserSetttings> {
    return await this.contract.settings(address);
  }
}

export interface UserSetttings {
  referenceAddress: string;
  balance: BigNumber;
  t_start: BigNumber;
  goal: BigNumber;
  horizon: BigNumber;
  beta0: BigNumber;
  beta1: BigNumber;
  beta2: BigNumber;
  fbonds: BigNumber;
  fstock: BigNumber;
}
