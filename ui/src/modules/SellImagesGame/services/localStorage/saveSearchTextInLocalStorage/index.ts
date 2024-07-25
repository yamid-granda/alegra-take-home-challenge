import { saveInLocalStorage } from '@ui/clients/localStorage/saveInLocalStorage'
import { SEARCH_TEXT_STORAGE_KEY } from '@ui/modules/SellImagesGame/configs'

export function saveSearchTextInLocalStorage(value: string): void {
  saveInLocalStorage({ key: SEARCH_TEXT_STORAGE_KEY, value })
}
