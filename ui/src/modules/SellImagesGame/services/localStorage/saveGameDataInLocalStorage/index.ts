import { saveInLocalStorage } from '@ui/clients/localStorage/saveInLocalStorage'
import type { ISellImagesGameData } from '@ui/modules/SellImagesGame/components/SellImagesGame/types'
import { GAME_DATA_STORAGE_KEY } from '@ui/modules/SellImagesGame/configs'

export function saveGameDataInLocalStorage(value: ISellImagesGameData): void {
  saveInLocalStorage({ key: GAME_DATA_STORAGE_KEY, value })
}
