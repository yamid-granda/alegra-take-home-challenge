import { httpRequest } from '@ui/clients/http'
import { QUERY_IMAGES_API_CONFIG } from '@ui/modules/SellImagesGame/configs'
import type { IGoogleImagesQueryResponse } from '@api/modules/Images/types'

interface IQueryImagesFromApiConfig {
  query: string
  signal?: AbortSignal
}

export async function queryImagesFromApi({ query, signal }: IQueryImagesFromApiConfig) {
  const searchParams = { query }

  return httpRequest<IGoogleImagesQueryResponse>({
    ...QUERY_IMAGES_API_CONFIG,
    searchParams,
    signal,
  })
}
