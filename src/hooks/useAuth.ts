import { useUserStore } from '@/store/modules/user'
import { showConfirmDialog } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import qs from 'qs'

const useAuth = () => {
  const userStore = useUserStore()
  const route = useRoute()
  const router = useRouter()

  // 判断是否登录
  function checkLogin() {
    if (!userStore.isLogin) {
      showConfirmDialog({
        title: '提示',
        width: '320px',
        cancelButtonText: '随便逛逛',
        confirmButtonText: '去登录',
        message: '检测到您未登录，请登录后再操作',
      })
        .then(() => {
          let query = ''
          if (Object.keys(route.query).length) {
            query = qs.stringify(route.query)
            router.push(`login?redirect=${route.path}?${query}`)
          } else {
            router.push(`login?redirect=${route.path}`)
          }
        })
        .catch(() => {
          // on cancel
        })

      return false
    }

    return true
  }

  return {
    checkLogin,
  }
}

export default useAuth
