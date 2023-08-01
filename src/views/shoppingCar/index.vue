<template>
  <div>
    <div class="mb-16" v-if="shoppingCarList.length">
      <ShopCard
        class="van-hairline--top-bottom"
        v-for="(item, index) in shoppingCarList"
        :key="item.id"
        :name="item.productName"
        :imgUrl="`${$proxyUrl}/${item.productImg}`"
        :price="item.price"
        v-model:checked="item.check"
        v-model:num="item.num"
        :maxNum="item.maxNum"
        :productID="item.productID"
        @numChange="handleNumChange(index, $event)"
        @delete="handleDelete(item.productID, index)"
        @checkChange="handleCheckChange"
      />
    </div>

    <Empty
      v-else
      :image="CartEmpty"
      :image-size="[179.5, 136.5]"
      description="您的购物车还是空的哦"
    />

    <SubmitBar
      v-model:checkAll="checkAll"
      :total="totalPrice"
      @checkAllChange="handleCheckAllChange"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from 'vue'
import {
  getShoppingCartApi,
  IshoppingCartData,
  updateShopNumApi,
  delShopApi,
} from '@/api/shoppingCar'
import { useUserStore } from '@/store/modules/user'
import useAuth from '@/hooks/useAuth'
import ShopCard from './components/ShopCard.vue'
import SubmitBar from './components/SubmitBar.vue'
import { Empty, showToast } from 'vant'
import CartEmpty from '@/assets/imgs/cart-empty.png'
import { debounce } from 'lodash'

const userStore = useUserStore()
const { checkLogin } = useAuth()
const shoppingCarList = ref<IshoppingCartData[]>([])
const checkAll = ref<boolean>(false)
// 合计总价格
const totalPrice = computed(() => {
  const t = shoppingCarList.value.reduce((pre, cur) => {
    if (cur.check) {
      return (pre += cur.num * cur.price)
    } else {
      return pre
    }
  }, 0)

  return t.toFixed(2)
})

onBeforeMount(() => {
  const isLogin = checkLogin()

  if (isLogin) {
    const user_id = userStore.user!.user_id
    getShopCartList(user_id)
  }
})

// 处理商品数量变化
const handleNumChange = (index: number, val: number) => {
  updateShopNum(shoppingCarList.value[index].productID, val)
}

// 处理结算
const handleSubmit = () => {
  console.log('submit')
}

// 处理删除
const handleDelete = async (productID: number, index: number) => {
  try {
    const res = await delShopApi({
      user_id: userStore.user!.user_id,
      product_id: productID,
    })
    shoppingCarList.value.splice(index, 1)
    showToast(res.msg)
  } catch (err) {
    console.error(err)
  }
}

// 全选/反选
const handleCheckChange = () => {
  checkAll.value = shoppingCarList.value.every((item) => item.check)
}

const handleCheckAllChange = (checked: boolean) => {
  shoppingCarList.value.forEach((item) => {
    item.check = checked
  })
}

const getShopCartList = async (user_id: number) => {
  try {
    const res = await getShoppingCartApi(user_id)
    shoppingCarList.value = res.shoppingCartData
  } catch (err) {
    console.error(err)
  }
}

// 更新商品数量
const updateShopNum = debounce(async (product_id: number, num: number) => {
  try {
    const res = await updateShopNumApi({
      user_id: userStore.user!.user_id,
      product_id,
      num,
    })
    showToast(res.msg)
  } catch (err) {
    console.error(err)
  }
}, 1500)
</script>

<style scoped></style>
