<template>
  <div>
    <div v-if="orderStore.orderList.length">
      <Cell title="购物清单" />
      <OrderCard
        v-for="item in orderStore.orderList"
        :key="item.productID"
        :name="item.productName"
        :imgUrl="`${$proxyUrl}/${item.productImg}`"
        :price="item.price"
        :num="item.num"
        :productID="item.productID"
      />

      <Cell title="收货地址" class="mt-3" />
      <Cell is-link>
        <template #title>
          <span class="text-gray-400 custom-title">姓名</span>
          <span class="ml-5">张三</span>
        </template>
      </Cell>
      <Cell is-link>
        <template #title>
          <span class="text-gray-400 custom-title">电话</span>
          <span class="ml-5">135***8623</span>
        </template>
      </Cell>
      <Cell is-link>
        <template #title>
          <span class="text-gray-400 custom-title">送至</span>
          <span class="ml-5">河南省 郑州市</span>
        </template>
      </Cell>

      <Cell title="发票信息" class="mt-3" />
      <Cell is-link>
        <template #title>
          <span class="text-gray-400 custom-title">电子发票</span>
          <span class="ml-5">个人</span>
        </template>
      </Cell>

      <Cell title="优惠券" class="mt-3" />
      <Cell is-link>
        <template #title>
          <span class="text-gray-400 custom-title">优惠券</span>
          <span class="ml-5">未使用优惠券</span>
        </template>
      </Cell>

      <Cell
        title="订单金额"
        :value="`${totalPrice}元`"
        class="mt-3"
        value-class="primaryColor"
      />
      <Cell
        title="商品总计"
        :value="`${totalPrice}元`"
        value-class="primaryColor"
      />
      <Cell title="运费" value="0元" value-class="primaryColor" />

      <div class="my-3">
        <Button color="#17a916" block @click="addOrder">使用微信支付</Button>
      </div>
    </div>

    <Empty
      v-else
      :image="CartEmpty"
      :image-size="[179.5, 136.5]"
      description="您的订单还是空的哦"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Cell, Empty, Button, showToast } from 'vant'
import OrderCard from '@/components/OrderCard.vue'
import { useOrderStore } from '@/store/modules/order'
import { useUserStore } from '@/store/modules/user'
import CartEmpty from '@/assets/imgs/cart-empty.png'
import { addOrderApi } from '@/api/order'
import { useRouter } from 'vue-router'

const orderStore = useOrderStore()
const userStore = useUserStore()
const router = useRouter()

const addOrder = async () => {
  try {
    const res = await addOrderApi({
      user_id: userStore.user!.user_id,
      products: orderStore.orderList.map((item) => ({
        productID: item.productID,
        num: item.num,
        price: item.price,
      })),
    })
    showToast({
      message: res.msg,
      icon: 'passed',
    })
    router.push('home')
  } catch (err) {
    console.error(err)
  }
}

const totalPrice = computed(() => {
  const t = orderStore.orderList.reduce((pre, cur) => {
    if (cur.check) {
      return (pre += cur.num * cur.price)
    } else {
      return pre
    }
  }, 0)

  return t
})
</script>

<style scoped></style>
