import type { IAlegraSeller } from '@api/modules/Sellers/types'
import { getFromLocalStorage } from '@ui/clients/localStorage/getFromLocalStorage'
import { SELLERS_STORAGE_KEY } from '@ui/modules/SellImagesGame/configs'

export function getSellersFromLocalStorage() {
  return getFromLocalStorage<IAlegraSeller[]>({ key: SELLERS_STORAGE_KEY })
}
