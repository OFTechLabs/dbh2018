import * as Web3 from 'web3';
import { abiArray } from './abi';

export class BlockchainHttpService {
  public static web3 = new Web3(new Web3.providers.HttpProvider('http://ec2-18-184-38-165.eu-central-1.compute.amazonaws.com:8545/'));
  public static contractInstance = BlockchainHttpService.web3.eth.contract(abiArray).at('0x731a10897d267e19B34503aD902d0A29173Ba4B1');

  public static getContractInstance() {
    if (BlockchainHttpService.web3.eth.defaultAccount === null || BlockchainHttpService.web3.eth.defaultAccount === undefined) {
      BlockchainHttpService.web3.eth.defaultAccount = '0x00a329c0648769A73afAc7F9381E08FB43dBEA72';
    }
    return BlockchainHttpService.contractInstance;
  }

  public static async subscribe(amount: number, goal: number, horizon: number, beta0: number, beta1: number, beta2: number): Promise<boolean> {
    return await BlockchainHttpService.getContractInstance().subscribe([amount, goal, horizon, beta0, beta1, beta2]);
  }

  public static async setcurrenttime(time: number): Promise<boolean> {
    return await BlockchainHttpService.getContractInstance().setcurrenttime([time]);
  }

  public static async users(input: number): Promise<any> {
    return await BlockchainHttpService.getContractInstance().users([input]);
  }

  public static async reallocate(userAddress: string): Promise<boolean> {
    return await BlockchainHttpService.getContractInstance().reallocate([userAddress]);
  }

  public static async totalBalance(): Promise<number> {
    return await BlockchainHttpService.getContractInstance().total_balance();
  }

  public static async settings(address: string): Promise<UserSetttings> {
    return await BlockchainHttpService.getContractInstance().settings([address]);
  }
}

export interface UserSetttings {
  referenceAddress: string;
  balance: number;
  t_start: number;
  goal: number;
  horizon: number;
  beta0: number;
  beta1: number;
  beta2: number;
  fbonds: number;
  fstock: number;
}
