import { getTodayStrDate } from '@ui/utils/getTodayStrDate'

const todayStrDate = getTodayStrDate()

export const EXPECTED_CREATE_INVOICE_BODY = {
  client: 1,
  date: todayStrDate,
  dueDate: todayStrDate,
  seller: 1,
  items: [
    {
      id: 1,
      price: 10,
      quantity: 21,
    },
  ],
}

export const INVOICE_TEXT = `Alegra Sistema de Facturación

Esta factura se asimila en todos sus efectos a una letra de cambio de conformidad con el Art. 774 del código de comercio. Autorizo que en caso de incumplimiento de esta obligación sea reportado a las centrales de riesgo, se cobraran intereses por mora.

Fecha Hora 2024-07-22 21:22:02

Items:

-  Mi item, Cantidad: 21, Precio Unitario: $10, Total Item: $210

Total Factura: $210
Vendedor: Pedro Peréz
Cliente: Acrecer`
