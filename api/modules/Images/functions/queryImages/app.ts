import { BadRequestError, InternalServerError } from 'http-errors-enhanced'
import type { ICustomAPIGatewayProxyResult } from '@api/types'
import { functionWrapper } from '@api/utils/functionWrapper'
import { queryImages } from '@api/modules/Images/services/http/queryImages'
import type { APIGatewayEvent } from 'aws-lambda'
import { QUERY_IMAGES_FAILED_ERROR, QUERY_PARAM_REQUIRED_ERROR } from '@api/modules/Images/configs'

async function handler(event: APIGatewayEvent): Promise<ICustomAPIGatewayProxyResult> {
  const searchParams = event?.queryStringParameters || {}
  const query = searchParams?.query

  if (!query) {
    throw new BadRequestError(QUERY_PARAM_REQUIRED_ERROR)
  }

  const response = await queryImages({ query })

  if (!response.isOk)
    throw new InternalServerError(QUERY_IMAGES_FAILED_ERROR)

  return {
    statusCode: 200,
    body: response.result,
  }
}

export const lambdaHandler = functionWrapper({ handler })
