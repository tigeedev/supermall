<template>
  <div id="params-info" v-if="Object.keys(paramsInfo).length !== 0">
    <!-- 产品参数 -->
    <div class="info">
      <table>
        <tr v-for="(item, index) in paramsInfo.ruleTables" :key="index">
          <td v-for="(item2, index2) in item" :key="index2">
            {{item2}}
          </td>
        </tr>
      </table>
    </div>
    <!-- 尺码说明 -->
    <div class="rule">
      <table>
        <tr v-for="(item, index) in paramsInfo.infoSet" :key="index">
          <td class="rule-key">{{item.key}}</td>
          <td class="rule-value">{{item.value}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailParamsInfo',
    props: {
      paramsInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  #params-info {
    padding: 20px 15px;
    font-size: 13px;
    border-bottom: 5px solid #f2f5f8;
  }

  #params-info table {
    width: 100%;
    border-collapse: collapse;
  }
  
  #params-info table tr{
    height: 42px;
  }

  #params-info table td {
    border-bottom: 1px solid rgba(100, 100, 100, .1);
  }

  .rule table {
    border-top: 1px solid rgba(0,0,0,.1);
  }

  .rule .rule-key {
    /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
    width: 90px;
  }

  .rule .rule-value {
    color: #ff6598;
  }
</style>