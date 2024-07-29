<script setup lang="ts">
import CartSearchForm from '@/components/carts/CartSearchForm.vue'
import type { IRetrieveCartResponseBody } from '@/shared/interfaces/cart/IRetrieveCartResponseBody'
import { ref, type Ref } from 'vue'
import CartTable from '@/components/carts/CartsTable.vue'
const found = (cartsInput: IRetrieveCartResponseBody[]) => {
  retrieveCartResponseBodies.value = cartsInput
  bodiesSearched.value = true
}

const bodiesSearched = ref(false)

const retrieveCartResponseBodies: Ref<IRetrieveCartResponseBody[]> = ref([])
</script>

<template>
  <CartSearchForm @found="(carts: IRetrieveCartResponseBody[]) => found(carts)"></CartSearchForm>
  <div class="d-flex justify-center">
    <v-card class="mt-2 mb-2" v-if="bodiesSearched && retrieveCartResponseBodies.length < 1">
      <v-card-title>No result found</v-card-title>
    </v-card>
  </div>
  <CartTable
    :retrieve-cart-response-bodies="retrieveCartResponseBodies"
    v-if="retrieveCartResponseBodies.length > 0"
  ></CartTable>
</template>
