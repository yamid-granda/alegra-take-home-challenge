import type { ICustomAPIGatewayProxyResult } from '@api/types'
import type { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda'
import middy from '@middy/core'
import httpErrorHandler from '@middy/http-error-handler'
import cors from '@middy/http-cors'

interface IFunctionWrapperConfig {
  handler: IHandler
}

type IHandler = (
  event: APIGatewayEvent,
  context: Context,
) => Promise<ICustomAPIGatewayProxyResult>

type IFunctionWrapperResponse = (event?: Partial<APIGatewayEvent>, context?: Partial<Context>) => Promise<APIGatewayProxyResult>

export function functionWrapper({ handler: inputHandler }: IFunctionWrapperConfig): IFunctionWrapperResponse {
  const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    const result = await inputHandler(event, context)
    return {
      ...result,
      body: JSON.stringify(result.body),
    }
  }

  const handlerWrapper = middy()
    .use(httpErrorHandler())
    .use(cors())
    .handler(handler)

  return handlerWrapper as (event?: Partial<APIGatewayEvent>, context?: Partial<Context>) => Promise<APIGatewayProxyResult>
}
