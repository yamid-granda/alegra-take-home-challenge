import type { ICreateAlegraInvoiceBody } from '@api/modules/Invoices/types'

export const CREATE_INVOICE_BODY: ICreateAlegraInvoiceBody = {
  client: 1,
  date: '2015-11-15',
  dueDate: '2015-12-15',
  seller: 2,
  items: [
    {
      id: 1,
      price: 120,
      quantity: 30,
    },
  ],
}
