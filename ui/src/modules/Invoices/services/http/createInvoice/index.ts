import type { IApiResponse } from '@ui/types'
import type { IAlegraInvoice, ICreateAlegraInvoiceBody } from '@api/modules/Invoices/types'
import { httpRequest } from '@ui/clients/http'
import { CREATE_INVOICE_API_CONFIG } from '@ui/modules/Invoices/configs'

interface ICreateInvoiceConfig {
  body: ICreateAlegraInvoiceBody
}

export async function createInvoice({ body }: ICreateInvoiceConfig): Promise<IApiResponse<IAlegraInvoice>> {
  return httpRequest<IAlegraInvoice>({
    ...CREATE_INVOICE_API_CONFIG,
    body,
  })
}
