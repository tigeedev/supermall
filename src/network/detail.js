import { request } from './request'

// 详情页数据
export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}


/**
 * 详情页数据整合 (重点)
 * 
 * 通常来说真实返回的数据都是很复杂的，而且数据很有可能是分离的,
 * 所以一定要先对数据进行整合，这样开发时只需要面对一个对象即可。
 */
export class goodsInfo {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title; //标题
    this.price = itemInfo.price; //价格
    this.oldPrice = itemInfo.oldPrice; //原价
    this.discount = itemInfo.discountDesc; //今日特价
    this.columns = columns; //销量/收藏
    this.services = services //退货补运费/全国包邮/7天无理由退货/72小时发货
  }
}