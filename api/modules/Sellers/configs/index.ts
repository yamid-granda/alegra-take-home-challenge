import type { IApiConfig } from '@ui/types'

export const GET_GAME_SELLERS_API_CONFIG: IApiConfig = {
  url: 'https://api.alegra.com/api/v1/sellers',
  method: 'get',
  searchParams: { limit: 3 },
  basicAuth: {
    username: process.env.ALEGRA_API_USERNAME ?? '',
    password: process.env.ALEGRA_API_PASSWORD ?? '',
  },
}
