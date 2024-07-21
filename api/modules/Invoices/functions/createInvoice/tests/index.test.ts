import type { APIGatewayProxyResult } from 'aws-lambda'
import { describe, expect, it } from 'vitest'
import { mockHttpPost } from '@ui/test-utils/mockHttpRequest'
import { CREATE_INVOICE_IN_ALEGRA_API_CONFIG } from '@api/modules/Invoices/configs'
import { lambdaHandler } from '../app'
import { CREATE_INVOICE_BODY } from '../mocks'

describe('createInvoice function', () => {
  it('creates the invoice', async () => {
    // GIVEN
    const { request } = mockHttpPost(CREATE_INVOICE_IN_ALEGRA_API_CONFIG.url)

    // WHEN
    const response: APIGatewayProxyResult = await lambdaHandler({
      body: JSON.stringify(CREATE_INVOICE_BODY),
    })

    // THEN
    expect(request.body).toEqual(CREATE_INVOICE_BODY)
    expect(response.statusCode).toBe(201)
  })
})
