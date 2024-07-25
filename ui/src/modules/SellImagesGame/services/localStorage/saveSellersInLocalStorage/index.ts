import type { IAlegraSeller } from '@api/modules/Sellers/types'
import { saveInLocalStorage } from '@ui/clients/localStorage/saveInLocalStorage'
import { SELLERS_STORAGE_KEY } from '@ui/modules/SellImagesGame/configs'

export function saveSellersInLocalStorage(value: IAlegraSeller[]): void {
  saveInLocalStorage({ key: SELLERS_STORAGE_KEY, value })
}
