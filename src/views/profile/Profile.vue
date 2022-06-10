<template>
  <!-- 个人信息 -->
  <div id="profile">
    <nav-bar class="profile-nav">
      <div slot="center">
        超级商场
      </div>
    </nav-bar>
    
    <div>
      <user-info></user-info>
    </div>
    <!--2.没有单独封装: 不同的地方太多, 需要传过多的参数-->
    <div class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">0.00</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>分
        </div>
        <div class="account-info">我的积分</div>
      </div>
    </div>
    <list-view :list-data="orderList" class="order-list"></list-view>
    <list-view :list-data="serviceList" class="service-list"></list-view>
    <list-view :list-data="moreList" class="more-list"></list-view>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import UserInfo from './childComps/UserInfo';
import ListView from './childComps/ListView';

export default {
  name: 'Profile',
  data() { 
    return {
        orderList: [
          {icon: '#order', iconColor: '#ff8198', info: '我的消息'},
          {icon: '#point', iconColor: '#fc7b53', info: '积分商城'},
          {icon: '#vip', iconColor: '#ffc636', info: '会员卡'},
        ],
        serviceList: [
          {icon: '#service', iconColor: '#ff8198', info: '我的购物车'},
          {icon: '#download', iconColor: '#ff8198', info: '下载购物APP'},
        ],
        moreList:[
          {icon: '#expired', iconColor: '#ff8198', info: '设置'},
          {icon: '#vip', iconColor: '#ff8198', info: '更多'},
        ]
    }
  },
  methods:{
    test(){ }
  },
  components:{
    NavBar,
    UserInfo,
    ListView
  }
 }
</script>

<style scoped>
#profile{
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
  background-color: #f2f2f2;
}
.profile-nav{
  background-color: var(--color-tint);
  color: #fff;
/* 
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
  .account {
    display: flex;
  }

  .account-item {
    width: 100%;
    background-color: #fff;
    margin-right: 1px;
    text-align: center;
  }

  .account-item:last-of-type {
    margin-right: 0;
  }

  .account-item {
    color: #666;
    font-size: 13px;
    padding: 18px;
  }

  .account-item .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }

  .account-info {
    margin-top: 6px;
  }

  .order-list, .service-list {
    margin-top: 12px ;
    
  }
  .order-list, .more-list {
    margin-top: 12px;
  }
</style>