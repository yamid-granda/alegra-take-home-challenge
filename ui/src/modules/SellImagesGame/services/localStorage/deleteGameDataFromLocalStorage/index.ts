import { deleteFromLocalStorage } from '@ui/clients/localStorage/deleteFromLocalStorage'
import { GAME_DATA_STORAGE_KEY } from '@ui/modules/SellImagesGame/configs'

export function deleteGameDataFromLocalStorage(): void {
  deleteFromLocalStorage({ key: GAME_DATA_STORAGE_KEY })
}
