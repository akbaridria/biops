'use client'

import { formatCurrency, getPrice } from "@/helper"
import { getUserHistory } from "@/modules/prepareContract"
import { IPosition, ITrigger } from "@/types"
import { useCallback, useEffect, useState } from "react"
import { useAccount } from "wagmi"
import moment from 'moment'
import { useSelector } from 'react-redux'
import datas from '../../../../protocol-contract/datas.json'
import { Refresh } from "@/components/Icons"

export const TradePosition = () => {
  const tHead = ['Market', 'Direction', 'Entry Price', 'Mark/Current Price', 'Initial Margin', 'Expire Time', 'Status']
  const [activeTab, setActiveTab] = useState(0)
  const [loading, setLoading] = useState(false)
  const [position, setPosition] = useState<readonly IPosition[]>([])
  const trigger = useSelector((state: { trigger: ITrigger }) => state.trigger);

  const listTabs = [
    {
      name: 'Active',
      value: 0
    },
    {
      name: 'Win',
      value: 1
    },
    {
      name: 'Lose',
      value: 2
    }
  ]
  const { address } = useAccount()
  // methods
  const getData = useCallback(async () => {
    if (!!address) {
      setLoading(true)
      const res = await getUserHistory(address)
      setPosition(res)
      setLoading(false)
    }
  }, [address])

  // effect
  useEffect(() => {
    getData()
  }, [getData, trigger.counterPosition])

  return (
    <div className="shadow-md p-4 bg-neutral rounded-box">
      <div className="relative">
        <div role="tablist" className="tabs tabs-lifted w-full pt-4">
          {
            listTabs.map((item) => {
              return (
                <>
                  <input key={item.name} type="radio" name="user_position" value={item.value} role="tab" className="tab whitespace-nowrap" aria-label={`${item.name} (${position.filter((v) => item.value === 1 ? v.status === item.value || v.status === 3 : v.status === item.value).length})`} checked={item.value === activeTab} onChange={() => setActiveTab(item.value)} />
                  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 overflow-x-auto max-w-full">
                    <div className="overflow-x-auto max-w-full pb-6">
                      <table className="table table-zebra">
                        {/* head */}
                        <thead>
                          <tr>
                            {
                              tHead.map((item) => {
                                return (
                                  <th key={item}>{item}</th>
                                )
                              })
                            }
                          </tr>
                        </thead>
                        <tbody>
                          {
                            loading && <div>loading...</div>
                          }
                          {
                            !loading &&
                            position.map((item, index) => {

                              if (activeTab === 1 && (item.status === 2 || item.status === 3)) {
                                return (
                                  <TrData key={index} position={item} />
                                )
                              }
                              if (activeTab === 2 && item.status === 1) {
                                return (
                                  <TrData key={index} position={item} />
                                )
                              }
                              if (activeTab === 0 && item.status === 0) {
                                return (
                                  <TrData key={index} position={item} />
                                )
                              }
                            })
                          }
                          {(!loading && position.length === 0) && <div>no data</div>

                          }
                        </tbody>
                      </table>
                    </div>
                  </div></>
              )
            })
          }

        </div>
        <div className="absolute right-0 top-0">
          <button className="btn btn-primary btn-sm" onClick={() => getData()} disabled={loading}>
            <Refresh customClass={`w-4 h-4 ${loading && 'animate-spin'}`} />
            <div>Refresh</div>
          </button>
        </div>
      </div>

    </div>
  )
}

const TrData = (data: { position: IPosition }) => {
  const [markPrice, setMarkPrice] = useState(0);

  const getData = useCallback(async () => {
    const res = await getPrice([datas.ptyh.priceFeedIds.filter(item => item.name === data.position.market)[0].priceId])
    setMarkPrice(res)
  }, [data.position.market])

  useEffect(() => {
    getData()
  }, [getData])


  return (
    <tr>
      <td className="whitespace-nowrap">
        <div className="flex items-center gap-1">
          <img src={`images/cryptos/${datas.ptyh.priceFeedIds.filter(item => item.name === data.position.market)[0].image}`} alt="biops" className="w-4 h-4 rounded-full" />
          <div>{data.position.market}</div>
        </div>
      </td>
      <td>{data.position.direction === 0 ? 'Long' : 'Short'}</td>
      <td>${formatCurrency(Number(data.position.startPrice) / (10 ** 8))}</td>
      <td>${data.position.status === 0 ? formatCurrency(markPrice) : formatCurrency(Number(data.position.markPrice) / (10 ** 8))}</td>
      <td>
        <div className="flex items-center gap-1">
          <div>{formatCurrency(Number(data.position.amount) / (10 ** 8))}</div>
          <img src="images/cryptos/usdt.svg" className="w-4 h-4 rounded-full" alt="usdt" />
        </div>
      </td>
      <td>{moment(Number(data.position.expireTime) * 1000).format('lll')}</td>
      {/* <td>{Number(data.position.status)}</td> */}
      <td><BadgeStatus position={data.position} /></td>
    </tr>
  )
}

const BadgeStatus = (data: { position: IPosition }) => {
  if (data.position.status === 0 && (Number(data.position.expireTime) < Math.floor(Date.now()) / 1000)) {
    return (
      <div className="whitespace-nowrap badge badge-info">Being Resolve</div>
    )
  }
  if (data.position.status === 0 && (Number(data.position.expireTime) >= Math.floor(Date.now()) / 1000)) {
    return (
      <div className="whitespace-nowrap badge badge-info">Active</div>
    )
  }
  if (data.position.status === 1) {
    return (
      <div className="whitespace-nowrap badge badge-error">Lose</div>
    )
  }
  if (data.position.status === 2) {
    return (
      <button className="btn btn-sm btn-primary">Claim</button>
    )
  }
  if (data.position.status === 3) {
    return (
      <button className="btn btn-sm btn-primary" disabled={true}>Claimed</button>
    )
  }
}
export default TradePosition;