import { deleteFromLocalStorage } from '@ui/clients/localStorage/deleteFromLocalStorage'
import { SEARCH_TEXT_STORAGE_KEY } from '@ui/modules/SellImagesGame/configs'

export function deleteSearchTextFromLocalStorage(): void {
  deleteFromLocalStorage({ key: SEARCH_TEXT_STORAGE_KEY })
}
