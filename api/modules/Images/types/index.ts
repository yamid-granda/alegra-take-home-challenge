export interface IGoogleImagesQueryResponse {
  items: IGoogleImage[]
}

export interface IGoogleImage {
  link: string
  title: string
  image: IGoogleImageImage
}

interface IGoogleImageImage {
  thumbnailLink: string
}
