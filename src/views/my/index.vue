<template>
  <div>
    <div class="flex items-center gap-3 p-3 bg-white">
      <Image
        width="50"
        height="50"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        round
      />
      <p v-if="userStore.user?.userName">{{ userStore.user?.userName }}</p>
      <p class="text-blue-400" v-else @click="router.replace('login')">
        点击登录
      </p>
    </div>

    <Cell title="我的订单" is-link to="order" class="mt-3" />
    <Cell title="我的收藏" is-link to="collect" class="mt-3" />
    <Cell title="会员中心" is-link class="mt-3" />
    <Cell title="我的优惠券" is-link />
    <Cell title="我的F码" is-link />
    <Cell title="我的红包" is-link />
    <Cell title="在线客服" is-link class="mt-3" />
    <Cell title="设置" is-link />

    <div class="p-3 mt-3" v-if="userStore.user?.userName">
      <Button type="danger" block @click="logout">退出</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Image, Cell, Button } from 'vant'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'

const router = useRouter()
const userStore = useUserStore()

const logout = () => {
  sessionStorage.clear()
  localStorage.clear()
  router.replace('login')
}
</script>

<style scoped></style>
