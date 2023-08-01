<template>
  <SwipeCell>
    <div class="flex items-center p-2 bg-white">
      <div class="flex items-center">
        <Checkbox
          :modelValue="checked"
          @update:modelValue="handleCheckboxChange"
        />
      </div>
      <div class="flex-1 ml-3">
        <div class="flex items-center">
          <div
            class="p-3"
            @click="router.push(`detail?productID=${productID}`)"
          >
            <Image width="68" height="68" :src="imgUrl" />
          </div>
          <div class="flex justify-between flex-1">
            <div
              class="flex-1 w-0 mr-3 font-semibold van-ellipsis"
              @click="router.push(`detail?productID=${productID}`)"
            >
              {{ name }}
            </div>
            <div style="color: var(--primary-color)">{{ price }}元</div>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div style="color: var(--primary-color)">小计：{{ subtotal }}元</div>
          <div class="flex items-center">
            <Stepper
              :default-value="num"
              min="0"
              :max="maxNum"
              integer
              @change="handleNumChange"
            />
          </div>
        </div>
      </div>
    </div>

    <!--右侧删除 -->
    <template #right>
      <Button
        square
        text="删除"
        type="danger"
        style="height: 100%"
        @click="handleDelete"
      />
    </template>
  </SwipeCell>
</template>

<script lang="ts">
export default {
  name: 'ShopCard',
}
</script>
<script setup lang="ts">
import { computed } from 'vue'
import { Checkbox, Image, Icon, Stepper, SwipeCell, Button } from 'vant'
import { useRouter } from 'vue-router'

const router = useRouter()

const emit = defineEmits([
  'update:num',
  'update:checked',
  'checkChange',
  'numChange',
  'delete',
])

interface Props {
  name: string
  imgUrl: string
  price: number
  checked: boolean
  num: number
  maxNum: number
  productID: number
}

const props = withDefaults(defineProps<Props>(), {
  name: '小米C99 Pro',
  price: 0,
  imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
  checked: false,
  num: 1,
  maxNum: 5,
})

const subtotal = computed(() => {
  return props.num * props.price
})

const handleCheckboxChange = (checked: boolean) => {
  emit('update:checked', checked)
  emit('checkChange', checked)
}

const handleNumChange = (val: string) => {
  emit('update:num', val)
  emit('numChange', val)
}

const handleDelete = () => {
  emit('delete')
}
</script>

<style scoped lang="scss"></style>
