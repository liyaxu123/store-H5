import { http } from '@/utils/http'
import { Iproduct } from './home'

enum Api {
  GetDetailsPictureApi = '/product/getDetailsPicture',
  GetDetailsApi = '/product/getDetails',
  GetShopCountByUserIdApi = '/user/shoppingCart/getShopCount',
  AddToShoppingCarApi = '/user/shoppingCart/addShoppingCart',
  AddToCollectApi = '/user/collect/addCollect',
}

export interface IProductPicture {
  id: number
  intro: null
  product_id: number
  product_picture: string
}

type DetailPictureResult = {
  code: string
  ProductPicture: Array<IProductPicture>
}

/**
 * @description 通过ID获取商品详情图片
 */
export function getDetailPictureByIdApi(
  productID: number,
): Promise<DetailPictureResult> {
  return http.request({
    url: Api.GetDetailsPictureApi,
    method: 'post',
    data: {
      productID,
    },
  })
}

type DetailResult = {
  code: string
  Product: Array<Iproduct>
}

/**
 * @description 通过ID获取商品详情
 */
export function getDetailByIdApi(productID: number): Promise<DetailResult> {
  return http.request({
    url: Api.GetDetailsApi,
    method: 'post',
    data: {
      productID,
    },
  })
}

type ShopCountResult = {
  code: string
  count: number
}

/**
 * @description 通过 user_id 获取购物车数量
 */
export function getShopCountByUserIdApi(
  user_id: number,
): Promise<ShopCountResult> {
  return http.request({
    url: Api.GetShopCountByUserIdApi,
    method: 'post',
    data: {
      user_id,
    },
  })
}

type AddResult = {
  code: string
  msg: string
  shoppingCartData: []
}

/**
 * @description 加入购物车
 */
export function addToShoppingCarApi(
  user_id: number,
  product_id: number,
): Promise<AddResult> {
  return http.request({
    url: Api.AddToShoppingCarApi,
    method: 'post',
    data: {
      user_id,
      product_id,
    },
  })
}

/**
 * @description 加入收藏
 */
export function addToCollectApi(
  user_id: number,
  product_id: number,
): Promise<AddResult> {
  return http.request({
    url: Api.AddToCollectApi,
    method: 'post',
    data: {
      user_id,
      product_id,
    },
  })
}
