import fetchMock from 'fetch-mock'
import type { IHttpMethod } from '@ui/types'

interface IMockHttpConfig {
  url: string
  response?: unknown
  method?: IHttpMethod
}

interface IMockHttpRequest {
  body: unknown
  searchParams: URLSearchParams
}

interface IMockHttpRequestResponse {
  request: IMockHttpRequest
}

function mockHttpRequest({
  url,
  method,
  response,
}: IMockHttpConfig): IMockHttpRequestResponse {
  const methodConfig: IHttpMethod = method ?? 'get'
  const request: IMockHttpRequest = {
    body: undefined,
    searchParams: new URLSearchParams(),
  }

  fetchMock[methodConfig](url, mockHttpCallback(request, response))

  return {
    request,
  }
}

function mockHttpCallback(request: IMockHttpRequest, response: unknown) {
  return (url: string, opts: RequestInit) => {
    const newBody = opts?.body ? JSON.parse((opts?.body || '').toString()) : undefined
    const requestUrl = new URL(url)
    request.searchParams = requestUrl.searchParams

    if (request.body) {
      if (Array.isArray(request.body)) {
        request.body.push(newBody)
        return response
      }

      request.body = [request.body, newBody]
      return response
    }

    request.body = newBody
    return response
  }
}

export function mockHttpGet(url: string, response: unknown) {
  return mockHttpRequest({ url, method: 'get', response })
}

export function mockHttpPost(url: string, response: unknown = {}) {
  return mockHttpRequest({ url, method: 'post', response })
}

export function mockHttpPatch(url: string) {
  return mockHttpRequest({ url, method: 'patch' })
}

export function mockHttpPut(url: string) {
  return mockHttpRequest({ url, method: 'put' })
}

export function mockHttpDelete(url: string) {
  return mockHttpRequest({ url, method: 'delete' })
}
