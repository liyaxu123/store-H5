import { http } from '@/utils/http'

enum Api {
  GetBannerApi = '/resources/carousel',
  GetProductByCategoryApi = '/product/getProductByCategory',
  GetProductHotListApi = '/product/getHotProduct',
}

export interface Icarousel {
  carousel_id: number
  describes: string
  imgPath: string
}

type BannerResult = {
  code: string
  carousel: Array<Icarousel>
}

/**
 * @description 获取轮播图图片数据
 */
export function getBannersApi(): Promise<BannerResult> {
  return http.request({
    url: Api.GetBannerApi,
    method: 'post',
  })
}

export interface Iproduct {
  category_id: number
  product_id: number
  product_intro: string
  product_name: string
  product_num: number
  product_picture: string
  product_price: number
  product_sales: number
  product_selling_price: number
  product_title: string
}

export type ShoopListResult = {
  code: string
  Product: Array<Iproduct>
  total: number
}
/**
 * @description 根据商品分类获取商品分页数据
 */
export function getProductByCategoryApi(data: {
  categoryID: number
  pageSize: number
  currentPage: number
}): Promise<ShoopListResult> {
  return http.request({
    url: Api.GetProductByCategoryApi,
    method: 'post',
    data,
  })
}

/**
 * @description 获取某个类别下热门商品数据
 */
export function getProductHotListApi(
  categoryName: string[],
): Promise<ShoopListResult> {
  return http.request({
    url: Api.GetProductHotListApi,
    method: 'post',
    data: {
      categoryName,
    },
  })
}
