export const FormTrade = () => {
  return (
    <div className="p-4 shadow-md bg-neutral rounded-box h-fit">
      <div className="grid grid-cols-1 gap-4">
        <div role="tablist" className="tabs tabs-boxed">
          <a role="tab" className="tab">Long</a>
          <a role="tab" className="tab tab-active">Short</a>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <div className="opacity-[0.5]">Input Expire Time</div>
          <div className="join w-full">
            <input className="input focus:!border-none join-item text-sm w-full" placeholder="Input Time" />
            <div className="bg-base-100 flex items-center justify-center px-4 rounded-box text-sm">
              Minutes
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {
              'a'.repeat(4).split('').map((item, index) => {
                return (
                  <button key={index} className={`btn btn-sm flex justify-center rounded-box text-sm ${index === 0 ? 'btn-primary' : ''}`}>{(index + 1) * 5}m</button>
                )
              })
            }
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <div className="opacity-[0.5]">Input Amount</div>
          <div className="join w-full">
            <input className="input join-item text-sm w-full" placeholder="Input Amount" />
            <div className="bg-base-100 flex items-center justify-center px-4 rounded-box">
              <img src="images/cryptos/usdt.svg" className="w-8 h-8 rounded-full" alt="" />
            </div>
          </div>
          <div className="flex justify-between text-xs">
            <div>Limit: 45.000,00</div>
            <div>Balance: 50,000.00</div>
          </div>
        </div>
        <div className="text-sm">
          <div className="justify-between flex">
            <div className="opacity-[0.5]">Profit</div>
            <div>100%</div>
          </div>
          <div className="justify-between flex">
            <div className="opacity-[0.5]">Loss</div>
            <div>100%</div>
          </div>
          <div className="justify-between flex">
            <div className="opacity-[0.5]">Fee/Trade</div>
            <div>0%</div>
          </div>
        </div>
        <button className="btn btn-sm btn-primary">
          Open Trade
        </button>
      </div>
    </div>
  )
}

export default FormTrade;