import { httpRequest } from '@ui/clients/http'
import { GET_GAME_SELLERS_API_CONFIG } from '@ui/modules/SellImagesGame/configs'
import type { IAlegraSeller } from '@api/modules/Sellers/types'

export async function getGameSellers() {
  return httpRequest<IAlegraSeller[]>(GET_GAME_SELLERS_API_CONFIG)
}
