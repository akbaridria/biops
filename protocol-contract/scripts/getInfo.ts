import { ethers } from "hardhat";
import { BiopsHub__factory } from "../typechain-types";
import datas from '../datas.json';

async function main() {
  const _hub = await ethers.getContractFactory("BiopsHub")
  const hub = BiopsHub__factory.connect(datas.contractAddresses.hub, _hub.runner);
  const d = await hub.tradeTracker(10)
  console.log(d);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
