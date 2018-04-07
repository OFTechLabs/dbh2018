import * as Web3 from 'web3';
import { abiArray } from './abi';
import { Injectable } from '@angular/core';
import BigNumber from 'web3/bower/bignumber.js/bignumber';

@Injectable()
export class BlockchainHttpService {
  private web3: Web3;
  private contract;

  constructor() {}

  async bootstrapWeb3() {
    this.web3 = new Web3(new Web3.providers.HttpProvider('http://ec2-18-184-38-165.eu-central-1.compute.amazonaws.com:8545/'));
    this.contract = this.web3.eth.contract(abiArray).at('0x731a10897d267e19B34503aD902d0A29173Ba4B1');
    this.web3.eth.defaultAccount = '0x00a329c0648769A73afAc7F9381E08FB43dBEA72';
  }

  public async subscribe(amount: number, goal: number, horizon: number, beta0: number, beta1: number, beta2: number): Promise<string> {
    return await this.contract.subscribe(amount, goal, horizon, beta0, beta1, beta2);
  }

  public async settings(address: string): Promise<UserSetttings> {
    return await this.contract.settings(address);
  }
}

export interface UserSetttings {
  referenceAddress: string;
  balance: BigNumber;
  balanceHistory: BigNumber[];
  startYear: BigNumber;
  elapsedYears: BigNumber;
  yearHistory: BigNumber[];
  goal: BigNumber;
  horizon: BigNumber;
  beta0: BigNumber;
  beta1: BigNumber;
  beta2: BigNumber;
  currentBond: BigNumber;
  currentStock: BigNumber;
  bondHistory: BigNumber[];
  stockHistory: BigNumber[];
}
