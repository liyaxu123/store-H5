<template>
  <div class="pb-16">
    <!-- 轮播图 -->
    <Swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="#8a8a8a"
      lazy-render
    >
      <SwipeItem
        v-for="(item, index) in bannerList"
        :key="item.id"
        @click="previewImg(index)"
      >
        <img :src="`${$proxyUrl}/${item.product_picture}`" alt="" />
      </SwipeItem>
    </Swipe>
    <!-- 详细信息 -->
    <div v-if="goodsDetail" class="p-2 bg-white">
      <p class="pt-3 text-sm font-bold">{{ goodsDetail.product_name }}</p>
      <TextEllipsis
        style="font-size: 12px; color: #919191; margin: 4px 0"
        :content="goodsDetail.product_intro"
        rows="3"
        expand-text="展开"
        collapse-text="收起"
      />
      <div class="font-600" style="color: var(--primary-color)">
        {{ goodsDetail.product_selling_price }}元
      </div>
    </div>
    <!-- 地址 -->
    <CellGroup class="mt-2">
      <Cell is-link>
        <template #title>
          <span class="text-xs">送至</span>
          <span class="ml-4 font-bold">河南省 郑州市</span>
        </template>
      </Cell>
      <Cell is-link>
        <template #title>
          <span class="text-xs">已选</span>
          <span class="ml-4 font-bold">{{ goodsDetail?.product_name }}</span>
        </template>
      </Cell>
    </CellGroup>

    <!-- 猜你喜欢 -->
    <div class="p-2">
      <Cell title="猜你喜欢" />
    </div>
    <Grid :gutter="8" column-num="2" clickable>
      <GridItem v-for="item in phoneList" :key="item.product_id">
        <GoodCard :loading="!item" :data="item" />
      </GridItem>
    </Grid>

    <!-- 动作栏 -->
    <ActionBar>
      <ActionBarIcon
        icon="cart-o"
        :badge="shopCount"
        :badge-props="{
          showZero: false,
          offset: [10, 0],
        }"
        text="购物车"
        class="px-4 mr-4"
        to="shoppingCar"
      />
      <ActionBarButton
        color="#ff6801"
        type="warning"
        text="加入购物车"
        @click="addToShoppingCar"
      />
      <ActionBarButton
        color="#b0b0b0"
        type="danger"
        text="喜欢"
        @click="addToCollect"
      />
    </ActionBar>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, getCurrentInstance, watch } from 'vue'
import {
  Swipe,
  SwipeItem,
  TextEllipsis,
  ActionBar,
  ActionBarIcon,
  ActionBarButton,
  showImagePreview,
  Cell,
  CellGroup,
  Grid,
  GridItem,
  showConfirmDialog,
  showToast,
} from 'vant'
import GoodCard from '@/components/GoodCard.vue'
import { useRoute, useRouter } from 'vue-router'
import {
  getDetailPictureByIdApi,
  IProductPicture,
  getDetailByIdApi,
  getShopCountByUserIdApi,
  addToShoppingCarApi,
  addToCollectApi,
} from '@/api/detail'
import { getProductByCategoryApi, Iproduct } from '@/api/home'
import { useUserStore } from '@/store/modules/user'
import useAuth from '@/hooks/useAuth'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { checkLogin } = useAuth()
const productID = ref<any>(route.query.productID)
const app = getCurrentInstance()!.appContext.app

// 轮播图数据
const bannerList = ref<IProductPicture[]>([])
// 商品详情
const goodsDetail = ref<Iproduct | null>(null)
const phoneList = ref<Iproduct[]>([])
const shopCount = ref<number>(0)

watch(
  () => route.query.productID,
  (newProductID) => {
    if (newProductID) {
      productID.value = newProductID
      getGoodPicture(newProductID)
      getGoodDetailInfo(newProductID)
    }
  },
)

onBeforeMount(async () => {
  try {
    getGoodPicture(productID.value)
    getGoodDetailInfo(productID.value)
    getShopCount()
    getPhoneList()
  } catch (error) {
    console.error(error)
  }
})

// 加入购物车
const addToShoppingCar = () => {
  // 判断是否登录
  const isLogin = checkLogin()

  if (isLogin) {
    const user_id = userStore.user?.user_id

    // 加入购物车
    addShoppingCar(user_id!, productID.value)
  }
}

// 添加到收藏
const addToCollect = () => {
  const isLogin = checkLogin()

  if (isLogin) {
    const user_id = userStore.user?.user_id

    addCollect(user_id!, productID.value)
  }
}

const addShoppingCar = async (user_id: number, product_id: number) => {
  try {
    const res = await addToShoppingCarApi(user_id, product_id)
    shopCount.value++
    showToast(res.msg)
  } catch (err) {
    console.error(err)
    const { msg } = err as {
      code: string
      msg: string
    }
    showToast(msg)
  }
}

const addCollect = async (user_id: number, product_id: number) => {
  try {
    const res = await addToCollectApi(user_id, product_id)
    showToast(res.msg)
  } catch (err) {
    console.error(err)
    const { msg } = err as {
      code: string
      msg: string
    }
    showToast(msg)
  }
}

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
  }
}

// 获取商品详情
const getGoodDetailInfo = async (productID: any) => {
  try {
    const { Product } = await getDetailByIdApi(productID)
    goodsDetail.value = Product[0]
  } catch (err) {
    console.error(err)
  }
}

// 获取商品轮播图
const getGoodPicture = async (productID: any) => {
  try {
    const { ProductPicture } = await getDetailPictureByIdApi(productID)

    bannerList.value = ProductPicture
  } catch (err) {
    console.error(err)
  }
}

// 获取用户购物车商品数量
const getShopCount = async () => {
  try {
    if (userStore.user?.user_id) {
      const user_id = userStore.user?.user_id

      const { count } = await getShopCountByUserIdApi(user_id)
      shopCount.value = count
    }
  } catch (err) {
    console.error(err)
  }
}

// 图片预览
const previewImg = (startPosition: number) => {
  showImagePreview({
    images: bannerList.value.map(
      (item) =>
        `${app.config.globalProperties.$proxyUrl}/${item.product_picture}`,
    ),
    startPosition,
  })
}
</script>

<style scoped></style>
