import { ethers } from "hardhat";
import { BiopsHub__factory } from "../typechain-types";
import datas from '../datas.json';

async function main() {
  const _hub = await ethers.getContractFactory("BiopsHub")
  const hub = BiopsHub__factory.connect(datas.contractAddresses.hub, _hub.runner);
  const tx = await hub.addMarket(datas.ptyh.priceFeedIds[0].name, datas.ptyh.priceFeedIds[0].priceId)
  await tx.wait()
  console.log(tx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
