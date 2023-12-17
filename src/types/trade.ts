export interface IHeaderTrade {
  listAssets: IAsset[];
  selectedAsset: string;
  setAsset: (v: string) => void;
}

export interface IForm {
  direction: number;
  time: number;
  amount: string;
  asset: string;
}

export interface IAsset {
  name: string;
  priceId: string;
  image: string;
}

export interface IAssetPrice extends IAsset {
  price: number;
}

export interface ILoadingTrade {
  loadingBalance: boolean;
  loadingAllowance: boolean;
  loadingLimit: boolean;
  loadingApprove: boolean;
  loadingTrade: boolean;
}

export interface IPosition  {
  isExist: boolean;
  trader: `0x${string}`;
  amount: bigint;
  direction: number;
  startPrice: bigint;
  markPrice: bigint;
  status: number;
  expireTime: bigint;
  market: string;
}
