'use client'

import { Arrow, Check } from "./Icons";
import { useDispatch, useSelector } from "react-redux";
import { setShow } from '@/store/features/useToast'
import type { IToast } from '@/types'
import datas from '../../protocol-contract/datas.json';

export const Toast = () => {

  const toastState = useSelector((state: { toast: IToast }) => state.toast);
  const dispatch = useDispatch();

  setTimeout(() => {
    dispatch(setShow(false))
  }, 10000)

  return (
    <div className="toast toast-end z-[1000] ">
      <div className={`alert alert-success relative ${toastState.open ? 'right-0' : 'right-[-200%]'} transition-all`}>
        <button className="btn btn-sm btn-circle btn-ghost absolute right-0 top-0" onClick={() => dispatch(setShow(false))}>✕</button>
        <div className='grid grid-cols-1 gap-1'>
          <div className='flex items-center gap-1'>
            <Check customClass='w-6 h-6 fill-primary' />
            <div className='font-semibold'>Transaction Success</div>
          </div>
          <a href={`${datas.blockExplorer}/tx/${toastState.tx}`} role='button' target="_blank" className='flex items-center gap-1 text-sm'>
            <div className='w-6'></div>
            <div className='flex items-center gap-1'>
              <div>View in explorer</div>
              <Arrow customClass='w-4 h-4 rotate-[315deg]' />
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Toast;