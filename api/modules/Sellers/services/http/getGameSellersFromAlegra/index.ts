import { GET_GAME_SELLERS_API_CONFIG } from '@api/modules/Sellers/configs'
import type { IAlegraSeller } from '@api/modules/Sellers/types'
import { httpRequest } from '@ui/clients/http'
import type { IApiResponse } from '@ui/types'

export async function getGameSellersFromAlegra(): Promise<IApiResponse<IAlegraSeller[]>> {
  const response = await httpRequest<IAlegraSeller[]>(GET_GAME_SELLERS_API_CONFIG)

  if (!response.isOk) {
    return {
      isOk: false,
      error: response.error,
    }
  }

  return {
    isOk: true,
    result: response.result.slice(0, 3), // Alegra api limit currently not works
  }
}
