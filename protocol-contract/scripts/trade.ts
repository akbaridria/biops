import { ethers } from "hardhat";
import { BiopsHub__factory, DummyUSDT__factory, IPyth__factory } from "../typechain-types";
import datas from '../datas.json';
import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js';
import { pyth } from "../typechain-types/contracts";

async function main() {
  const connection = new EvmPriceServiceConnection("https://hermes.pyth.network");
  const _hub = await ethers.getContractFactory("BiopsHub")
  const hub = BiopsHub__factory.connect(datas.contractAddresses.hub, _hub.runner);
  const _dusdt = await ethers.getContractFactory("DummyUSDT")
  const dusdt = DummyUSDT__factory.connect(datas.contractAddresses.dummyUSDT, _dusdt.runner);
  const txApprove = await dusdt.approve(datas.contractAddresses.hub, BigInt(5 * 10 ** 6));
  await txApprove.wait()
  console.log("done approve")
  const feedData = datas.ptyh.priceFeedIds[0]
  const priceData = await connection.getPriceFeedsUpdateData([feedData.priceId]);
  const pyth = IPyth__factory.connect(datas.ptyh.contractAddress, new ethers.JsonRpcProvider(datas.rpc));
  const fee = await pyth.getUpdateFee(priceData)
  const tx = await hub.trade('0x694aCF4DFb7601F92A0D2a41cdEC5bf7726C7294', BigInt(5 * 10 ** 6), BigInt(0), BigInt(300), feedData.name, priceData, {
    value: fee
  })
  console.log("done")
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
