'use client'

import { Spinner } from "@/components/Icons";
import { formatCurrency } from "@/helper";
import { approveToken, approveTokenVdusdt, deposit, getRatioVusdt, readAllowance, readAllowanceVdusdt, readBalance, readBalanceVdusdt, withdraw } from "@/modules/prepareContract";
import { PrepareWriteContractResult, waitForTransaction, writeContract } from "@wagmi/core";
import { useCallback, useEffect, useState } from "react"
import { useAccount, useNetwork } from "wagmi";
import { setShow, setTx } from "@/store/features/useToast";
import { useDispatch } from 'react-redux'
import datas from '../../../protocol-contract/datas.json';

export default function Liquidity() {
  const tabs = ['Add Liquidity', 'Remove Liquidity']
  const dispatch = useDispatch()

  const { address, isConnected } = useAccount();
  const { chain } = useNetwork()

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [loading, setLoading] = useState(false);
  const [ratio, setRatio] = useState(0);
  const [balance, setBalance] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [amount, setAmount] = useState('0');
  const [loadingTx, setLoadingTx] = useState<{ loadingApprove: boolean, loadingLiquidity: boolean }>({ loadingApprove: false, loadingLiquidity: false });
  const [balanceDusdt, setBalanceDusdt] = useState(0);
  const [balancevDusdt, setBalanceVdusdt] = useState(0);

  const getDataAdd = useCallback(async () => {
    if (isConnected && !chain?.unsupported && !!address) {
      try {
        setLoading(true)
        await Promise.all([readBalance(address), readAllowance(address, datas.contractAddresses.vDummyUSDTPool), getRatioVusdt()]).then((values) => {
          setBalance(Number(values[0]) / (10 ** 8));
          setAllowance(Number(values[1]) / (10 ** 8))
          setBalanceDusdt(Number(values[2].balanceDusdt) / (10 ** 8));
          setBalanceVdusdt(Number(values[2].totalSupply) / (10 ** 8));
          if (Number(values[2].balanceDusdt) === 0) {
            setRatio(1)
          } else {
            setRatio(Number(values[2].totalSupply) / Number(values[2].balanceDusdt))
          }
        })
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
  }, [address, chain?.unsupported, isConnected])

  const getDataRemove = useCallback(async () => {
    if (isConnected && !chain?.unsupported && !!address) {
      try {
        setLoading(true)
        await Promise.all([readBalanceVdusdt(address), readAllowanceVdusdt(address), getRatioVusdt()]).then((values) => {
          setBalance(Number(values[0]) / (10 ** 8));
          setAllowance(Number(values[1]) / (10 ** 8))
          if (Number(values[2].totalSupply) === 0) {
            setRatio(1)
          } else {
            setRatio(Number(values[2].balanceDusdt) / Number(values[2].totalSupply))
          }
        })
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
  }, [address, chain?.unsupported, isConnected])

  useEffect(() => {
    if (activeTab === 'Add Liquidity') {
      getDataAdd()
    } else {
      getDataRemove()
    }
  }, [activeTab, getDataAdd, getDataRemove])

  const handleInputAmount = (v: string) => {
    let filteredValue = v.replace(/[^0-9.]/g, '');
    let dotCount = (filteredValue.match(/\./g) || []).length;
    if (dotCount > 1) {
      filteredValue = filteredValue.replace(/\./g, (match, index) => index === filteredValue.indexOf('.') ? '.' : '');
    }
    setAmount(filteredValue);
  }

  const handleApprove = async () => {
    try {
      setLoadingTx({ ...loadingTx, loadingApprove: true })
      let data: PrepareWriteContractResult;

      if (activeTab === 'Add Liquidity') {
        data = await approveToken(Number(amount), datas.contractAddresses.vDummyUSDTPool);
      } else {
        data = await approveTokenVdusdt(Number(amount), address as `0x${string}`);
      }
      const { hash } = await writeContract(data.request);
      const { transactionHash } = await waitForTransaction({
        hash: hash
      })
      if (activeTab === 'Add Liquidity') {
        await getDataAdd()
      } else {
        await getDataRemove()
      }
      setLoadingTx({ ...loadingTx, loadingApprove: false })

    } catch (error) {
      setLoadingTx({ ...loadingTx, loadingApprove: false })
    }
  }

  const handleOrder = async () => {
    try {
      setLoadingTx({ ...loadingTx, loadingLiquidity: true })
      let data: PrepareWriteContractResult;

      if (activeTab === 'Add Liquidity') {
        data = await deposit(Number(amount))
      } else {
        data = await withdraw(Number(amount))
      }
      const { hash } = await writeContract(data.request);
      const { transactionHash } = await waitForTransaction({
        hash: hash
      })
      dispatch(setTx(transactionHash))
      dispatch(setShow(true))
      if (activeTab === 'Add Liquidity') {
        await getDataAdd()
      } else {
        await getDataRemove()
      }
      setLoadingTx({ ...loadingTx, loadingLiquidity: false })

    } catch (error) {
      setLoadingTx({ ...loadingTx, loadingLiquidity: false })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-4 items-center mt-20 mx-auto min-h-screen w-[500px] max-w-full">
        <div className="stats stats-vertical lg:stats-horizontal shadow">
          <div className="stat">
            <div className="stat-title">Total DUSDT</div>
            <div className="stat-value text-accent">${new Intl.NumberFormat('en', { notation: 'compact' }).format(balanceDusdt)}</div>
          </div>
          <div className="stat">
            <div className="stat-title">TotalVUSDT</div>
            <div className="stat-value text-primary">{new Intl.NumberFormat('en', { notation: 'compact' }).format(balancevDusdt)}</div>
          </div>
        </div>
        <div role="alert" className="alert alert-warning">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <span><span className="font-bold">Warning</span>: Providing liquidity involves potential losses if traders win and gains if traders lose. Understand the risks before participating</span>
        </div>
        <div className="card w-full max-w-full bg-neutral border-[1px] rounded-box border-neutral shadow-md">
          <div className="card-body grid grid-cols-1 gap-4">
            <div role="tablist" className="tabs tabs-boxed">
              {
                tabs.map((item) => {
                  return (
                    <div key={item} role="tab" className={`tab ${activeTab === item && 'tab-active'}`} onClick={() => setActiveTab(item)}>{item}</div>
                  )
                })
              }

            </div>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{activeTab}</div>
              <div className="badge badge-accent font-semibold">{loading ? <span className="italic">loading...</span> : <span>1 {activeTab === 'Add Liquidity' ? 'dUSDT' : 'vDUSDT'} = {formatCurrency(ratio)} {activeTab === 'Add Liquidity' ? 'vDUSDT' : 'dUSDT'}</span>}</div>
            </div>
            <div>
              <div className="join w-full">
                <input className="input join-item text-sm w-full" placeholder="0.0" disabled={loading || !isConnected || chain?.unsupported || loadingTx.loadingApprove || loadingTx.loadingLiquidity} value={amount} onChange={(e) => handleInputAmount(e.target.value)} />
                <div className="bg-base-100 flex items-center justify-center rounded-box px-4">
                  <img src="images/cryptos/usdt.svg" className={`max-w-8 max-h-8 rounded-full ${activeTab === 'Remove Liquidity' && 'border-[2px] border-accent'} `} alt="" />
                </div>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <div><span className="text-xs opacity-[0.5]">You will get : </span><span>~ {amount === '' || amount === '0' ? 0 : formatCurrency(ratio * Number(amount))} {activeTab === 'Add Liquidity' ? 'vDUSDT' : 'dUSDT'}</span></div>
                <div><span className="text-xs opacity-[0.5]">Balance</span>: <span>{loading ? <span className="text-sm italic">loading...</span> : <span>{formatCurrency(balance)}</span>}</span> {(!loading && !loadingTx.loadingApprove && !loadingTx.loadingLiquidity) && <span role="button" className="underline" onClick={() => setAmount(balance.toString())}>(max)</span>}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="btn btn-sm btn-primary" disabled={loading || !isConnected || chain?.unsupported || amount === '' || amount === '0' || allowance >= Number(amount) || Number(amount) > balance || loadingTx.loadingApprove} onClick={() => handleApprove()}>
                {loadingTx.loadingApprove && <Spinner customClass="w-3 h-3" />}
                Approve
              </button>
              <button className="btn btn-sm btn-primary" disabled={loading || !isConnected || chain?.unsupported || amount === '' || amount === '0' || allowance < Number(amount) || Number(amount) > balance || loadingTx.loadingLiquidity} onClick={() => handleOrder()}>
                {loadingTx.loadingLiquidity && <Spinner customClass="w-3 h-3" />}
                {activeTab}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}