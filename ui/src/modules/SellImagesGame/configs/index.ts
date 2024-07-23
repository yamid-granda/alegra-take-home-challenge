import { API_URL } from '@ui/configs'
import type { IApiConfig } from '@ui/types'

export const QUERY_IMAGES_API_CONFIG: IApiConfig = {
  url: `${API_URL}/query-images`,
  method: 'get',
}

export const GET_GAME_SELLERS_API_CONFIG: IApiConfig = {
  url: `${API_URL}/get-game-sellers`,
  method: 'get',
}
