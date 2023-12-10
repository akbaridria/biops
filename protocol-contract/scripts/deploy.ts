import { ethers } from "hardhat";
import datas from '../datas.json';

async function main() {
  // 1. deploy dummyusdt
  const hub = await ethers.deployContract("BiopsHub", [datas.contractAddresses.dummyUSDT, datas.ptyh.contractAddress]);
  await hub.waitForDeployment()
  console.log("success deploy at ", hub.target)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
