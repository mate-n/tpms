<script setup lang="ts">
import { CartHelper } from '@/helpers/CartHelper'
import { CartItemService } from '@/services/backend-middleware/CartItemService'
import { CartService } from '@/services/backend-middleware/CartService'
import type { IAddItemToCartBody } from '@/shared/interfaces/cart/IAddItemToCartBody'
import type { ICartBody } from '@/shared/interfaces/cart/ICartBody'
import type { ICartItem } from '@/shared/interfaces/cart/ICartItem'
import type { IRetrieveCartBody } from '@/shared/interfaces/cart/IRetrieveCartBody'
import type { ISettleCartBody } from '@/shared/interfaces/cart/ISettleCartBody'
import type { IUpdateCartBody } from '@/shared/interfaces/cart/IUpdateCartBody'
import type { AxiosStatic } from 'axios'
import { inject, onMounted, ref, type Ref } from 'vue'
const cartHelper = new CartHelper()
const axios2: AxiosStatic | undefined = inject('axios2')
const cartService = new CartService(axios2)
const cartItemService = new CartItemService()

const cartItems: Ref<ICartItem[]> = ref([])

const createCart = () => {
  const cartBody: ICartBody = {
    action: 'create',
    profile_number: '639',
    cart_type: 2
  }

  cartService.createCart(cartBody).then((res) => {
    cartHelper.setCartNumber(res.cart_number)
    cartNumber.value = res.cart_number
  })
}

const cartNumber: Ref<string | null> = ref(null)

onMounted(() => {
  cartNumber.value = cartHelper.getCartNumber()
})

const addItemToCart = () => {
  if (cartNumber.value === null) {
    return
  }

  const addItemToCartBody: IAddItemToCartBody = {
    action: 'add',
    cart_id: cartNumber.value,
    arrival_date: '2024-07-01',
    departure_date: '2024-07-07',
    adults: 1,
    children: 0,
    units: 1,
    conservation_fees: 0,
    southafrican_adults: 0,
    sadc_adults: 0,
    international_adults: 0,
    southafrican_children: 0,
    sadc_children: 0,
    international_children: 0,
    pricing: {
      base_pricing: 2483,
      discount_web: 0,
      community_levy: 0,
      conservation_fees: 0
    },
    property_code: 19335,
    type_code: createRandomString(10),
    parent: 0,
    item_type: 1,
    gmsTimeSlotId: 0
  }

  cartItemService.addItemToCart(addItemToCartBody).then((res) => {
    console.log(res)
  })
}

const createRandomString = (length: number) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

const getItemsInCart = () => {
  if (cartNumber.value === null) {
    return
  }

  const retrieveCartBody: IRetrieveCartBody = {
    cart_number: cartNumber.value
  }

  cartItemService.getItemsInCart(retrieveCartBody).then((res) => {
    console.log(res)
    cartItems.value = res
  })
}

const settleCart = () => {
  if (cartNumber.value === null) {
    return
  }

  const settleCartBody: ISettleCartBody = {
    action: 'updatePayment',
    cart_number: cartNumber.value,
    payment_ref: '',
    payment_amount: '1999.14',
    payment_method: 'Credit Card',
    status: 'Confirmed'
  }

  cartService.settleCart(settleCartBody).then((res) => {
    console.log(res)
  })
}

const removeItem = (cartItem: ICartItem) => {
  cartItemService.removeItemFromCart(cartItem.id).then((res) => {
    console.log(res)
  })
}

const updateCart = () => {
  if (cartNumber.value === null) {
    return
  }

  const cartBody: IUpdateCartBody = {
    action: 'updateProfile',
    cart_number: cartNumber.value,
    profile_number: '639'
  }

  cartService.updateCart(cartBody).then((res) => {
    console.log(res)
  })
}
</script>

<template>
  <div>
    <h1>Cart Test View</h1>
    <div>
      {{ cartNumber }}
    </div>

    <div class="mb-2">
      <v-btn @click="createCart()">Create new cart</v-btn>
    </div>

    <div class="mb-2">
      <v-btn @click="updateCart()">Update cart</v-btn>
    </div>

    <div class="mb-2">
      <v-btn @click="addItemToCart()">Add item to cart</v-btn>
    </div>

    <div class="mb-2">
      <v-btn @click="getItemsInCart()">Get Items In Cart</v-btn>
    </div>

    <div class="mb-2">
      <v-btn @click="settleCart()">Settle Cart</v-btn>
    </div>

    <div v-for="cartItem of cartItems" :key="cartItem.id">
      <div>
        {{ cartItem.unit_id }}
        <v-btn @click="removeItem(cartItem)">Remove item</v-btn>
      </div>
    </div>
  </div>
</template>
