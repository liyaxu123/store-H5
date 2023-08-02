<template>
  <Form @submit="onSubmit" class="mt-6" label-width="50">
    <CellGroup inset style="margin: 0">
      <Field
        v-model="form.userName"
        name="userName"
        label="用户名"
        placeholder="请输入用户名"
        :rules="[
          { required: true, message: '请填写用户名' },
          {
            pattern: userNamePattern,
            message: '字母开头,长度5-16之间,允许字母数字下划线',
          },
        ]"
      />
      <Field
        v-model="form.password"
        type="password"
        name="password"
        label="密码"
        placeholder="请输入密码"
        :rules="[
          { required: true, message: '请填写密码' },
          {
            pattern: passPattern,
            message: '字母开头,长度6-18之间,允许字母数字和下划线',
          },
        ]"
      />
    </CellGroup>
    <div class="pb-5 mt-6">
      <Button
        round
        block
        color="repeating-linear-gradient(-45deg, #00C3FF, #58FFF5)"
        native-type="submit"
      >
        登录
      </Button>
    </div>
  </Form>
</template>

<script lang="ts">
export default {
  name: 'LoginForm',
}
</script>
<script setup lang="ts">
import { reactive } from 'vue'
import { Form, Field, CellGroup, Button, showNotify } from 'vant'
import { Iform, LoginApi } from '@/api/user'
import { useUserStore } from '@/store/modules/user'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const userNamePattern = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/
const passPattern = /^[a-zA-Z]\w{5,17}$/

const form = reactive<Iform>({
  userName: '',
  password: '',
})

const onSubmit = async (values: Iform) => {
  try {
    const { msg, user } = await LoginApi(values)

    userStore.user = user
    showNotify({ type: 'success', message: msg })

    const redirect = route.query.redirect as string
    router.replace(redirect || 'home')
  } catch (err) {
    console.error(err)
    const { msg } = err as any
    showNotify({ type: 'danger', message: msg })
  }
}
</script>

<style scoped></style>
