import { getFromLocalStorage } from '@ui/clients/localStorage/getFromLocalStorage'
import type { ISellImagesGameData } from '@ui/modules/SellImagesGame/components/SellImagesGame/types'
import { GAME_DATA_STORAGE_KEY } from '@ui/modules/SellImagesGame/configs'

export function getGameDataFromLocalStorage() {
  return getFromLocalStorage<ISellImagesGameData>({ key: GAME_DATA_STORAGE_KEY })
}
