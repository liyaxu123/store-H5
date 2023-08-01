<template>
  <div
    class="flex items-center justify-between submitBar van-hairline--top-bottom van-safe-area-bottom"
  >
    <div class="flex items-center">
      <Checkbox
        :modelValue="checkAll"
        @update:modelValue="handleCheckboxChange"
      >
        全选
      </Checkbox>
    </div>
    <div class="flex items-center">
      <div class="mr-3">
        合计：
        <span class="font-bold">￥{{ total }}</span>
        元
      </div>
      <Button
        round
        color="#ff6700"
        style="width: 100px; height: 40px"
        @click="handleSubmit"
      >
        结算
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SubmitBar',
}
</script>
<script setup lang="ts">
import { Checkbox, Button } from 'vant'

const emit = defineEmits(['submit', 'update:checkAll', 'checkAllChange'])

interface Props {
  checkAll: boolean
  total: string
}

withDefaults(defineProps<Props>(), {
  checkAll: false,
  total: '0.00',
})

const handleCheckboxChange = (checked: boolean) => {
  emit('update:checkAll', checked)
  emit('checkAllChange', checked)
}

const handleSubmit = () => {
  emit('submit')
}
</script>

<style scoped lang="scss">
.submitBar {
  width: 100%;
  height: 50px;
  position: fixed;
  left: 0;
  bottom: 50px;
  padding: 8px;
  background-color: #fff;
}
</style>
