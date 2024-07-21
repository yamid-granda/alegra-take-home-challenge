import { GET_GAME_SELLERS_API_CONFIG } from '@api/modules/Sellers/configs'
import { httpRequest } from '@ui/clients/http'

export async function getGameSellers() {
  return httpRequest(GET_GAME_SELLERS_API_CONFIG)
}
