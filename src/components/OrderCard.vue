<template>
  <div class="flex items-center gap-2 p-3 bg-white van-hairline--top-bottom">
    <Image width="60" height="60" :src="imgUrl" />
    <div class="flex items-center justify-between flex-1">
      <div class="flex-1 w-0 van-ellipsis">{{ name }}</div>
      <span class="mr-2 text-gray-400">×{{ num }}</span>
      <div style="color: var(--primary-color); width: 100px; text-align: right">
        {{ price }}元
      </div>
    </div>
  </div>
  <slot name="footer" />
</template>

<script lang="ts">
export default {
  name: 'OrderCard',
}
</script>
<script setup lang="ts">
import { Image } from 'vant'

interface Props {
  name: string
  imgUrl: string
  price: number
  num: number
  productID: number
}

withDefaults(defineProps<Props>(), {
  name: '小米C99 Pro',
  price: 0,
  imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
  num: 1,
})
</script>

<style scoped></style>
