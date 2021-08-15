<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="info-header">
      <div>用户评价</div>
      <div>
        <span class="info-more">更多</span>
        <i class="header-arrow"></i>
      </div>
    </div>

    <div class="info-user">
      <img :src="commentInfo.user.avatar | imgFilter">
      <span>{{commentInfo.user.uname}}</span>
    </div>

    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="detail-other">
        <!-- 服务器返回的时间戳 | 过滤器处理 -->
        <span class="detail-created">{{commentInfo.created | showDate}}</span>
        <span class="detail-style">{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs">
        <img v-for="(item, index) in commentInfo.images" :src="item | imgFilter" :key="index">
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from 'common/utils'

  export default {
    name: 'DetailCommentInfo',
    props: {
      commentInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    filters: {
      // 将时间戳 转成 时间格式化字符串
      showDate(value) {
        // 1. 时间戳转成Date对象
        // 时间戳 1535694739（秒）
        let date = new Date(value*1000);
        
        // 2. 将date格式化，转成对应的字符串
        return formatDate(date,'yyyy-MM-dd hh:mm');
      },
      imgFilter(value) {
        // 解决打包时详情页图片加载不出来的问题
        return 'http:' + value
      }
    }
  }
</script>

<style scoped>
  .comment-info {
    padding: 0 15px 20px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-header {
    display: flex;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;
    border-bottom: 3px solid #f2f5f8;
  }

  /* 绘制箭头 */
  .info-header .header-arrow {
    display: inline-block;
    position: relative;
    top: -1px;
    width: 8px;
    height: 8px;
    border-right: 1px solid #6f6f6f;
    border-bottom: 1px solid #6f6f6f;
    transform: rotate(-45deg);
  }

  .info-user {
    display: flex;
    align-items: center;
    margin-top: 10px;
 }

  .info-user img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .info-detail p {
    font-size: 13px;
    margin: 10px 0 8px;
  }

  .detail-other {
    margin-bottom: 8px;
  }

  .detail-other span {
    font-size: 12px;
    color: #a6a6a6;
  }

  .detail-other .detail-created {
    margin-right: 10px;
  }

  .info-imgs img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>