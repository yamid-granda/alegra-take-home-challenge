import type { APIGatewayProxyResult } from 'aws-lambda'
import { describe, expect, it } from 'vitest'
import { mockHttpGet } from '@ui/test-utils/mockHttpRequest'
import { QUERY_IMAGES_API_CONFIG, QUERY_PARAM_REQUIRED_ERROR } from '@api/modules/Images/configs'
import { lambdaHandler } from '../app'
import { GOOGLE_IMAGES_RESPONSE } from '../mocks'

describe('queryImages function', () => {
  it('responds 3 images related to the query', async () => {
    // GIVEN
    const query = 'test-query'
    const { request } = mockHttpGet(`begin:${QUERY_IMAGES_API_CONFIG.url}`, GOOGLE_IMAGES_RESPONSE)

    // WHEN
    const response: APIGatewayProxyResult = await lambdaHandler({ queryStringParameters: { query } })

    // THEN
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(JSON.stringify(GOOGLE_IMAGES_RESPONSE))

    expect(request.body).toBeUndefined() // google api requirement
    expect(request.searchParams.get('q')).toBe(query)
    expect(request.searchParams.get('start')).toBe('1')
    expect(request.searchParams.get('num')).toBe('3')
    expect(request.searchParams.get('searchType')).toBe('image')
  })

  describe('validations', () => {
    it('has query url search param', async () => {
      // WHEN
      const response: APIGatewayProxyResult = await lambdaHandler()

      // THEN
      expect(response.statusCode).toEqual(400)
      expect(response.body).toEqual(QUERY_PARAM_REQUIRED_ERROR)
    })
  })
})
