import { http } from '@/utils/http'
import { Iproduct } from './home'

enum Api {
  GetCollectListApi = '/user/collect/getCollect',
  DelCollectApi = '/user/collect/deleteCollect',
}

export interface Icategory {
  category_id: number
  category_name: string
}

type GetCollectResult = {
  code: string
  collectList: Array<Iproduct>
}

/**
 * @description 获取收藏数据
 */
export function getCollectListApi(user_id: number): Promise<GetCollectResult> {
  return http.request({
    url: Api.GetCollectListApi,
    method: 'post',
    data: {
      user_id,
    },
  })
}

type DelCollectResult = {
  code: string
  msg: string
}

/**
 * @description 删除收藏数据
 */
export function delCollectApi(
  user_id: number,
  product_id: number,
): Promise<DelCollectResult> {
  return http.request({
    url: Api.DelCollectApi,
    method: 'post',
    data: {
      user_id,
      product_id,
    },
  })
}
