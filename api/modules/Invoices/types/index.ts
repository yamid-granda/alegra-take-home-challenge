export interface ICreateAlegraInvoiceBody {
  client: number
  date: string
  dueDate: string
  seller: number
  items: ICreateAlegraInvoiceItem[]
}

interface ICreateAlegraInvoiceItem {
  id: number
  price: number
  quantity: number
}

export interface IAlegraInvoice {
  id: string
  items: IAlegraInvoiceItem[]
}

interface IAlegraInvoiceItem {
  name: string
  description: string
  price: number
  discount: number
  reference: string
  quantity: number
  id: number
  productKey: string
  unit: string
  tax: []
  total: number
}
