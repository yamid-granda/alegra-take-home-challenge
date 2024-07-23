export type ISellImagesGameData = Record<string, ISellImagesGameSellerData>

interface ISellImagesGameSellerData {
  points: number
  isReady: boolean
}
