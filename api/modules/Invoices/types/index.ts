export interface ICreateAlegraInvoiceBody {
  client: number
  date: string
  dueDate: string
  seller: number
  items: ICreateAlegraInvoiceItem[]
}

export interface ICreateAlegraInvoiceItem {
  id: number
  price: number
  quantity: number
}

export interface IAlegraInvoice {
  id: string
  date: string
  dueDate: string
  datetime: string
  observations: string | null
  anotation: string | null
  termsConditions: string
  status: string
  items: IAlegraInvoiceItem[]
  client: IAlegraInvoiceClient
  subtotal: number
  discount: number
  tax: number
  total: number
  totalPaid: number
  balance: number
  decimalPrecision: string
  barCodeContent: string
  seller: IAlegraInvoiceSeller
}

interface IAlegraInvoiceClient {
  id: string
  name: string
  identification: string
  phonePrimary: string
  phoneSecondary: string | null
  fax: string
  mobile: string
  email: string
  address: IAlegraInvoiceAddress
  kindOfPerson: string
  regime: string
  identificationObject: {
    type: string | null
    number: string
  }
}

interface IAlegraInvoiceAddress {
  address: string
  department: string | null
  city: string
}

interface IAlegraInvoiceSeller {
  id: number
  name: string
  identification: string | null
  observations: string | null
}

export interface IAlegraInvoiceItem {
  id: number
  price: number
  quantity: number
  name: string
  description: string | null
  discount: number
  reference: string | null
  productKey: string | null
  unit: string
  tax: []
  total: number
}
