import * as Web3 from 'web3';
import { abiArray } from './abi';

export class BlockchainHttpService {
  public static provider = new Web3.providers.HttpProvider('http://ec2-18-184-38-165.eu-central-1.compute.amazonaws.com:8545/');
  public static web3 = new Web3(BlockchainHttpService.provider);

  public static contractInstance = BlockchainHttpService.web3.eth.contract(abiArray).at('0x731a10897d267e19B34503aD902d0A29173Ba4B1');

  public static async getYear() {
    BlockchainHttpService.web3.eth.defaultAccount = '4d5db4107d237df6a3d58ee5f70ae63d73d7658d4026f2eefd2f204c81682cb7';
    return BlockchainHttpService.contractInstance.getYear();
  }
}
