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