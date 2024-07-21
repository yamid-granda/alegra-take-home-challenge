import { InternalServerError } from 'http-errors-enhanced'
import type { ICustomAPIGatewayProxyResult } from '@api/types'
import { functionWrapper } from '@api/utils/functionWrapper'
import { getGameSellersFromAlegra } from '@api/modules/Sellers/services/http/getGameSellersFromAlegra'

async function handler(): Promise<ICustomAPIGatewayProxyResult> {
  const response = await getGameSellersFromAlegra()

  if (!response.isOk)
    throw new InternalServerError(response.error)

  return {
    statusCode: 200,
    body: response.result,
  }
}

export const lambdaHandler = functionWrapper({ handler })
