import { EvmPriceServiceConnection, PriceFeed } from '@pythnetwork/pyth-evm-js'

import { useEffect, useMemo, useState } from "react";

export default function useGetPrice(priceId: string[]) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<number[]>([]);
  const [error, setError] = useState(null);

  const connection = useMemo(() => new EvmPriceServiceConnection("https://hermes.pyth.network"), [])


  useEffect(() => {
    setIsLoading(true)
    const getData = async () => {
      try {
        const resp = await connection.getLatestPriceFeeds(priceId)
        setData(!!resp ? resp.map((item) => Number(item.getPriceNoOlderThan(60)?.price) / (10 ** -(item.getEmaPriceNoOlderThan(60)?.expo as number))) : [])
        setIsLoading(false);
      } catch (error) {
        console.log(error)
      }
    }

    getData()
  }, []);

  return { isLoading, data, error };
}