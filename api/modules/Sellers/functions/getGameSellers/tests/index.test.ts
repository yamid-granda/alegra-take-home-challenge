import type { APIGatewayProxyResult } from 'aws-lambda'
import { describe, expect, it } from 'vitest'
import { mockHttpGet } from '@ui/test-utils/mockHttpRequest'
import { GET_GAME_SELLERS_API_CONFIG } from '@api/modules/Sellers/configs'
import { lambdaHandler } from '../app'
import { ALLEGRA_SELLERS_RESPONSE } from '../mocks'

describe('getGameSellers function', () => {
  it('responds 3 sellers', async () => {
    // GIVEN
    const { request } = mockHttpGet(`begin:${GET_GAME_SELLERS_API_CONFIG.url}`, ALLEGRA_SELLERS_RESPONSE)

    // WHEN
    const response: APIGatewayProxyResult = await lambdaHandler()

    // THEN
    expect(response.statusCode).toBe(200)
    expect(response.body).toBe(JSON.stringify(ALLEGRA_SELLERS_RESPONSE))
    expect(request.searchParams.get('limit')).toBe('3')
  })
})
