import { defineStore } from 'pinia'
import { IshoppingCartData } from '@/api/shoppingCar'

export const useOrderStore = defineStore('order', {
  state: () => ({ orderList: [] as IshoppingCartData[] }),
  actions: {},
})
