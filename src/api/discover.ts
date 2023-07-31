import { http } from '@/utils/http'
import { ShoopListResult } from './home'

enum Api {
  GetCategoryApi = '/product/getCategory',
  GetAllProductApi = '/product/getAllProduct',
}

export interface Icategory {
  category_id: number
  category_name: string
}

type CategoryResult = {
  code: string
  category: Array<Icategory>
}

/**
 * @description 获取分类列表
 */
export function getCategoryApi(): Promise<CategoryResult> {
  return http.request({
    url: Api.GetCategoryApi,
    method: 'post',
  })
}

interface Idata {
  categoryID: number[]
  currentPage: number
  pageSize: number
}

/**
 * @description 获取全部商品分页数据
 */
export function getAllProductApi(data: Idata): Promise<ShoopListResult> {
  return http.request({
    url: Api.GetAllProductApi,
    method: 'post',
    data,
  })
}
