/* eslint-disable @next/next/no-img-element */
import { Chevron } from "@/components/Icons";
import type { IHeaderTrade } from '@/types'
import { useState } from "react";

export const HeaderTrade = ({ listAssets, selectedAsset, setAsset }: IHeaderTrade) => {
  const [selectAsset, setSelectAsset] = useState(selectedAsset)

  return (
    <div className="shadow-md p-4 bg-neutral rounded-box">
      <div className="flex items-center">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="flex items-center gap-2 text-lg font-semibold">
            <img src={`images/cryptos/${listAssets.filter((item) => item.name === selectAsset)[0].image}`} className="w-5 h-5 rounded-full" alt="" />
            {selectAsset}
            <Chevron customClass="w-4 h-4 rotate-[90deg]" />
          </div>
          <div tabIndex={0} className="dropdown-content z-[1] menu p-4 mt-6 shadow bg-neutral -ml-4 rounded-box w-80">
            <div className="grid grid-cols-1 gap-4 max-h-40 overflow-y-auto">
              <div className="grid grid-cols-2 bg-neutral sticky top-0 z-[10] font-semibold">
                <div>MARKET</div>
                <div>Price</div>
              </div>
              {
                listAssets.map((item) => {
                  return (
                    <button key={item.name} className={`grid grid-cols-2 hover:text-white transition-all ${selectAsset === item.name ? 'text-white' : 'text-white/50'}`} onClick={() => setAsset(item.name)}>
                      <div className="flex items-center gap-2">
                        <img src={`images/cryptos/${item.image}`} className="w-4 h-4 rounded-full" alt="" />
                        <div>{item.name}</div>
                      </div>
                      <div className="text-left">$ 42.500,00</div>
                    </button>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderTrade;