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

  public static async getYear() {
    return await BlockchainHttpService.getContractInstance().getYear([1]);
  }
}
