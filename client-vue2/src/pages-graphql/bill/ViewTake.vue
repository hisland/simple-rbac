<template>
  <table class="table">
    <tr class="tr">
      <th class="th">#</th>
      <th class="th">姓名</th>
      <th class="th">卡片</th>
      <th class="th">金额</th>
      <th class="th">时间</th>
    </tr>
    <tr class="tr" v-for="(vv0, index0) in list" :key="index0">
      <td class="td">{{ index0 + 1 }}</td>
      <td class="td">{{ vv0.cardId.userId.realName }}</td>
      <td class="td">{{ vv0.cardId.cardNickName }}</td>
      <td class="td">{{ vv0.money | formatPrice }}</td>
      <td class="td">{{ vv0.time | formatTime }}</td>
    </tr>
  </table>
</template>
<script>
import apiAxios from '@/apiAxios.js'

export default {
  components: {},
  data() {
    return {
      list: [],
    }
  },
  watch: {},
  props: {
    billId: String,
  },
  computed: {},
  methods: {
    async DoQuery() {
      const { data } = await apiAxios.get('/bill-take-list', {
        params: {
          billId: this.billId,
        },
      })
      this.list = data.result
    },
  },
  async mounted() {
    await this.DoQuery()
  },
}
</script>
<style lang="scss" scoped>
</style>
