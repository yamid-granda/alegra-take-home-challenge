import { httpRequest } from '@ui/clients/http'
import type { IGoogleImagesQueryResponse } from '@api/modules/Images/types'
import { QUERY_IMAGES_API_CONFIG } from '@api/modules/Images/configs'

interface IQueryImagesConfig {
  query: string
}

export async function queryImages({ query }: IQueryImagesConfig) {
  const searchParams = {
    ...QUERY_IMAGES_API_CONFIG.searchParams,
    q: query,
  }

  return httpRequest<IGoogleImagesQueryResponse>({
    ...QUERY_IMAGES_API_CONFIG,
    searchParams,
  })
}
