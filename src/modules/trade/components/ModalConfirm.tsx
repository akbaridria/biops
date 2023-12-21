"use client";

import { Spinner, XMark } from "@/components/Icons";
import { approveToken, getFeeData, readAllowance, submitTrade } from "@/modules/prepareContract";
import { IForm } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { formatCurrency, getPrice, getPriceData } from '@/helper'
import { useAccount } from 'wagmi'
import datas from '../../../../protocol-contract/datas.json';
import { waitForTransaction, writeContract } from "@wagmi/core";
import { setShow, setTx } from "@/store/features/useToast";
import { setTrigger, setTriggerPosition } from "@/store/features/useTrigger";
import { useDispatch } from 'react-redux'

export const ModalConfirm = (data: { form: IForm, show: boolean, setShow: (arg0: boolean) => void }) => {
  // data
  const { address } = useAccount()
  const [entryPrice, setEntryPrice] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [loading, setLoading] = useState<{ loadingApprove: boolean, loadingTrade: boolean }>({
    loadingApprove: false,
    loadingTrade: false
  });
  const dispatch = useDispatch()

  // methods
  const getData = useCallback(async () => {
    try {
      setLoading({ ...loading, loadingApprove: true })
      const priceId = datas.ptyh.priceFeedIds.filter((item) => item.name === data.form.asset)[0].priceId
      await Promise.all([getPrice([priceId]), readAllowance(address as `0x${string}`)]).then((values) => {
        setEntryPrice(values[0])
        setAllowance(Number(values[1]) / (10 ** 8))
        setLoading({ ...loading, loadingApprove: false })
      })
    } catch (error) {
      setLoading({ ...loading, loadingApprove: false })
    }
  }, [address, data.form.asset])

  const handleApprove = async () => {
    try {
      console.log('here')
      setLoading({ ...loading, loadingApprove: true })
      const { request } = await approveToken(Number(data.form.amount))
      const { hash } = await writeContract(request)
      const { transactionHash } = await waitForTransaction({
        hash: hash
      })
      await getData()
      setLoading({ ...loading, loadingApprove: false })
    } catch (error) {
      setLoading({ ...loading, loadingApprove: false })
    }
  }
  const handleSubmit = async () => {
    try {
      setLoading({...loading, loadingTrade: true})
      const priceId = datas.ptyh.priceFeedIds.filter((item) => item.name === data.form.asset)[0].priceId
      const priceData = await getPriceData([priceId])
      const getFee = await getFeeData(priceData as `0x${string}`[]);
      const { request } = await submitTrade(address as `0x${string}`, data.form.amount, data.form.direction, data.form.time, data.form.asset, priceData as `0x${string}`[], getFee)
      const { hash } = await writeContract(request)
      const {transactionHash} = await waitForTransaction({
        hash: hash
      })
      
      setLoading({...loading, loadingTrade: false})
      data.setShow(false)

      dispatch(setTx(transactionHash))
      dispatch(setShow(true))
      dispatch(setTrigger(1))
      dispatch(setTriggerPosition(1))
    } catch (error) {
      setLoading({...loading, loadingTrade: false})
    }
  }

  // effect
  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {

    const id = setInterval(async () => {
      console.log('here ini disini')
      await getData()
    }, 5000)

    return clearInterval(id);

  }, [getData])

  if (!data.show) {
    return
  }
  return (
    <div className="bg-base-200/75 fixed top-0 left-0 z-[10000] h-screen w-screen">
      <div className="flex items-center justify-center h-full">
        <div className="flex bg-base-200 p-4 rounded-box w-[350px] max-w-full">
          <div className="grid grid-cols-1 gap-2 w-full">
            <div className="flex justify-between items-center text-lg mb-2">
              <div className="font-semibold">Confirmation Trade</div>
              <button className="btn btn-sm btn-circle btn-ghost" onClick={() => data.setShow(false)}>
                <XMark customClass="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="opacity-[0.5]">Direction</div>
              <div className="badge badge-primary">{ data.form.direction === 0 ? 'Long' : 'Short'}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="opacity-[0.5]">Market</div>
              <div>{data.form.asset}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="opacity-[0.5]">Entry Price</div>
              <div>${formatCurrency(entryPrice)}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="opacity-[0.5]">Time</div>
              <div>{ data.form.time } minutes</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="opacity-[0.5]">Amount</div>
              <div className="flex items-center gap-1">
                <div>{ formatCurrency(Number(data.form.amount))}</div>
                <img src="images/cryptos/usdt.svg" className="w-4 h-4 rounded-full" alt="usdt" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button className="btn btn-primary btn-sm" disabled={loading.loadingApprove || allowance >= Number(data.form.amount)} onClick={() => handleApprove()}>
                { loading.loadingApprove && <Spinner customClass="w-4 h-4" /> }
                Approve
              </button>
              <button className="btn btn-primary btn-sm" disabled={loading.loadingTrade || allowance < Number(data.form.amount)} onClick={() => handleSubmit()}>
                { loading.loadingTrade && <Spinner customClass="w-4 h-4" /> }
                Submit Trade
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;

