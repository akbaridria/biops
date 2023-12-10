import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import '@typechain/hardhat';
import '@nomicfoundation/hardhat-ethers';
import '@nomicfoundation/hardhat-chai-matchers';
import datas from './datas.json';
import 'dotenv/config';

const priv1 = process.env.PRIVATE_KEY as string;
const priv2 = process.env.PRIVATE_KEY2  as string;
const listAccounts = [priv1, priv2];

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    modeTestnet: {
      url: datas.rpc,
      chainId: datas.chainId,
      accounts: listAccounts
    }
  },
  etherscan: {
    apiKey: {
      modeTestnet: 'abc'
    },
    customChains: [
      {
        chainId: datas.chainId,
        network: "modeTestnet",
        urls: {
          apiURL: "https://sepolia.explorer.mode.network/api",
          browserURL: "https://sepolia.mode.network"
        }
      }
    ]
  },
  
};

export default config;
