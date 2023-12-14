import type { IAccountSubMenu, IBenefit } from '@/types'
import {
  Speed,
  Time,
  Connection,
  ArrowDiagonalSquare,
  ArrowSquare
} from '@/components/Icons'

export const listBenefits: IBenefit[] = [
  {
    title : 'Decentralized Accuracy',
    description: 'Utilize pyth.Network dependable data feeds, ensuring accuracy and transparency in predictions.',
    icon: () => Connection({customClass: 'w-10 h-10'})
  },
  {
    title : 'Speed Market Prediction',
    description: 'Engage in rapid predictions for assets and cryptocurrencies, capitalizing on quick market movements.',
    icon: () => Time({customClass: 'w-10 h-10'})
  },
  {
    title : 'Instant Withdrawal',
    description: 'Enjoy the convenience of instant withdrawal, accessing your earnings promptly after successful predictions.',
    icon: () => Speed({customClass: 'w-10 h-10'})
  }
]

export const formatCurrency = (v: number) => {
  return new Intl.NumberFormat().format(v);
}

export const trimWallet = (v:string) => {
  return v.slice(0, 5) + '...' + v.slice(-5)
}

export const listSubMenuAccount = ():IAccountSubMenu[] => {
  return [
    {
      name: "View In Explorer",
      icon: ArrowDiagonalSquare({ customClass: 'w-4 h-4 stroke-base-content'})
    },
    {
      name: "Disconnect",
      icon: ArrowSquare({ customClass: 'w-4 h-4 stroke-base-content rotate-[180deg]'})
    }
  ]
}