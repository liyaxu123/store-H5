import { http } from '@/utils/http'

enum Api {
  GetShoppingCartApi = '/user/shoppingCart/getShoppingCart',
  UpdateShopNumApi = '/user/shoppingCart/updateShoppingCart',
  DelShopApi = '/user/shoppingCart/deleteShoppingCart',
}

export interface IshoppingCartData {
  check: boolean
  id: number
  maxNum: number
  num: number
  price: number
  productID: number
  productImg: string
  productName: string
}

type ShoppingCartResult = {
  code: string
  shoppingCartData: IshoppingCartData[]
}

/**
 * @description 获取用户购物车数据
 */
export function getShoppingCartApi(
  user_id: number,
): Promise<ShoppingCartResult> {
  return http.request({
    url: Api.GetShoppingCartApi,
    method: 'post',
    data: {
      user_id,
    },
  })
}

interface Idata {
  user_id: number
  product_id: number
  num: number
}

type UpdateShopNumResult = {
  code: string
  msg: string
}

/**
 * @description 更新购物车中某个商品的数量
 */
export function updateShopNumApi(data: Idata): Promise<UpdateShopNumResult> {
  return http.request({
    url: Api.UpdateShopNumApi,
    method: 'post',
    data,
  })
}

interface IdelData {
  user_id: number
  product_id: number
}

type DelShopResult = {
  code: string
  msg: string
}

/**
 * @description 删除购物车中的商品
 */
export function delShopApi(data: IdelData): Promise<DelShopResult> {
  return http.request({
    url: Api.DelShopApi,
    method: 'post',
    data,
  })
}
