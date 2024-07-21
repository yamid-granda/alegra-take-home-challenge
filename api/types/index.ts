import type { APIGatewayProxyResult } from 'aws-lambda'

// functions
export interface ICustomAPIGatewayProxyResult extends Omit<APIGatewayProxyResult, 'body'> {
  body: unknown
}
