'use client'

import { Refresh } from "@/components/Icons";
import { formatCurrency } from "@/helper";
import { getUserHistory } from "@/modules/prepareContract";
import { IPosition, IUserStat } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { useAccount, useNetwork } from "wagmi";

export const TradeStat = () => {
  const [loading, setLoading] = useState(false)
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()

  const [dataStat, setDataStat] = useState<IUserStat>({
    profit: 0,
    totalLose: 0,
    totalTrade: 0,
    totalWin: 0,
    totalActiveTrade: 0,
    winRate: 0
  })

  const getHistory = useCallback(async (addr: `0x${string}`) => {
    try {
      if (!!address) {
        setLoading(true)
        const res = await getUserHistory(addr)
        const cleanData = res.filter((item) => item.status !== 0)
        setDataStat({
          profit: calculateProfit(cleanData),
          totalTrade: res.length,
          totalLose: cleanData.filter((item) => item.status === 1).length,
          totalWin: cleanData.filter((item) => item.status === 2 || item.status === 3).length,
          totalActiveTrade: res.filter((item) => item.status === 0).length,
          winRate: (cleanData.filter((item) => item.status === 2 || item.status === 3).length / (res.length - cleanData.length)) * 100
        })
        setLoading(false)
      }
    } catch (error) {

    }
  }, [address])

  useEffect(() => {
    if (!!address) {
      getHistory(address)
    }
  }, [address])

  const calculateProfit = (data: IPosition[]) => {
    return data.reduce((accumulator, item) => item.status === 1 ? accumulator + -Number(item.amount) / (10 ** 8) : accumulator + Number(item.amount) / (10 ** 8), 0)
  }


  return (
    <div className="bg-neutral rounded-box p-4 mt-4">
      <div className="grid grid-cols-1 gap-2">
        <div className="mb-2">
          <div className="flex items-center justify-between">
            <div>Your Trading Stats</div>
            <button className="btn btn-xs btn-ghost btn-circle" onClick={() => !!address ?  getHistory(address) : null}>
              <Refresh customClass={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
        {
          (!loading && isConnected && !chain?.unsupported ) &&
          <>
          <div className="flex items-center justify-between">
          <div className="opacity-[0.5] text-sm font-semibold">Total Profit</div>
          <div className="font-semibold text-error">
            <div className="flex items-center gap-1">
              <div>{ formatCurrency(dataStat.profit) }</div>
              <img src="images/cryptos/usdt.svg" className="w-4 h-4 rounded-full" alt="usdt" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="opacity-[0.5] text-sm font-semibold">Total Trade</div>
          <div className="font-semibold">{ dataStat.totalTrade }</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="opacity-[0.5] text-sm font-semibold">Total Active Trade</div>
          <div className="font-semibold">{ dataStat.totalActiveTrade }</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="opacity-[0.5] text-sm font-semibold">Total Trade Win</div>
          <div className="font-semibold text-success">{ dataStat.totalWin }</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="opacity-[0.5] text-sm font-semibold">Total Trade Lose</div>
          <div className="font-semibold text-error">{ dataStat.totalLose}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="opacity-[0.5] text-sm font-semibold">Win Rate (%)</div>
          <div className="font-semibold">{ (dataStat.totalWin / (dataStat.totalTrade - dataStat.totalActiveTrade)) * 100 }%</div>
        </div>
          </>
        }
      </div>
    </div>
  )
}

export default TradeStat;