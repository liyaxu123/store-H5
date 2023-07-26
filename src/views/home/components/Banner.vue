<template>
  <Swipe class="my-swipe" :autoplay="2000" indicator-color="white" lazy-render>
    <SwipeItem v-for="item in images" :key="item.carousel_id">
      <img :src="`http://localhost:3000/${item.imgPath}`" alt="" />
    </SwipeItem>
  </Swipe>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { Swipe, SwipeItem } from 'vant'
import { getBannersApi, Icarousel } from '@/api/home'

const images = ref<Icarousel[]>([])

onBeforeMount(async () => {
  try {
    const { carousel } = await getBannersApi()
    images.value = carousel
  } catch (error) {
    console.error(error)
  }
})
</script>

<style scoped lang="scss">
/* .my-swipe .van-swipe-item {
  height: 150px;
} */
</style>
