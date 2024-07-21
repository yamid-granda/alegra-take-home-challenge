import { ALEGRA_BASIC_AUTH } from '@api/configs'
import type { IApiConfig } from '@ui/types'

export const GET_GAME_SELLERS_API_CONFIG: IApiConfig = {
  url: 'https://api.alegra.com/api/v1/sellers',
  method: 'get',
  searchParams: { limit: 3 },
  basicAuth: ALEGRA_BASIC_AUTH,
}
