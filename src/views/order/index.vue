<template>
  <div>
    <template v-for="(item, index) in orderList" :key="index">
      <Cell title="购物清单" :class="index !== 0 ? 'mt-4' : ''" />
      <OrderCard
        v-for="order in item"
        :key="order.id"
        :name="order.product_name"
        :imgUrl="`${$proxyUrl}/${order.product_picture}`"
        :price="order.product_price"
        :num="order.product_num"
        :productID="order.product_id"
      ></OrderCard>

      <Cell
        title="订单金额"
        :value="`${computedOrderTotal(item)}元`"
        value-class="primaryColor"
      />
      <Cell is-link>
        <template #title>
          <span class="text-gray-400 custom-title">订单编号</span>
          <span class="ml-5">{{ item[0].order_id }}</span>
        </template>
      </Cell>
      <Cell>
        <template #title>
          <span class="text-gray-400 custom-title">订单时间</span>
          <span class="ml-5">
            {{ dayjs(item[0].order_time).format('YYYY-MM-DD HH:mm:ss') }}
          </span>
        </template>
      </Cell>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { getOrderListApi, IorderData } from '@/api/order'
import { useUserStore } from '@/store/modules/user'
import useAuth from '@/hooks/useAuth'
import OrderCard from '@/components/OrderCard.vue'
import { Cell } from 'vant'
import dayjs from 'dayjs'

const userStore = useUserStore()
const { checkLogin } = useAuth()
const orderList = ref<IorderData[]>([])

onBeforeMount(() => {
  const isLogin = checkLogin()
  if (isLogin) {
    getOrderList()
  }
})

const getOrderList = async () => {
  try {
    const res = await getOrderListApi(userStore.user!.user_id)
    orderList.value = res.orders
  } catch (err) {
    console.error(err)
  }
}

const computedOrderTotal = (orderList: IorderData[]) => {
  const t = orderList.reduce((pre, cur) => {
    const cur_t = cur.product_num * cur.product_price
    return (pre += cur_t)
  }, 0)

  return t
}
</script>

<style scoped></style>
