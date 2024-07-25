import { getFromLocalStorage } from '@ui/clients/localStorage/getFromLocalStorage'
import { SEARCH_TEXT_STORAGE_KEY } from '@ui/modules/SellImagesGame/configs'

export function getSearchTextFromLocalStorage() {
  return getFromLocalStorage({ key: SEARCH_TEXT_STORAGE_KEY })
}
