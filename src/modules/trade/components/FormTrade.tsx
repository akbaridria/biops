'use client'
import { formatCurrency } from '@/helper'
import { readBalance, readLimit } from '@/modules/prepareContract'
import { ILoadingTrade, ITrigger, IForm } from '@/types'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNetwork, useAccount } from 'wagmi'

export const FormTrade = (data: { form: IForm, setForm: (arg0: { direction: number; time: number; amount: string; asset: string }) => void, setShow: (arg0: boolean) => void }) => {

  const { address, isConnected } = useAccount()
  const [balance, setBalance] = useState<bigint>(BigInt(0));
  const [limit, setLimit] = useState<bigint>(BigInt(0));
  const [allowance, setAllowance] = useState<bigint>(BigInt(0));
  const trigger = useSelector((state: { trigger: ITrigger }) => state.trigger)
  const [errorForm, setErrorForm] = useState<{ name: string, error: boolean }>({
    name: 'wallet not connected',
    error: true
  })

  const { chain } = useNetwork()

  const listTabs = [
    {
      name: 'Long',
      value: 0
    },
    {
      name: 'Short',
      value: 1
    }
  ];

  const [loading, setLoading] = useState<ILoadingTrade>({
    loadingAllowance: false,
    loadingApprove: false,
    loadingBalance: false,
    loadingLimit: false,
    loadingTrade: false
  })

  // methods
  const handleBalance = useCallback((addr: `0x${string}`) => readBalance(addr), [])
  const handleLimit = useCallback(() => readLimit(), [])
  const handleInputTime = (v: string) => {
    let filteredValue = v.replace(/[^0-9]/g, '');
    data.setForm({ ...data.form, time: Number(filteredValue) })
  }
  const handleInputAmount = (v: string) => {
    let filteredValue = v.replace(/[^0-9.]/g, '');
    let dotCount = (filteredValue.match(/\./g) || []).length;
    if (dotCount > 1) {
      filteredValue = filteredValue.replace(/\./g, (match, index) => index === filteredValue.indexOf('.') ? '.' : '');
    }
    data.setForm({ ...data.form, amount: filteredValue })
  }

  const handleError = () => {
    // wallet not connected

    // wrong network

    // insufficient balance

    // limit trade
  }

  // effect
  useEffect(() => {
    const isValidForm = () => {
      if (!isConnected) {
        setErrorForm({ name: 'Wallet is not connected', error: true })
        return
      }
      if (chain?.unsupported) {
        setErrorForm({ name: 'Wrong network', error: true })
        return
      }
      if (data.form.time < 5) {
        setErrorForm({ name: 'Minimum 5 minutes', error: true })
        return
      }
      if (data.form.amount === '' || data.form.amount === '0') {
        setErrorForm({ name: 'Amount is not set', error: true })
        return
      }
      if (Number(data.form.amount) > Number(balance) / (10 ** 8)) {
        setErrorForm({ name: 'Insufficient Balance', error: true })
        return
      }
      if (Number(data.form.amount) > Number(limit) / (10 ** 8)) {
        setErrorForm({ name: 'Amount Exceed the limit trade', error: true })
        return
      }
      setErrorForm({ name: '', error: false })
      return
    }

    isValidForm()
  }, [data.form.amount, data.form.time, balance, limit, isConnected, chain?.unsupported])

  useEffect(() => {
    const getData = async () => {
      if (!!address) {
        setLoading({ ...loading, loadingAllowance: true, loadingBalance: true, loadingLimit: true })
        await Promise.all([handleBalance(address), handleLimit()]).then((values) => {
          setBalance(values[0])
          setLimit(values[1])
        })
        setLoading({ ...loading, loadingAllowance: false, loadingBalance: false, loadingLimit: false })
      }
    }

    getData()
  }, [address, handleBalance, handleLimit, trigger.counter])



  return (
    <div className="p-4 shadow-md bg-neutral rounded-box h-fit">
      <div className="grid grid-cols-1 gap-4">
        <div role="tablist" className="tabs tabs-boxed">
          {listTabs.map((item) => {
            return (
              <button key={item.value} role="tab" className={`tab ${data.form.direction === item.value ? 'tab-active' : ''}`} onClick={() => data.setForm({ ...data.form, direction: item.value })}>{item.name}</button>
            )
          })}
        </div>
        <div className="grid grid-cols-1 gap-2">
          <div className="opacity-[0.5]">Input Expire Time</div>
          <div className="join w-full">
            <input className="input focus:!border-none join-item text-sm w-full" placeholder="Input Time" value={data.form.time} onChange={(e) => handleInputTime(e.target.value)} />
            <div className="bg-base-100 flex items-center justify-center px-4 rounded-box text-sm">
              Minutes
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {
              'a'.repeat(4).split('').map((item, index) => {
                return (
                  <button key={index} className={`btn btn-sm flex justify-center rounded-box text-sm ${data.form.time === (index + 1) * 5 ? 'btn-primary' : ''}`} onClick={() => handleInputTime(String((index + 1) * 5))}>{(index + 1) * 5}m</button>
                )
              })
            }
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <div className="opacity-[0.5]">Input Amount</div>
          <div className="join w-full">
            <input className="input join-item text-sm w-full" placeholder="Input Amount" value={data.form.amount} onChange={(e) => handleInputAmount(e.target.value)} />
            <div className="bg-base-100 flex items-center justify-center px-4 rounded-box">
              <img src="images/cryptos/usdt.svg" className="w-8 h-8 rounded-full" alt="" />
            </div>
          </div>
          <div className="flex justify-between text-xs">
            <div><span className='opacity-[0.5]'>Limit</span>: {loading.loadingLimit ? 'loading...' : formatCurrency(Number(limit) / (10 ** 8))}</div>
            <div><span className='opacity-[0.5]'>Balance</span>: {loading.loadingLimit ? 'loading...' : formatCurrency(Number(balance) / (10 ** 8))}</div>
          </div>
        </div>
        <div className="text-sm">
          <div className="justify-between flex">
            <div className="opacity-[0.5]">Profit</div>
            <div>+100%</div>
          </div>
          <div className="justify-between flex">
            <div className="opacity-[0.5]">Loss</div>
            <div>-100%</div>
          </div>
          <div className="justify-between flex">
            <div className="opacity-[0.5]">Fee/Trade</div>
            <div>0%</div>
          </div>
        </div>

        <button className="btn btn-sm btn-primary" disabled={errorForm.error} onClick={() => data.setShow(true)}>
          {errorForm.error ? errorForm.name : 'Open Trade'}
        </button>
      </div>
    </div>
  )
}

export default FormTrade;