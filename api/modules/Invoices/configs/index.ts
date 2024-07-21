import { ALEGRA_BASIC_AUTH } from '@api/configs'
import type { IApiConfig } from '@ui/types'

export const CREATE_INVOICE_IN_ALEGRA_API_CONFIG: IApiConfig = {
  url: 'https://api.alegra.com/api/v1/invoices',
  method: 'post',
  basicAuth: ALEGRA_BASIC_AUTH,
}
