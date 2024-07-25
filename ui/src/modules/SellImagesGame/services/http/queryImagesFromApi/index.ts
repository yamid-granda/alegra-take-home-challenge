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
  return {
    isOk: true,
    result: {
      items: [
        {
          title: 'Pesa, as part of a consortium, will build trams for Jerusalem ...',
          link: 'https://www.railway.supply/wp-content/uploads/2023/09/img_3030.png',
          image: {
            thumbnailLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiIexj6UYIDn-0yFjYJdeaHxftBxE1b5qXVWSvUkTdeHSVSB5vhs8pjg&s',
          },
        },
        {
          title: 'Percutaneous Epididymal Sperm Aspiration (PESA) | Male Fertility ...',
          link: 'https://www.akruti-ivf.com/admin/uploads/images/Pesa_IMAGE22.png',
          image: {
            thumbnailLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVzFJU4Cumu013dubqD98vxgAaJbWtmDs7AvAnHKzITlRRrDckVkqHLgg&s',
          },
        },
        {
          title: 'How to Make Pesa (Boiled Fish and Vegetables in Ginger Broth ...',
          link: 'http://blog.junbelen.com/wp-content/uploads/2011/02/Pesa-43.jpg',
          image: {
            thumbnailLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh5KwddedVPxu4z2HV8MtVFwfZL81Fdx-InxpUn1L7muMNw1Xk09mruqg&s',
          },
        },
      ],
    },
  }

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
