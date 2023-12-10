import { ethers, network, run } from "hardhat";
import datas from '../datas.json'

async function main() {
  // 1. verify dummy usdc
  await run("verify:verify", {
    address: datas.contractAddresses.hub,
    constructorArguments: [datas.contractAddresses.dummyUSDT, datas.ptyh.contractAddress]
  })
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
