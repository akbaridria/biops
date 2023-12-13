import type { IBenefit } from '@/types'
import {
  Speed,
  Time,
  Connection
} from '@/components/Icons'

export const listBenefits: IBenefit[] = [
  {
    title : 'Decentralized Accuracy',
    description: 'Utilize pyth.Network dependable data feeds, ensuring accuracy and transparency in predictions.',
    icon: () => Connection({customClass: 'w-10 h-10'})
  },
  {
    title : 'Decentralized Accuracy',
    description: 'Utilize pyth.Network dependable data feeds, ensuring accuracy and transparency in predictions.',
    icon: () => Time({customClass: 'w-10 h-10'})
  },
  {
    title : 'Decentralized Accuracy',
    description: 'Utilize pyth.Network dependable data feeds, ensuring accuracy and transparency in predictions.',
    icon: () => Speed({customClass: 'w-10 h-10'})
  }
]