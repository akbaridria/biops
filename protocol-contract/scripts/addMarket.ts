import { ethers } from "hardhat";
import { BiopsHub__factory } from "../typechain-types";
import datas from '../datas.json';

async function main() {
  const _hub = await ethers.getContractFactory("BiopsHub")
  const hub = BiopsHub__factory.connect(datas.contractAddresses.hub, _hub.runner);
  const dataMarkets = datas.ptyh.priceFeedIds
  for(let i = 0; i < dataMarkets.length; i++) {
    const tx = await hub.addMarket(dataMarkets[i].name, dataMarkets[i].priceId)
    await tx.wait()
    console.log(tx.hash);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
