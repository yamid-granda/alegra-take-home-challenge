import { BadRequestError } from 'http-errors-enhanced'
import type { ICustomAPIGatewayProxyResult } from '@api/types'
import { functionWrapper } from '@api/utils/functionWrapper'
import { createInvoiceInAlegra } from '@api/modules/Invoices/services/http/createInvoiceInAlegra'
import type { APIGatewayEvent } from 'aws-lambda'
import type { ICreateAlegraInvoiceBody } from '@api/modules/Invoices/types'

async function handler(event: APIGatewayEvent): Promise<ICustomAPIGatewayProxyResult> {
  const body = JSON.parse(event.body || '{}') as ICreateAlegraInvoiceBody
  const response = await createInvoiceInAlegra({ body })

  if (!response.isOk) {
    throw new BadRequestError(response.error)
  }

  return {
    statusCode: 201,
    body: response.result,
  }
}

export const lambdaHandler = functionWrapper({ handler })
