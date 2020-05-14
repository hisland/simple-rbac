<template>
  <div class="wrap">
    <div>
      <BtnOpenModal buttonText="添加" modalTitle="添加分期记录">
        <FenqiEdit @DoneSave="DoneAdd"></FenqiEdit>
      </BtnOpenModal>
    </div>

    <table class="table1">
      <tr class="tr">
        <th class="th">#</th>
        <th class="th">姓名</th>
        <th class="th">卡片</th>
        <th class="th">名称</th>
        <th class="th">开始时间</th>
        <th class="th">金额</th>
        <th class="th">期数</th>
        <th class="th">操作</th>
      </tr>
      <tr class="tr" v-for="(vv0, index0) in list" :key="index0">
        <td class="td">{{ index0 + 1 }}</td>
        <td class="td">{{ vv0.cardId.userId.realName }}</td>
        <td class="td">{{ vv0.cardId.cardNickName }}</td>
        <td class="td">{{ vv0.name }}</td>
        <td class="td">{{ vv0.startTime | formatTime }}</td>
        <td class="td">
          <span v-if="vv0.doneCount!==vv0.repayCount">{{ vv0.doneAmount | formatPrice }}/</span>
          <span>{{ vv0.sumAmount | formatPrice }}</span>
        </td>
        <td class="td">
          <span>{{ vv0.doneCount }}/{{ vv0.repayCount }}</span>
          <Tag v-if="vv0.doneCount===vv0.repayCount" color="error">完</Tag>
        </td>
        <td class="td">
          <BtnOpenModal buttonText="明细" buttonSize="small" modalTitle="查看分期记录">
            <FenqiView :fenqiId="vv0._id"></FenqiView>
          </BtnOpenModal>
          <Button @click="DelOne(vv0._id, index0)" size="small">删除</Button>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import apiAxios from '@/apiAxios.js'
import FenqiEdit from './FenqiEdit.vue'
import FenqiView from './FenqiView.vue'

export default {
  components: {
    FenqiEdit,
    FenqiView,
  },
  data() {
    return {
      list: [],
      QueryObj: {
        cardId: null,
      },
    }
  },
  watch: {},
  props: {},
  computed: {},
  methods: {
    async LoadList() {
      const { data } = await apiAxios.get('/fenqi-list-all', {
        params: this.QueryObj,
      })
      this.list = data.result
    },
    DoneEdit(newItem, index0) {
      this.list.splice(index0, 1, newItem)
    },
    DoneAdd(newItem) {
      this.list.push(newItem)
    },
    async DelOne(id, index) {
      const { data } = await apiAxios.delete('/fenqi-one-' + id)
      this.list.splice(index, 1)
    },
  },
  async mounted() {
    await this.LoadList()
  },
}
</script>
<style lang="scss" scoped>
</style>
