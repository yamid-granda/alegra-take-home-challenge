import type { IApiConfig } from '@ui/types'

// api configs
export const QUERY_IMAGES_API_CONFIG: IApiConfig = {
  url: 'https://customsearch.googleapis.com/customsearch/v1',
  method: 'get',
  searchParams: {
    key: process.env.GOOGLE_API_KEY ?? '',
    cx: process.env.GOOGLE_API_CX ?? '',
    searchType: 'image',
    start: 1,
    num: 3,
  },
}

// error messages
export const QUERY_PARAM_REQUIRED_ERROR = 'query url search param is required'
export const QUERY_IMAGES_FAILED_ERROR = 'Failed to query images'
