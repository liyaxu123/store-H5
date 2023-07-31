<template>
  <div class="login-page">
    <!-- 顶部背景图片-->
    <div class="login_bg login_bg--top">
      <img src="@/assets/imgs/login_top2.jpg" alt="背景图片" />
    </div>
    <div class="login_bg login_bg--top">
      <img
        class="rocket rocket-sussuspension"
        src="@/assets/imgs/login_top3.png"
        alt="飞机"
      />
    </div>

    <!-- 登录/注册表单 -->
    <div class="login_wrapper">
      <!-- 登录/注册切换 -->
      <div class="flex items-center justify-center login_mode flex-nowrap">
        <div
          :class="loginMode === 'login' ? 'login_mode_item--active' : ''"
          class="login_mode_item"
          @click="changMode('login')"
        >
          登录
        </div>
        <div
          class="login_mode_item"
          :class="loginMode === 'register' ? 'login_mode_item--active' : ''"
          @click="changMode('register')"
        >
          注册
        </div>
        <!-- 滑块-->
        <div
          class="login_mode_slider"
          :style="{ left: loginMode === 'login' ? '0px' : '50%' }"
        ></div>
      </div>

      <!-- 表单 -->
      <div class="login_info">
        <component
          :is="loginMode === 'login' ? LoginForm : RegisterForm"
          @registerSuccess="changMode('login')"
        ></component>
      </div>
    </div>

    <!-- 底部背景图片-->
    <div class="login_bg login_bg--bottom">
      <img src="@/assets/imgs/login_bottom_bg.jpg" alt="底部背景" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LoginForm, RegisterForm } from './components'

const loginMode = ref('login')

const changMode = (mode: string) => {
  loginMode.value = mode
}
</script>

<style scoped lang="scss">
.login-page {
  height: 100vh;
  background-color: #fff;
  position: relative;
  z-index: 1;

  .login_bg {
    position: fixed;

    &.login_bg--top {
      top: 0;
      left: 0;
      right: 0;
      width: 100%;

      .rocket {
        width: 200px;
        height: 200px;
        margin: 25px 28%;
        will-change: transform;
      }
    }

    &.login_bg--bottom {
      bottom: -5px;
      left: 0;
      right: 0;
      width: 100%;

      img {
        width: 100%;
        will-change: transform;
      }
    }
  }

  /* 登录表单容器 */
  .login_wrapper {
    position: absolute;
    left: 0;
    top: 201px;
    width: 100%;
    z-index: 2;

    /* 切换滑块 */
    .login_mode {
      position: relative;
      margin: 0 auto;
      width: 238px;
      height: 38px;
      background-color: #ffffff;
      box-shadow: 0px 5px 25px 0px rgba(0, 3, 72, 0.1);
      border-radius: 19px;

      .login_mode_item {
        height: 38px;
        width: 100%;
        line-height: 38px;
        text-align: center;
        font-size: 15px;
        color: #908f8f;
        letter-spacing: 1em;
        text-indent: 1em;
        z-index: 2;
        transition: all 0.4s;
      }

      .login_mode_item--active {
        font-weight: bold;
        color: #ffffff;
      }

      .login_mode_slider {
        box-sizing: border-box;
        position: absolute;
        height: inherit;
        width: calc(238px / 2);
        border-radius: inherit;
        box-shadow: 0px 9px 36px 9px rgba(0, 195, 255, 0.1);
        z-index: 1;
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        background-image: repeating-linear-gradient(-45deg, #ff3181, #ff8331);
        color: #ffffff;
        left: 0px;
      }
    }

    .login_info {
      margin: 0 15px;
      margin-top: 52px;
      padding: 15px 20px;
      padding-bottom: 0;
      border-radius: 10px;
      /* background-color: #ffff; */
      /* box-shadow: 0px 5px 25px 0px rgba(0, 3, 72, 0.1); */
    }
  }
}

/* 悬浮动画 */
.rocket-sussuspension {
  animation: suspension 3s ease-in-out infinite;
}

/* 飞机动画 */
@keyframes suspension {
  0%,
  100% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(-0.8rem, 1rem);
  }
}
</style>
