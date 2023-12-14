/* eslint-disable @next/next/no-img-element */
import { Arrow, Chevron } from "@/components/Icons";
import type { IAssetPrice, IHeaderTrade } from '@/types'
import { useEffect, useState } from "react";
import useGetPrice from "../hooks/useGetPrice";
import { formatCurrency, trimWallet } from "@/helper";
import datas from '../../../../protocol-contract/datas.json';

export const HeaderTrade = ({ listAssets, selectedAsset, setAsset }: IHeaderTrade) => {
  const [selectAsset, setSelectAsset] = useState(selectedAsset);
  const [listAssetPrice, setListAssetPrice] = useState<IAssetPrice[]>([]);
  const {isLoading, data} = useGetPrice(listAssets.map((item) => item.priceId));

  useEffect(() => {
    setListAssetPrice(listAssets.map((item, index) => ({...item, price: data[index]})))
  }, [data, listAssets])

  return (
    <div className="shadow-md p-4 bg-neutral rounded-box">
      <div className="flex items-center gap-4 justify-between">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="flex items-center justify-between gap-2 text-lg font-semibold">
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
                listAssetPrice.map((item) => {
                  return (
                    <button key={item.name} className={`group grid grid-cols-2 hover:text-white transition-all ${selectAsset === item.name ? 'text-white' : 'text-white/50'}`} onClick={() => setAsset(item.name)}>
                      <div className="flex items-center gap-2">
                        <img src={`images/cryptos/${item.image}`} className={`w-4 h-4 rounded-full group-hover:border-[1px] grou-hover:border-white transition-all ${selectAsset === item.name ? 'border-[1px] border-white' : ''}`} alt="" />
                        <div>{item.name}</div>
                      </div>
                      <div className="text-left">{ isLoading ? 'loading...' : `$${formatCurrency(item.price)}` }</div>
                    </button>
                  )
                })
              }
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center ">
          <div className="text-sm opacity-[0.5]">Current Price</div>
          <div className="font-semibold">{ isLoading ? 'loading...' : `$${formatCurrency(listAssetPrice.filter(item => item.name === selectAsset)[0].price)}` }</div>
        </div>
        <div className="hidden md:flex flex-col items-end ">
          <div className="text-sm opacity-[0.5]">Oracle contract address</div>
          <a href={datas.blockExplorer + '/address/' + datas.ptyh.contractAddress} target="_blank" className="flex items-center gap-1">
            { trimWallet(datas.ptyh.contractAddress) }
            <Arrow customClass="w-4 h-4 rotate-[315deg]" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default HeaderTrade;