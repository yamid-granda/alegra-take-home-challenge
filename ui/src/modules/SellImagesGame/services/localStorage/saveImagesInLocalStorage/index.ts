import type { IGoogleImage } from '@api/modules/Images/types'
import { saveInLocalStorage } from '@ui/clients/localStorage/saveInLocalStorage'
import { GAME_IMAGES_STORAGE_KEY } from '@ui/modules/SellImagesGame/configs'

export function saveImagesInLocalStorage(value: IGoogleImage[]): void {
  saveInLocalStorage({ key: GAME_IMAGES_STORAGE_KEY, value })
}
