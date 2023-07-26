import { http } from '@/utils/http'

enum Api {
  GetBannerApi = '/resources/carousel',
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
