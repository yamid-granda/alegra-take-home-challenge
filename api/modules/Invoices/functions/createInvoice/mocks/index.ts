import type { IAlegraInvoice, ICreateAlegraInvoiceBody } from '@api/modules/Invoices/types'

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

export const INVOICE: IAlegraInvoice = {
  id: '24',
  date: '2015-11-15',
  dueDate: '2015-12-15',
  datetime: '2024-07-22 21:22:02',
  observations: null,
  anotation: null,
  termsConditions: 'Esta factura se asimila en todos sus efectos a una letra de cambio de conformidad con el Art. 774 del código de comercio. Autorizo que en caso de incumplimiento de esta obligación sea reportado a las centrales de riesgo, se cobraran intereses por mora.',
  status: 'draft',
  client: {
    id: '1',
    name: 'Acrecer',
    identification: '',
    phonePrimary: '111 11 11',
    phoneSecondary: null,
    fax: '',
    mobile: '(333) 555-55-55',
    email: 'prueba2@alegra.com',
    address: {
      address: 'Avenida Madison',
      department: null,
      city: 'New York, USA',
    },
    kindOfPerson: '',
    regime: '',
    identificationObject: {
      type: null,
      number: '',
    },
  },
  subtotal: 3600,
  discount: 0,
  tax: 0,
  total: 3600,
  totalPaid: 0,
  balance: 3600,
  decimalPrecision: '0',
  barCodeContent: 'NumFac: 24\nFecFac: 20151115000000\nHorFac: 21:22:02-05:00\nNitFac: \nDocAdq: \nValFac: 3600.00\nValIva: 0.00\nValOtroIm: 0.00\nValTolFac: 3600.00\n',
  seller: {
    id: 1,
    name: 'Pedro Peréz',
    identification: null,
    observations: null,
  },
  items: [
    {
      id: 1,
      price: 10,
      quantity: 21,
      name: 'Mi item',
      description: null,
      discount: 0,
      reference: null,
      productKey: null,
      unit: 'unit',
      tax: [],
      total: 210,
    },
  ],
}
