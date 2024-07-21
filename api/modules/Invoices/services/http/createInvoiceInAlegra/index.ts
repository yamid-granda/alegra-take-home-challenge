import { CREATE_INVOICE_IN_ALEGRA_API_CONFIG } from '@api/modules/Invoices/configs'
import type { ICreateAlegraInvoiceBody } from '@api/modules/Invoices/types'
import { httpRequest } from '@ui/clients/http'

interface ICreateInvoiceInAlegraConfig {
  body: ICreateAlegraInvoiceBody
}

export async function createInvoiceInAlegra({ body }: ICreateInvoiceInAlegraConfig) {
  return httpRequest({
    ...CREATE_INVOICE_IN_ALEGRA_API_CONFIG,
    body,
  })
}
