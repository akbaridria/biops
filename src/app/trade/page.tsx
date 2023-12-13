'use client'
import FormTrade from "@/modules/trade/components/FormTrade";
import HeaderTrade from "@/modules/trade/components/HeaderTrade";
import TradingViewWidget from "@/modules/trade/components/TradingView";
import datas from '../../../protocol-contract/datas.json';
import type { IForm } from "@/types";
import { useState } from "react";

export default function Trade() {
  const [form, setForm] = useState<IForm>({
    amount: '',
    asset: datas.ptyh.priceFeedIds[0].name,
    direction: 0,
    time: 300
  });

  return (
    <div className="container mx-auto p-4 min-h-screen my-6">
      <div className="flex flex-col lg:flex-row gap-6 ">
        <div className="flex-1 grid grid-cols-1 gap-6">
          <HeaderTrade 
            key={form.asset}
            listAssets={datas.ptyh.priceFeedIds} 
            selectedAsset={form.asset} 
            setAsset={(asset: string) => setForm({ ...form, asset: asset })} 
          />
          <div className="shadow-md">
            <TradingViewWidget 
              key={form.asset}
              asset={form.asset}  
            />
          </div>
        </div>
        <div className="flex-none w-[350px] max-w-full">
         <FormTrade />
        </div>
      </div>
    </div>
  );
}
