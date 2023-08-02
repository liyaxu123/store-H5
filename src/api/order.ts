import { http } from '@/utils/http'

enum Api {
  AddToOrderApi = '/user/order/addOrder',
  GetOrderListApi = '/user/order/getOrder',
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

type AddOrderResult = {
  code: string
  msg: string
}

interface IproductInfo {
  productID: number
  price: number
  num: number
}

interface IaddOrderData {
  user_id: number
  products: IproductInfo[][]
}

/**
 * @description 添加订单数据
 */
export function addOrderApi(data: IaddOrderData): Promise<AddOrderResult> {
  return http.request({
    url: Api.AddToOrderApi,
    method: 'post',
    data,
  })
}

export interface IorderData {
  id: number
  order_id: number
  order_time: number
  product_id: number
  product_name: string
  product_num: number
  product_picture: string
  product_price: number
  user_id: number
}

type OrderListResult = {
  code: string
  orders: IorderData[]
}

/**
 * @description 获取订单列表数据
 */
export function getOrderListApi(user_id: number): Promise<OrderListResult> {
  return http.request({
    url: Api.GetOrderListApi,
    method: 'post',
    data: {
      user_id,
    },
  })
}
