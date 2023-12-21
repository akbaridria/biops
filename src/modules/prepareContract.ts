import datas from "../../protocol-contract/datas.json";
import {
  DummyUSDT__factory,
  BiopsHub__factory,
  IPyth__factory,
  VDummyUSDTPool__factory,
} from "../../protocol-contract/typechain-types";
import { prepareWriteContract, readContract } from "@wagmi/core";
import { ethers } from "ethers";

const dummyUSDT = DummyUSDT__factory.connect(
  datas.contractAddresses.dummyUSDT,
  new ethers.JsonRpcProvider(datas.rpc)
);
const vdummyusdt = VDummyUSDTPool__factory.connect(
  datas.contractAddresses.vDummyUSDTPool,
  new ethers.JsonRpcProvider(datas.rpc)
);
const hub = BiopsHub__factory.connect(
  datas.contractAddresses.hub,
  new ethers.JsonRpcProvider(datas.rpc)
);

export const prepareFaucet = async (address: `0x${string}`) =>
  await prepareWriteContract({
    address: datas.contractAddresses.dummyUSDT as `0x${string}`,
    abi: DummyUSDT__factory.abi,
    functionName: "faucet",
    args: [address],
  });

export const readBalance = async (address: `0x${string}`) =>
  await readContract({
    address: datas.contractAddresses.dummyUSDT as `0x${string}`,
    abi: DummyUSDT__factory.abi,
    functionName: "balanceOf",
    args: [address],
  });

export const readAllowance = async (
  address: `0x${string}`,
  spender: string = datas.contractAddresses.hub
) =>
  await readContract({
    address: datas.contractAddresses.dummyUSDT as `0x${string}`,
    abi: DummyUSDT__factory.abi,
    functionName: "allowance",
    args: [address, spender as `0x${string}`],
  });

export const readLimit = async () =>
  await readContract({
    address: datas.contractAddresses.hub as `0x${string}`,
    abi: BiopsHub__factory.abi,
    functionName: "getTradeLimit",
  });

export const approveToken = async (
  amount: number,
  spender: string = datas.contractAddresses.hub
) =>
  prepareWriteContract({
    abi: DummyUSDT__factory.abi,
    address: datas.contractAddresses.dummyUSDT as `0x${string}`,
    functionName: "approve",
    args: [spender as `0x${string}`, BigInt(Math.floor(amount * 10 ** 8))],
  });

export const submitTrade = async (
  addr: `0x${string}`,
  amount: string,
  direction: number,
  time: number,
  market: string,
  priceData: `0x${string}`[],
  value: bigint
) =>
  await prepareWriteContract({
    abi: BiopsHub__factory.abi,
    address: datas.contractAddresses.hub as `0x${string}`,
    functionName: "trade",
    args: [
      addr,
      BigInt(Number(amount) * 10 ** 8),
      direction,
      BigInt(time * 60),
      market,
      priceData,
    ],
    value: value,
  });

export const getFeeData = async (priceData: `0x${string}`[]) =>
  await readContract({
    abi: IPyth__factory.abi,
    address: datas.ptyh.contractAddress as `0x${string}`,
    functionName: "getUpdateFee",
    args: [priceData],
  });

export const getUserHistory = async (addr: `0x${string}`) =>
  await readContract({
    abi: BiopsHub__factory.abi,
    address: datas.contractAddresses.hub as `0x${string}`,
    functionName: "getUserFullInfo",
    args: [addr],
  });

export const prepareClaim = async (tradeId: number) =>
  await prepareWriteContract({
    abi: BiopsHub__factory.abi,
    address: datas.contractAddresses.hub as `0x${string}`,
    functionName: "claim",
    args: [BigInt(tradeId)],
  });

export const getTradeTracker = async (tradeId: bigint) =>
  await readContract({
    abi: BiopsHub__factory.abi,
    address: datas.contractAddresses.hub as `0x${string}`,
    functionName: "tradeTracker",
    args: [tradeId],
  });

export const getLiquidity = async () => {
  const balance = await dummyUSDT.balanceOf(
    datas.contractAddresses.vDummyUSDTPool
  );
  console.log(balance);
  return new Intl.NumberFormat("en", { notation: "compact" }).format(
    (Number(balance)) / 10 ** 8
  );
};

export const getActiveTradeVolume = async () => {
  const balance = await dummyUSDT.balanceOf(datas.contractAddresses.hub);
  return new Intl.NumberFormat("en", { notation: "compact" }).format(
    (Number(balance)) / 10 ** 8
  );
};

export const getLatestTradeId = async () => {
  try {
    const hub = BiopsHub__factory.connect(
      datas.contractAddresses.hub,
      new ethers.JsonRpcProvider(datas.rpc)
    );
    const eventFitler = hub.filters.TradeCreated();
    const res = await hub.queryFilter(eventFitler, 7503134, "latest");
    const counter = new Intl.NumberFormat("en", { notation: "compact" }).format(
      Number(res[res.length - 1].args.tradeId) + 1
    );
    return counter;
  } catch (error) {
    return 0;
  }
};

export const getRatioVusdt = async () => {
  const dummyUSDT = DummyUSDT__factory.connect(
    datas.contractAddresses.dummyUSDT,
    new ethers.JsonRpcProvider(datas.rpc)
  );
  const vdummyusdt = VDummyUSDTPool__factory.connect(
    datas.contractAddresses.vDummyUSDTPool,
    new ethers.JsonRpcProvider(datas.rpc)
  );
  const balanceDusdt = await dummyUSDT.balanceOf(
    datas.contractAddresses.vDummyUSDTPool
  );
  const totalSupply = await vdummyusdt.totalSupply();
  return {
    balanceDusdt,
    totalSupply,
  };
};

export const readBalanceVdusdt = (addr: `0x${string}`) =>
  readContract({
    abi: VDummyUSDTPool__factory.abi,
    address: datas.contractAddresses.vDummyUSDTPool as `0x${string}`,
    functionName: "balanceOf",
    args: [addr],
  });

export const readAllowanceVdusdt = async (address: `0x${string}`) =>
  await readContract({
    address: datas.contractAddresses.vDummyUSDTPool as `0x${string}`,
    abi: VDummyUSDTPool__factory.abi,
    functionName: "allowance",
    args: [address, address],
  });

export const approveTokenVdusdt = async (amount: number, addr: `0x${string}`) =>
  prepareWriteContract({
    abi: VDummyUSDTPool__factory.abi,
    address: datas.contractAddresses.vDummyUSDTPool as `0x${string}`,
    functionName: "approve",
    args: [addr, BigInt(Math.floor(amount * 10 ** 8))],
  });

export const deposit = async (amount: number) =>
  prepareWriteContract({
    abi: VDummyUSDTPool__factory.abi,
    address: datas.contractAddresses.vDummyUSDTPool as `0x${string}`,
    functionName: "deposit",
    args: [BigInt(Math.floor(amount * 10 ** 8))],
  });

export const withdraw = async (amount: number) =>
  prepareWriteContract({
    abi: VDummyUSDTPool__factory.abi,
    address: datas.contractAddresses.vDummyUSDTPool as `0x${string}`,
    functionName: "withdraw",
    args: [BigInt(Math.floor(amount * 10 ** 8))],
  });
