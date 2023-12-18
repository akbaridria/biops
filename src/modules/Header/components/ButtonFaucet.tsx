'use client'
import { Spinner } from '@/components/Icons'
import { prepareFaucet } from '@/modules/prepareContract'
import { waitForTransaction, writeContract } from '@wagmi/core'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { setShow, setTx } from '@/store/features/useToast'
import { setTrigger } from '@/store/features/useTrigger'
import { useDispatch } from 'react-redux'

export const ButtonFaucet = () => {
  const { address } = useAccount()
  const [isLoading, setLoading] = useState(false)
  
  const dispatch = useDispatch()
  
  const handleFaucet = async () => {
    try {
      setLoading(true)
      const { request } = await prepareFaucet(address as `0x${string}`)
      const { hash } = await writeContract(request)
      const { transactionHash } = await waitForTransaction({
        hash: hash
      })
      
      dispatch(setTx(transactionHash))
      dispatch(setShow(true))
      dispatch(setTrigger(1))
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
  return (
    <button className="btn btn-ghost btn-sm items-center" onClick={handleFaucet} disabled={isLoading}>
      {isLoading && <Spinner customClass='w-4 h-4' />}
      <div>Faucet <span className="hidden md:inline-block">200 USDT</span> </div>
      <img src="images/cryptos/usdt.svg" className="w-4 h-4" alt="usdt" />
    </button>
  )
}