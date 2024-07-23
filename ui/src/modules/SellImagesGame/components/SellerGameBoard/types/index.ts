import type { IGoogleImage } from '@api/modules/Images/types'
import type { IAlegraSeller } from '@api/modules/Sellers/types'

export interface ISellerGameBoardProps {
  seller: IAlegraSeller
  points?: number
  image?: IGoogleImage
  isLoading?: boolean
  isImageVisible?: boolean
}

export type ISellerGameBoardEvents = (e: 'ready') => void
