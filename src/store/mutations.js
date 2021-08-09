import { ADD_COUNTER, ADD_TO_CART } from './mutations-types'

export default {
  // mutations唯一的目的就是修改state中的状态
  // 每个方法尽可能完成的事件比较单一一点
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    // 添加商品时记录选中的状态checked 默认被选中
    payload.checked = true
    state.cartList.push(payload)
  }
}