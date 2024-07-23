import { API_URL } from '@ui/configs'
import type { IApiConfig } from '@ui/types'

export const CREATE_INVOICE_API_CONFIG: IApiConfig = {
  url: `${API_URL}/create-invoice`,
  method: 'post',
}
