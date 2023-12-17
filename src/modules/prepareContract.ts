import datas from '../../protocol-contract/datas.json'
import { DummyUSDT__factory, BiopsHub__factory, IPyth__factory } from '../../protocol-contract/typechain-types'
import { prepareWriteContract, readContract } from '@wagmi/core'

export const prepareFaucet = async (address: `0x${string}`) => await prepareWriteContract({
  address: datas.contractAddresses.dummyUSDT as `0x${string}`,
  abi: DummyUSDT__factory.abi,
  functionName: 'faucet',
  args: [address]
})

export const readBalance = async (address: `0x${string}`) => await readContract({
  address: datas.contractAddresses.dummyUSDT as `0x${string}`,
  abi: DummyUSDT__factory.abi,
  functionName: 'balanceOf',
  args: [address]
})

export const readAllowance = async (address: `0x${string}`) => await readContract({
  address: datas.contractAddresses.dummyUSDT as `0x${string}`,
  abi: DummyUSDT__factory.abi,
  functionName: 'allowance',
  args: [address, datas.contractAddresses.hub as `0x${string}`]
})

export const readLimit = async () => await readContract({
  address: datas.contractAddresses.hub as `0x${string}`,
  abi: BiopsHub__factory.abi,
  functionName: 'getTradeLimit'
})

export const approveToken = async (amount: number) => prepareWriteContract({
  abi: DummyUSDT__factory.abi,
  address: datas.contractAddresses.dummyUSDT as `0x${string}`,
  functionName: 'approve',
  args: [datas.contractAddresses.hub as `0x${string}`, BigInt(amount * (10 ** 8))]
})

export const submitTrade = async (addr: `0x${string}`, amount: string, direction: number, time: number, market: string, priceData: `0x${string}`[], value: bigint) => await prepareWriteContract({
  abi: BiopsHub__factory.abi,
  address: datas.contractAddresses.hub as `0x${string}`,
  functionName: "trade",
  args: [addr, BigInt(Number(amount) * (10 ** 8)), direction, BigInt(time * 60), market, priceData],
  value: value
})

export const getFeeData = async (priceData: `0x${string}`[]) => await readContract({
  abi: IPyth__factory.abi,
  address: datas.ptyh.contractAddress as `0x${string}`,
  functionName: 'getUpdateFee',
  args: [priceData]
})

export const getUserHistory = async (addr: `0x${string}`) => await readContract({
  abi: BiopsHub__factory.abi,
  address: datas.contractAddresses.hub as `0x${string}`,
  functionName: 'getUserFullInfo',
  args: [addr]
})