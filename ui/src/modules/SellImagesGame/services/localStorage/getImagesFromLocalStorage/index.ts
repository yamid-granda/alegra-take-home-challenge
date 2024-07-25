import type { IGoogleImage } from '@api/modules/Images/types'
import { getFromLocalStorage } from '@ui/clients/localStorage/getFromLocalStorage'
import { GAME_IMAGES_STORAGE_KEY } from '@ui/modules/SellImagesGame/configs'

export function getImagesFromLocalStorage() {
  return getFromLocalStorage<IGoogleImage[]>({ key: GAME_IMAGES_STORAGE_KEY })
}
