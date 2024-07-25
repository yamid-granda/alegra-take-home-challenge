import { API_URL } from '@ui/configs'
import type { IApiConfig } from '@ui/types'

export const MAX_POINTS = 20
export const GAME_DATA_STORAGE_KEY = 'gameData'
export const GAME_IMAGES_STORAGE_KEY = 'gameImages'
export const SEARCH_TEXT_STORAGE_KEY = 'searchText'
export const SELLERS_STORAGE_KEY = 'sellers'

export const QUERY_IMAGES_API_CONFIG: IApiConfig = {
  url: `${API_URL}/query-images`,
  method: 'get',
}

export const GET_GAME_SELLERS_API_CONFIG: IApiConfig = {
  url: `${API_URL}/get-game-sellers`,
  method: 'get',
}
