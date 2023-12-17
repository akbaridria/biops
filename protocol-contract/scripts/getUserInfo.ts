import { ethers } from "hardhat";
import { BiopsHub__factory } from "../typechain-types";
import datas from '../datas.json';

async function main() {
  const _hub = await ethers.getContractFactory("BiopsHub")
  const hub = BiopsHub__factory.connect(datas.contractAddresses.hub, _hub.runner);
  const d = await hub.getUserFullInfo('0x1cBef56F09317ca4FB110cF3eDdF3Bcc7DeAE6A5');
  console.log(d)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
