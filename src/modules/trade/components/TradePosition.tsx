export const TradePosition = () => {
  const tHead = ['Market', 'Direction', 'Entry Time', 'Expire Time', 'Initial Margin', 'Entry Price', 'Current Price', 'PnL(%)', '']
  return (
    <div className="shadow-md p-4 bg-neutral rounded-box">
      <div className="relative">
        <div role="tablist" className="tabs tabs-lifted w-full pt-4">
          <input type="radio" name="my_tabs_2" role="tab" className="tab whitespace-nowrap" aria-label="Active" checked />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 overflow-x-auto max-w-full">
            <div className="overflow-x-auto max-w-full pb-6">
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    {
                      tHead.map((item) => {
                        return (
                          <th key={item}>{ item }</th>
                        )
                      })
                    }
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
          </div>

          <input type="radio" name="my_tabs_2" role="tab" className="tab whitespace-nowrap" aria-label="Win" />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">Win Position</div>

          <input type="radio" name="my_tabs_2" role="tab" className="tab whitespace-nowrap" aria-label="Lose" />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 w-full rounded-box p-6">Lose Position</div>
        </div>
        <div className="absolute right-0 top-0">
          <button className="btn btn-primary btn-sm">Refresh</button>
        </div>
      </div>

    </div>
  )
}

export default TradePosition;