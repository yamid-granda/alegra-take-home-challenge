import { httpRequest } from '@ui/clients/http'
import { QUERY_IMAGES_API_CONFIG } from '@ui/modules/SellImagesGame/configs'
import type { IGoogleImagesQueryResponse } from '@api/modules/Images/types'
import type { IApiResponse } from '@ui/types'
import { DUMMY_IMAGES } from './mocks'

interface IQueryImagesFromApiConfig {
  query: string
  signal?: AbortSignal
}

export async function queryImagesFromApi({ query, signal }: IQueryImagesFromApiConfig): Promise<IApiResponse<IGoogleImagesQueryResponse>> {
  const searchParams = { query }

  const response = await httpRequest<IGoogleImagesQueryResponse>({
    ...QUERY_IMAGES_API_CONFIG,
    searchParams,
    signal,
  })

  if (!response.isOk) {
    // if google api fails by max daily request or other reasons, returns dummy images
    return {
      isOk: true,
      result: { items: DUMMY_IMAGES },
    }
  }

  return response
}
