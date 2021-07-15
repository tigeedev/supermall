import { request } from './request'

// 对 request.js 进一步封装，负责首页的数据请求

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}