import { createHttpRpcClient } from 'json-rpc2.0-node';

export class BlockchainHttpService {
  public static async call() {
    const client = createHttpRpcClient('http://ec2-18-184-38-165.eu-central-1.compute.amazonaws.com:8545/', { 'Access-Control-Allow-Origin': '*' });
    const res = await client.invoke('eth_getBalance');
    console.log(res);
  }
}
