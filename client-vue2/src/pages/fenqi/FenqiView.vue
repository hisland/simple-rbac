<template>
  <div class="wrap">
    <Row>
      <i-col :span="12">已还: {{SumDone | formatPrice}} ({{DoneList.length}}期)</i-col>
      <i-col :span="12">未还: {{SumUndone | formatPrice}} ({{UndoneList.length}}期)</i-col>
    </Row>
    <table class="table1">
      <tr class="tr">
        <th class="th">#</th>
        <th class="th">金额</th>
        <th class="th">备注</th>
        <th class="th">还款时间</th>
        <th class="th">已还时间</th>
      </tr>
      <tr class="tr" v-for="(vv0, index0) in genList" :key="index0">
        <td class="td">{{ index0 + 1 }}</td>
        <td class="td">{{ vv0.amount | formatPrice }}</td>
        <td class="td">{{ vv0.remark }}</td>
        <td class="td">{{ vv0.repayTime | formatTime }}</td>
        <td class="td">{{ vv0.doneTime | formatTime }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import apiAxios from '@/apiAxios.js'

export default {
  components: {},
  data() {
    return {
      genList: [],
    }
  },
  watch: {},
  props: {
    fenqiId: String,
  },
  computed: {
    DoneList() {
      return this.genList.filter(vv1 => vv1.doneTime)
    },
    UndoneList() {
      return this.genList.filter(vv1 => !vv1.doneTime)
    },
    SumDone() {
      return this.DoneList.reduce((sum, vv1) => sum + vv1.amount, 0)
    },
    SumUndone() {
      return this.UndoneList.reduce((sum, vv1) => sum + vv1.amount, 0)
    },
  },
  methods: {
    async DoLoad() {
      const { data } = await apiAxios.get('/fenqi-detail-' + this.fenqiId)
      this.genList = data.result
    },
  },
  async mounted() {
    await this.DoLoad()
  },
}
</script>
<style lang="scss" scoped>
</style>
