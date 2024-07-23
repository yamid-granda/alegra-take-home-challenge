<script setup lang="ts">
import { computed } from 'vue'
import type { IInvoiceProps } from './types'

const props = defineProps<IInvoiceProps>()

const total = computed<number>(() => props.invoice.items.reduce((acc, item) => acc + item.total, 0))
</script>

<template>
  <div class="ss-invoice">
    <pre>
<b>Alegra Sistema de Facturación</b>

{{ invoice.termsConditions }}

<b>Fecha Hora</b> {{ invoice.datetime }}

<b>Items:</b>
<div v-for="item in invoice.items" :key="item.id">
-  <b>{{ item.name }}</b>, <b>Cantidad:</b> {{ item.quantity }}, <b>Precio Unitario:</b> ${{ item.price }}, <b>Total Item:</b> ${{ item.total }}
</div>
<b>Total Factura:</b> ${{ total }}
<b>Vendedor:</b> {{ invoice.seller.name }}
<b>Cliente:</b> {{ invoice.client.name }}
    </pre>
  </div>
</template>
