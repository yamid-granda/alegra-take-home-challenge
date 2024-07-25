import { deleteFromLocalStorage } from '@ui/clients/localStorage/deleteFromLocalStorage'
import { GAME_IMAGES_STORAGE_KEY } from '@ui/modules/SellImagesGame/configs'

export function deleteGameImagesFromLocalStorage(): void {
  deleteFromLocalStorage({ key: GAME_IMAGES_STORAGE_KEY })
}
