import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { mockHttpGet, mockHttpPost } from '@ui/test-utils/mockHttpRequest'
import { GET_GAME_SELLERS_API_CONFIG, QUERY_IMAGES_API_CONFIG } from '@ui/modules/SellImagesGame/configs'
import { ALLEGRA_SELLERS_RESPONSE } from '@api/modules/Sellers/functions/getGameSellers/mocks'
import { GOOGLE_IMAGES_RESPONSE } from '@api/modules/Images/functions/queryImages/mocks'
import userEvent from '@testing-library/user-event'
import { CREATE_INVOICE_API_CONFIG } from '@ui/modules/Invoices/configs'
import { INVOICE } from '@api/modules/Invoices/functions/createInvoice/mocks'
import fetchMock from 'fetch-mock'
import SellImagesGame from '../SellImagesGame.vue'
import { EXPECTED_CREATE_INVOICE_BODY, INVOICE_TEXT } from '../mocks'

beforeEach(() => {
  fetchMock.reset()
})

describe('sell images game', () => {
  it('when a seller has 20 on more points, creates an invoice associated to the winner', async () => {
    // GIVEN
    mockHttpGet(GET_GAME_SELLERS_API_CONFIG.url, ALLEGRA_SELLERS_RESPONSE)
    mockHttpGet(`begin:${QUERY_IMAGES_API_CONFIG.url}`, GOOGLE_IMAGES_RESPONSE)
    const { request: createInvoiceRequest } = mockHttpPost(CREATE_INVOICE_API_CONFIG.url, INVOICE)

    render(SellImagesGame)
    const searchText = 'new image text search'
    const searchInput = await screen.findByLabelText('Búsqueda de Imágenes')

    // WHEN
    for (let points = 3; points <= 21; points += 3) {
      await userEvent.type(searchInput, searchText)

      const images = await screen.findAllByRole('img')
      await userEvent.click(images[0])

      const pointsCounter = await screen.findByText(`${points} puntos`)
      expect(pointsCounter).toBeInTheDocument()
    }

    const winnerText = await screen.findByText('Felicidades, ', { exact: false })
    const winnerQuantityItems = await screen.findAllByText('21', { exact: false })
    const invoiceText = winnerQuantityItems[0].textContent?.trim()

    // THEN
    expect(createInvoiceRequest.body).toEqual(EXPECTED_CREATE_INVOICE_BODY)
    expect(winnerText.textContent).toBe(`Felicidades, ${ALLEGRA_SELLERS_RESPONSE[0].name} es el vendedor ganador de la factura Alegra.`)
    expect(invoiceText).toBe(INVOICE_TEXT)
  })

  it('game has the right initial data to the 3 players', async () => {
    // GIVEN
    mockHttpGet(GET_GAME_SELLERS_API_CONFIG.url, ALLEGRA_SELLERS_RESPONSE)
    render(SellImagesGame)

    const startPoints = await screen.findAllByText('0 puntos')
    const maxPoints = await screen.findAllByText('de 20')

    // THEN
    expect(startPoints).toHaveLength(3)
    expect(maxPoints).toHaveLength(3)

    for (const seller of ALLEGRA_SELLERS_RESPONSE) {
      const sellerName = await screen.findByText(seller.name, { exact: false })
      expect(sellerName).toBeVisible()
    }
  })

  it('each seller is allowed to be voted', async () => {
    // GIVEN
    mockHttpGet(GET_GAME_SELLERS_API_CONFIG.url, ALLEGRA_SELLERS_RESPONSE)
    mockHttpGet(`begin:${QUERY_IMAGES_API_CONFIG.url}`, GOOGLE_IMAGES_RESPONSE)
    render(SellImagesGame)
    const searchInput = await screen.findByLabelText('Búsqueda de Imágenes')
    const searchText = 'new image text search'

    for (let imgIndex = 0; imgIndex < 3; imgIndex += 1) {
      await userEvent.type(searchInput, searchText)

      // WHEN
      const images = await screen.findAllByRole('img')
      await userEvent.click(images[imgIndex])

      // THEN
      const pointsCounters = await screen.findAllByText(`3 puntos`)
      const expectedQuantity = imgIndex + 1
      expect(pointsCounters).toHaveLength(expectedQuantity)
    }
  })
})
