import type { IApiError, IApiResponse, IBasicAuth, IHttpMethod } from '@ui/types'

interface IHttpRequestConfig {
  url: string
  method: IHttpMethod
  body?: unknown
  searchParams?: Record<string, string | number>
  basicAuth?: IBasicAuth
  signal?: AbortSignal
  config?: RequestInit
}

export async function httpRequest<Result>({
  url,
  body,
  method,
  searchParams,
  basicAuth,
  signal,
  config,
}: IHttpRequestConfig): Promise<IApiResponse<Result>> {
  try {
    let urlConfig: string = url
    const fetchConfig: RequestInit = config ?? {}

    if (body)
      fetchConfig.body = JSON.stringify(body)

    if (method)
      fetchConfig.method = method

    if (searchParams)
      urlConfig += getSearchParamsTextFromConfig(searchParams)

    if (basicAuth) {
      const { username, password } = basicAuth
      const { Buffer } = await import('node:buffer')
      const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64')

      fetchConfig.headers = {
        ...fetchConfig?.headers,
        Authorization: `Basic ${encodedCredentials}`,
      }
    }

    if (signal)
      fetchConfig.signal = signal

    const fetchResponse = await fetch(urlConfig, fetchConfig).then(response => response)

    if (!fetchResponse.ok) {
      return {
        isOk: false,
        error: fetchResponse?.statusText,
      }
    }

    const result = await fetchResponse.json() as Result

    return {
      isOk: true,
      result,
    }
  }

  catch (error: unknown) {
    const errorConfig = error as IApiError

    return {
      isOk: false,
      error: errorConfig?.message,
    }
  }
}

function getSearchParamsTextFromConfig(searchParams: Record<string, string | number>): string {
  const stringSearchParams: Record<string, string> = Object
    .entries(searchParams)
    .reduce(stringSearchParamsReducer, {} as Record<string, string>)

  const searchParamsText = new URLSearchParams(stringSearchParams).toString()
  return `?${searchParamsText}`
}

function stringSearchParamsReducer(
  params: Record<string, string>,
  [key, value]: [string, string | number],
): Record<string, string> {
  params[key] = String(value)
  return params
}
