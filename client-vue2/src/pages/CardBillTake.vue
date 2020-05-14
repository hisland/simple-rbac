<template>
  <div>
    <div v-if="!billList.length">没有账单</div>
    <div class="billBlock" v-for="(vv1, index1) in billList" :key="index1">
      <div>
        <span class="billTime">{{vv1.billYear}}-{{vv1.billMonth}}</span>
        <span class="billMoney">
          <span v-if="vv1.setDate">手工金额: {{vv1.setMoney | formatPrice}}</span>
          <span v-else>账单金额: {{vv1.autoMoney | formatPrice}}</span>
        </span>
        <span class="billRepay">还款时间: {{vv1.repayTime | formatTime('date')}}({{vv1.repayDays}}天)</span>
      </div>
      <table class="table1">
        <tr class="tr">
          <th class="th">#</th>
          <th class="th">姓名</th>
          <th class="th">卡片</th>
          <th class="th">金额</th>
          <th class="th">时间</th>
        </tr>
        <tr class="tr" v-for="(vv0, index0) in vv1.takeList" :key="index0">
          <td class="td">{{ index0 + 1 }}</td>
          <td class="td">{{ vv0.cardId.userId.realName }}</td>
          <td class="td">{{ vv0.cardId.cardNickName }}</td>
          <td class="td">{{ vv0.money | formatPrice }}</td>
          <td class="td">{{ vv0.time | formatTime }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import apiAxios from '@/apiAxios.js'

export default {
  components: {},
  data() {
    return {
      billList: [],
    }
  },
  watch: {},
  props: {
    cardId: String,
  },
  computed: {},
  methods: {
    async DoQuery() {
      const { data } = await apiAxios.get('/card-bill-take', {
        params: {
          cardId: this.cardId,
        },
      })
      this.billList = data.result
    },
  },
  async mounted() {
    await this.DoQuery()
  },
}
</script>
<style lang="scss" scoped>
.billBlock {
  margin-bottom: 15px;
}
.billTime {
}
.billMoney {
  margin: 0 20px;
}
.billRepay {
}
</style>
