<template>
  <div class="py-2">
    <Grid :gutter="8" column-num="2" clickable v-if="goodList.length">
      <GridItem v-for="(item, index) in goodList" :key="item.product_id">
        <Badge content="Hot" :offset="[30, -5]">
          <GoodCard :loading="!item" :data="item" />

          <template #content>
            <Icon
              name="cross"
              class="badge-icon"
              @click="handleRemove(item.product_id, index)"
            />
          </template>
        </Badge>
      </GridItem>
    </Grid>

    <Empty
      v-else
      :image="CartEmpty"
      :image-size="[179.5, 136.5]"
      description="您还没有任何收藏哦"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { Grid, GridItem, Badge, Icon, showToast, Empty } from 'vant'
import GoodCard from '@/components/GoodCard.vue'
import { Iproduct } from '@/api/home'
import { getCollectListApi, delCollectApi } from '@/api/collect'
import { useUserStore } from '@/store/modules/user'
import useAuth from '@/hooks/useAuth'
import CartEmpty from '@/assets/imgs/cart-empty.png'

const { checkLogin } = useAuth()
const userStore = useUserStore()
// 商品列表
const goodList = ref<Iproduct[]>([])

// 获取收藏商品列表
const getProduct = async () => {
  try {
    const res = await getCollectListApi(userStore.user!.user_id)
    goodList.value = res.collectList
  } catch (err) {
    console.error(err)
  }
}

const handleRemove = async (product_id: number, index: number) => {
  try {
    const user_id = userStore.user!.user_id
    const res = await delCollectApi(user_id, product_id)
    goodList.value.splice(index, 1)
    showToast(res.msg)
  } catch (err) {
    console.log(err)
  }
}

onBeforeMount(() => {
  const isLogin = checkLogin()
  if (isLogin) {
    getProduct()
  }
})
</script>

<style scoped></style>
