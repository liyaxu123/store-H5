import { http } from '@/utils/http'

enum Api {
  LoginApi = '/users/login',
  RegisterApi = '/users/register',
}

export interface Iform {
  userName: string
  password: string
}

export interface Iuser {
  userName: string
  user_id: number
}

type LoginResult = {
  code: string
  msg: string
  user: Iuser
}

/**
 * @description 用户登录
 */
export function LoginApi(data: Iform): Promise<LoginResult> {
  return http.request({
    url: Api.LoginApi,
    method: 'post',
    data,
  })
}

type RegisterResult = {
  code: string
  msg: string
}

/**
 * @description 注册新用户
 */
export function RegisterApi(data: Iform): Promise<RegisterResult> {
  return http.request({
    url: Api.RegisterApi,
    method: 'post',
    data,
  })
}
