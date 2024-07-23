// HTTP
interface ISuccessApiResponse<Result> {
  isOk: true
  result: Result
}

interface IErrorApiResponse {
  isOk: false
  error: string
}

export type IApiResponse<Result> = ISuccessApiResponse<Result> | IErrorApiResponse

export interface IApiError {
  message: string
}

export type IHttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'

export interface IApiConfig {
  url: string
  method: IHttpMethod
  searchParams?: Record<string, string | number>
  basicAuth?: IBasicAuth
}

export interface IBasicAuth {
  username: string
  password: string
}
