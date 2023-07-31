<template>
  <div class="discover-page">
    <!-- 搜索 -->
    <div class="p-3">
      <div
        class="p-2.5 text-sm text-center text-gray-500 bg-white rounded active:bg-gray-100"
      >
        搜索
      </div>
    </div>

    <!-- Tab -->
    <Tabs v-model:active="activeName" animated swipeable>
      <Tab
        v-for="item in categoryList"
        :key="item.category_id"
        :title="item.category_name"
        :name="item.category_id"
      >
        <List
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          class="mt-2"
        >
          <Grid :gutter="8" column-num="2" clickable>
            <GridItem v-for="item in goodList" :key="item.product_id">
              <GoodCard :loading="!item" :data="item" />
            </GridItem>
          </Grid>
        </List>
      </Tab>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch } from 'vue'
import { Tab, Tabs, List, Grid, GridItem } from 'vant'
import GoodCard from '@/components/GoodCard.vue'
import { getCategoryApi, getAllProductApi, Icategory } from '@/api/discover'
import { getProductByCategoryApi, Iproduct } from '@/api/home'

// 分类列表
const categoryList = ref<Icategory[]>([])
// 当前激活的Tab
const activeName = ref<number>(0)
// List是否已加载完成
const finished = ref<boolean>(false)
// List是否处于加载状态
const loading = ref<boolean>(false)
// 商品列表
const goodList = ref<Iproduct[]>([])
// 当前页码
const currentPage = ref<number>(1)

watch(
  () => activeName.value,
  () => {
    goodList.value = []
    currentPage.value = 1
    finished.value = false
  },
)

// 根据分类获取商品列表
const getProductByCategory = async (categoryId: number) => {
  try {
    const fn = categoryId === 0 ? getAllProductApi : getProductByCategoryApi

    const { Product, total } = await fn({
      categoryID: [categoryId],
      pageSize: 10,
      currentPage: currentPage.value,
    })

    goodList.value.push(...Product)

    // 加载状态结束
    loading.value = false
    currentPage.value++

    // 数据全部加载完成
    if (goodList.value.length >= total) {
      finished.value = true
    }
  } catch (err) {
    console.error(err)
  }
}

// List触底事件
const onLoad = () => {
  loading.value = true
  // 获取全部商品
  getProductByCategory(activeName.value)
}

onBeforeMount(async () => {
  // 获取所有分类
  const { category } = await getCategoryApi()
  category.unshift({
    category_id: 0,
    category_name: '全部',
  })
  categoryList.value = category
})
</script>

<style scoped></style>
