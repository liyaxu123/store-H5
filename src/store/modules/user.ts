import { defineStore } from 'pinia'

interface UserInfo {
  user_id: number
  userName: string
}

export const useUserStore = defineStore('user', {
  state: () => ({ user: null as UserInfo | null }),
  getters: {
    isLogin: (state) =>
      state.user && Reflect.has(state.user, 'user_id') ? true : false,
  },
  actions: {},
  persist: {
    paths: ['user'],
    storage: sessionStorage,
  },
})
