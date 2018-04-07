import * as Web3 from 'web3';
import { abiArray } from './abi';

export class BlockchainHttpService {
  public static web3 = new Web3(new Web3.providers.HttpProvider('http://ec2-18-184-38-165.eu-central-1.compute.amazonaws.com:8545/'));
  public static contractInstance = BlockchainHttpService.web3.eth.contract(abiArray).at('0x731a10897d267e19B34503aD902d0A29173Ba4B1');

  public static getContractInstance() {
    if (BlockchainHttpService.web3.eth.defaultAccount === null || BlockchainHttpService.web3.eth.defaultAccount === undefined) {
      BlockchainHttpService.web3.eth.defaultAccount = '0x731a10897d267e19B34503aD902d0A29173Ba4B1';
    }
    return BlockchainHttpService.contractInstance;
  }

  public static async showContractWords() {
    const subscribed = await BlockchainHttpService.defaultSubscribe();
    console.log(subscribed);
    const address = await BlockchainHttpService.users(0);
    console.log(address);
    const settings = await BlockchainHttpService.settings(address);
    console.log(settings);
  }

  public static async defaultSubscribe() {
    BlockchainHttpService.subscribe(10000, 20000, 20, 0, 500000000, 0);
  }

  public static async subscribe(amount: number, goal: number, horizon: number, beta0: number, beta1: number, beta2: number): Promise<boolean> {
    return await BlockchainHttpService.getContractInstance().subscribe(amount, goal, horizon, beta0, beta1, beta2);
  }

  public static async setcurrenttime(year: number): Promise<boolean> {
    return await BlockchainHttpService.getContractInstance().setcurrenttime(year);
  }

  public static async users(input: number): Promise<any> {
    return await BlockchainHttpService.getContractInstance().users(input);
  }

  public static async update(): Promise<boolean> {
    return await BlockchainHttpService.getContractInstance().update();
  }

  public static async totalBalance(): Promise<number> {
    return await BlockchainHttpService.getContractInstance().total_balance();
  }

  public static async settings(address: string): Promise<UserSetttings> {
    return await BlockchainHttpService.getContractInstance().settings(address);
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
