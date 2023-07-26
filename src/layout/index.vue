<template>
  <div class="app-wrapper">
    <van-config-provider theme="light">
      <!-- 顶部导航栏 -->
      <NavBar title="小小米" fixed placeholder />
      <!-- 页面视图 -->
      <div class="page">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </div>
      <!-- Tabbar -->
      <Tabbar fixed placeholder route>
        <TabbarItem replace to="/home" icon="wap-home-o">首页</TabbarItem>
        <TabbarItem replace to="/discover" icon="search">发现</TabbarItem>
        <TabbarItem replace to="/shoppingCar" icon="shopping-cart-o">
          购物车
        </TabbarItem>
        <TabbarItem replace to="/my" icon="contact">我的</TabbarItem>
      </Tabbar>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import { NavBar, Tabbar, TabbarItem } from 'vant'
</script>

<style scoped lang="scss">
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}

::v-deep(.van-nav-bar--fixed) {
  background-color: #ff6801;
  position: fixed !important;
}

::v-deep(.van-nav-bar__title) {
  color: #fff;
  font-weight: normal;
}

::v-deep(.van-tabbar--fixed) {
  position: fixed !important;
}
</style>
