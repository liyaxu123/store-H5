<template>
  <PullRefresh v-model="refreshing" @refresh="onRefresh">
    <!-- 轮播图 -->
    <Banner />
    <!-- 楼层 -->
    <GoodsClassify />

    <List :finished="true" finished-text="没有更多了">
      <!-- 手机热卖 -->
      <div class="p-2">
        <Cell title="手机热卖" />
      </div>
      <Grid :gutter="8" column-num="2" clickable>
        <GridItem v-for="item in phoneList" :key="item.product_id">
          <GoodCard :loading="!item" :data="item" />
        </GridItem>
      </Grid>
      <!-- 家电热门 -->
      <div class="p-2">
        <Cell title="家电热门" />
      </div>
      <Grid :gutter="8" column-num="2" clickable>
        <GridItem v-for="item in applianceHotList" :key="item.product_id">
          <GoodCard :loading="!item" :data="item" />
        </GridItem>
      </Grid>
      <!-- 热门配件 -->
      <div class="p-2">
        <Cell title="热门配件" />
      </div>
      <Grid :gutter="8" column-num="2" clickable>
        <GridItem v-for="item in accessoryHotList" :key="item.product_id">
          <GoodCard :loading="!item" :data="item" />
        </GridItem>
      </Grid>
    </List>
  </PullRefresh>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { Banner, GoodsClassify } from './components'
import { List, Cell, PullRefresh, Grid, GridItem } from 'vant'
import GoodCard from '@/components/GoodCard.vue'
import {
  getProductByCategoryApi,
  getProductHotListApi,
  Iproduct,
} from '@/api/home'

// 是否下拉刷新
const refreshing = ref<boolean>(false)
// 手机热卖数据列表
const phoneList = ref<Iproduct[]>([])
// 家电热门数据列表
const applianceHotList = ref<Iproduct[]>([])
// 热门配件数据列表
const accessoryHotList = ref<Iproduct[]>([])

onBeforeMount(() => {
  getPhoneList()
  getApplianceHotList()
  getAccessoryHotList()
})

// 获取手机列表
const getPhoneList = async () => {
  try {
    // 获取手机热卖列表
    const { Product } = await getProductByCategoryApi({
      categoryID: 1,
      pageSize: 6,
      currentPage: 1,
    })
    phoneList.value = Product
  } catch (err) {
    console.error(err)
  } finally {
    // 关闭下拉刷新
    refreshing.value = false
  }
}

// 获取家电热门
const getApplianceHotList = async () => {
  try {
    const { Product } = await getProductHotListApi(['电视机', '空调', '洗衣机'])
    applianceHotList.value = Product.slice(0, 6)
  } catch (err) {
    console.error(err)
  } finally {
    // 关闭下拉刷新
    refreshing.value = false
  }
}

// 获取热门配件
const getAccessoryHotList = async () => {
  try {
    const { Product } = await getProductHotListApi([
      '保护套',
      '保护膜',
      '充电器',
      '充电宝',
    ])
    accessoryHotList.value = Product.slice(0, 6)
  } catch (err) {
    console.error(err)
  } finally {
    // 关闭下拉刷新
    refreshing.value = false
  }
}

// 下拉刷新
const onRefresh = () => {
  refreshing.value = true
  // 清空列表数据
  phoneList.value = []
  applianceHotList.value = []
  accessoryHotList.value = []

  // 重新加载数据
  getPhoneList()
  getApplianceHotList()
  getAccessoryHotList()
}
</script>

<style scoped lang="scss"></style>
