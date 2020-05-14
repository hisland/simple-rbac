<template>
  <div class="wrap">
    <div>
      <BtnOpenModal buttonText="添加" modalTitle="添加银行">
        <BankEdit @DoneSave="DoneAdd"></BankEdit>
      </BtnOpenModal>
    </div>
    <table class="table1">
      <tr class="tr">
        <th class="th">#</th>
        <th class="th">银行名称</th>
        <th class="th">银行简称</th>
        <th class="th">好处</th>
        <th class="th">操作</th>
      </tr>
      <tr class="tr" v-for="(vv0, index0) in list" :key="index0">
        <td class="td">{{ index0 + 1 }}</td>
        <td class="td">{{ vv0.bankName }}</td>
        <td class="td">{{ vv0.nickName }}</td>
        <td class="td">{{ vv0.scoreGood }}</td>
        <td class="td">
          <BtnOpenModal buttonText="修改" buttonSize="small" modalTitle="修改银行">
            <BankEdit :id="vv0._id" @DoneSave="DoneEdit($event, index0)"></BankEdit>
          </BtnOpenModal>
          <Button @click="DelOne(vv0._id, index0)" size="small">删除</Button>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import apiAxios from '@/apiAxios.js'
import BankEdit from './BankEdit.vue'

export default {
  components: {
    BankEdit,
  },
  data() {
    return {
      list: [],
    }
  },
  watch: {},
  props: {},
  computed: {},
  methods: {
    async LoadList() {
      const { data } = await apiAxios.get('/bank-list-all')
      this.list = data.result
    },
    DoneEdit(newItem, index0) {
      this.list.splice(index0, 1, newItem)
    },
    DoneAdd(newItem) {
      this.list.push(newItem)
    },
    async DelOne(id, index) {
      const { data } = await apiAxios.delete('/bank-one-' + id)
      this.list.splice(index, 1)
    },
  },
  async mounted() {
    await this.LoadList()
  },
}
</script>
<style lang="scss" scoped>
.itemWrap {
  display: flex;
}
</style>
