<!-- 商品卡片 -->
<template>
  <div class="w-full" @click="handleClick">
    <!-- 骨架屏 -->
    <Skeleton :loading="loading">
      <template #template>
        <div class="w-full">
          <div class="flex justify-center">
            <SkeletonImage :image-size="100" />
          </div>
          <div class="pt-3">
            <SkeletonParagraph />
            <SkeletonParagraph row-width="60%" />
            <SkeletonParagraph />
          </div>
        </div>
      </template>

      <div class="flex justify-center">
        <Image
          width="100"
          height="100"
          :src="`${$proxyUrl}/${data.product_picture}`"
        />
      </div>
      <p class="pt-3 text-sm font-600">{{ data.product_name }}</p>
      <TextEllipsis
        style="font-size: 12px; color: #919191; margin: 4px 0"
        :content="data.product_title"
      />
      <div>
        <span class="font-600" style="color: var(--primary-color)">
          {{ data.product_selling_price }}元
        </span>
        <span
          class="ml-1 text-xs text-gray-400 line-through"
          v-show="data.product_price != data.product_selling_price"
        >
          {{ data.product_price }}元
        </span>
      </div>
    </Skeleton>
  </div>
</template>

<script lang="ts">
export default {
  name: 'GoobCard',
}
</script>
<script setup lang="ts">
import {
  Image,
  TextEllipsis,
  Skeleton,
  SkeletonImage,
  SkeletonParagraph,
} from 'vant'
import { Iproduct } from '@/api/home'
import { useRouter } from 'vue-router'

interface Props {
  loading?: boolean
  data: Iproduct
}

const props = withDefaults(defineProps<Props>(), {
  loading: true,
})

const router = useRouter()

const handleClick = () => {
  router.push(`detail?productID=${props.data.product_id}`)
}
</script>

<style scoped>
::v-deep(.van-skeleton-image__icon::before) {
  font-size: 48px;
}
</style>
