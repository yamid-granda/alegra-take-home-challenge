import type { IBasicAuth } from '@ui/types'

export const ALEGRA_BASIC_AUTH: IBasicAuth = {
  username: process.env.ALEGRA_API_USERNAME ?? '',
  password: process.env.ALEGRA_API_PASSWORD ?? '',
}
