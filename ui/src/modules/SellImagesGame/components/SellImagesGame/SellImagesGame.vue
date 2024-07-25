<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { queryImagesFromApi } from '@ui/modules/SellImagesGame/services/http/queryImagesFromApi'
import type { IGoogleImage } from '@api/modules/Images/types'
import { getGameSellers } from '@ui/modules/SellImagesGame/services/http/getGameSellers'
import type { IAlegraSeller } from '@api/modules/Sellers/types'
import { createInvoice } from '@ui/modules/Invoices/services/http/createInvoice'
import type { IAlegraInvoice, ICreateAlegraInvoiceBody, ICreateAlegraInvoiceItem } from '@api/modules/Invoices/types'
import Invoice from '@ui/modules/Invoices/components/Invoice/Invoice.vue'
import Loader from '@ui/components/Loader/Loader.vue'
import Input from '@ui/components/Input/Input.vue'
import Button from '@ui/components/Button/Button.vue'
import { getTodayStrDate } from '@ui/utils/getTodayStrDate'
import Form from '@ui/components/Form/Form.vue'
import SellerGameBoard from '../SellerGameBoard/SellerGameBoard.vue'
import { MAX_POINTS } from '../../configs'
import { saveSearchTextInLocalStorage } from '../../services/localStorage/saveSearchTextInLocalStorage'
import { getSellersFromLocalStorage } from '../../services/localStorage/getSellersFromLocalStorage'
import { saveImagesInLocalStorage } from '../../services/localStorage/saveImagesInLocalStorage'
import { saveGameDataInLocalStorage } from '../../services/localStorage/saveGameDataInLocalStorage'
import { deleteGameImagesFromLocalStorage } from '../../services/localStorage/deleteGameImagesFromLocalStorage'
import { deleteSearchTextFromLocalStorage } from '../../services/localStorage/deleteSearchTextFromLocalStorage'
import { deleteGameDataFromLocalStorage } from '../../services/localStorage/deleteGameDataFromLocalStorage'
import { saveSellersInLocalStorage } from '../../services/localStorage/saveSellersInLocalStorage'
import { getImagesFromLocalStorage } from '../../services/localStorage/getImagesFromLocalStorage'
import { getGameDataFromLocalStorage } from '../../services/localStorage/getGameDataFromLocalStorage'
import { getSearchTextFromLocalStorage } from '../../services/localStorage/getSearchTextFromLocalStorage'
import type { ISellImagesGameData } from './types'

// data
const sellers = ref<IAlegraSeller[]>([])
const searchText = ref('')
const images = ref<IGoogleImage[]>([])
const isLoadingImages = ref(false)
const gameData = ref<ISellImagesGameData>({})
const isRoundReady = ref(false)
const invoice = ref<IAlegraInvoice>()

// computed
const isReadyToStart = computed<boolean>(() => Boolean(sellers.value.length))
const sellersAreReady = computed<boolean>(() => Object.values(gameData.value).every(data => data.isReady))
const winnerSeller = computed<IAlegraSeller | null>(() => sellers.value.find(seller => gameData.value[seller.id]?.points >= MAX_POINTS) || null)

// watchers
watch(winnerSeller, (hasWinner) => {
  if (hasWinner)
    onWin()
})

watch(searchText, (newSearchText) => {
  saveSearchTextInLocalStorage(newSearchText)
})

// lifecycle
async function onCreate() {
  const storedSellers = getSellersFromLocalStorage()

  if (storedSellers) {
    sellers.value = storedSellers
    getSellers()
    setupGameInitialData()
    return
  }

  await getSellers()
  setupGameInitialData()
}

onCreate()

// events
async function onSearch() {
  if (!searchText.value.trim())
    return

  isLoadingImages.value = true
  const response = await queryImagesFromApi({ query: searchText.value })
  isLoadingImages.value = false

  if (!response.isOk)
    return

  images.value = response.result.items
  saveImagesInLocalStorage(images.value)
  isRoundReady.value = true
}

function onSellerReady(sellerId: number) {
  gameData.value[sellerId].isReady = true
}

function onSelectSeller(sellerId: number) {
  images.value = []
  isRoundReady.value = false
  gameData.value[sellerId].points += 3
  searchText.value = ''
  resetSellersReady()
  saveGameDataInLocalStorage(gameData.value)
  deleteGameImagesFromLocalStorage()
  deleteSearchTextFromLocalStorage()
}

async function onWin() {
  if (!winnerSeller.value)
    return

  deleteGameDataFromLocalStorage()
  deleteGameImagesFromLocalStorage()

  const totalPoints = Object.values(gameData.value).reduce((acc, data) => acc + data.points, 0)

  const items: ICreateAlegraInvoiceItem[] = [{
    id: 1,
    price: 10,
    quantity: totalPoints,
  }]

  const todayStrDate = getTodayStrDate()

  const body: ICreateAlegraInvoiceBody = {
    client: 1,
    date: todayStrDate,
    dueDate: todayStrDate,
    seller: winnerSeller.value.id,
    items,
  }

  const response = await createInvoice({ body })

  if (!response.isOk)
    return

  invoice.value = response.result
}

function onPlayAgain() {
  setupGameInitialData()
  isRoundReady.value = false
  invoice.value = undefined
}

// methods
async function getSellers() {
  const response = await getGameSellers()

  if (!response.isOk)
    return

  sellers.value = response.result
  saveSellersInLocalStorage(sellers.value)
}

function setupGameInitialData() {
  const storedImages = getImagesFromLocalStorage()
  const storedGameData = getGameDataFromLocalStorage()
  const storedSearchText = getSearchTextFromLocalStorage()

  searchText.value = storedSearchText || ''

  if (storedImages) {
    images.value = storedImages
    isRoundReady.value = true
  }

  if (storedGameData) {
    gameData.value = storedGameData
    return
  }

  sellers.value.forEach((seller) => {
    gameData.value[seller.id] = {
      points: 0,
      isReady: false,
    }
  })
}

function resetSellersReady() {
  Object.values(gameData.value).forEach((data) => {
    data.isReady = false
  })
}
</script>

<template>
  <div
    class="ss-sell-image-game"
    :class="{ 'ss-sell-image-game--disabled': !isRoundReady }"
  >
    <template v-if="isReadyToStart">
      <template v-if="winnerSeller">
        <p>Felicidades, <b>{{ winnerSeller.name }}</b> es el vendedor ganador de la factura Alegra.</p>

        <div v-if="invoice">
          <Invoice :invoice="invoice" />
          <Button @click="onPlayAgain">
            Jugar de Nuevo
          </Button>
        </div>

        <template v-else>
          <p>... Creando Factura ...</p>
          <Loader />
        </template>
      </template>

      <div v-else>
        <h2>Instrucciones:</h2>

        <ol>
          <li>Ingresa una palabra en el campo de texto.</li>
          <li>Presiona el botón buscar.</li>
          <li>Selecciona la imagen del vendedor que más te guste (de esta forma cada vendedor ganará puntos).</li>
          <li>Gana el vendedor que más primero logre 20 puntos, vamos, tú eres el jurado.</li>
        </ol>

        <Form
          class="ss-sell-image-game__search"
          @submit="onSearch"
        >
          <Input
            v-model="searchText"
            name="search"
            placeholder="Escribe algo para buscar imágenes ..."
            label="Búsqueda de Imágenes"
            :disabled="isRoundReady"
          />

          <Button :disabled="isRoundReady">
            Buscar
          </Button>
        </Form>

        <div class="ss-sell-image-game__sellers">
          <div
            v-for="(seller, index) in sellers"
            :key="seller.id"
            class="ss-sell-image-game__seller"
            @click="onSelectSeller(seller.id)"
          >
            <SellerGameBoard
              :seller="seller"
              :image="images?.[index]"
              :is-loading="isLoadingImages"
              :is-image-visible="sellersAreReady"
              :points="gameData[seller.id]?.points"
              @ready="onSellerReady(seller.id)"
            />
          </div>
        </div>
      </div>
    </template>

    <Loader v-else />
  </div>
</template>

<style lang="scss">
.ss-sell-image-game__search {
  margin-bottom: $s4;
  display: flex;
  gap: $s4;
  align-items: flex-end;
}

.ss-sell-image-game__sellers {
  display: flex;
  flex-direction: column;
  gap: $s4;
  transition: $transition-base;
}

.ss-sell-image-game__seller {
  cursor: pointer;
}

@include tablet {
  .ss-sell-image-game__sellers {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
  }
}

// modifiers
.ss-sell-image-game--disabled {
  .ss-sell-image-game__sellers {
    pointer-events: none;
    opacity: $opacity-disabled;
  }
}
</style>
