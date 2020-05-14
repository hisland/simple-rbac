<template>
  <div class="wrap">
    <table class="table1">
      <tr class="tr">
        <th class="th">#</th>
        <th class="th">姓名</th>
        <th class="th">卡片</th>
        <th class="th">总额度</th>
        <th class="th">下次账单</th>
        <th class="th">免息期</th>
        <th class="th">剩余额度</th>
        <th class="th">欠款</th>
      </tr>
      <tr class="tr">
        <td class="td"></td>
        <td class="td"></td>
        <td class="td"></td>
        <td class="td">
          <span class="money">{{SumAmount | formatPrice}}</span>
        </td>
        <td class="td"></td>
        <td class="td"></td>
        <td class="td">
          <span class="money">{{SumRestAmount | formatPrice}}</span>
        </td>
        <td class="td">
          <span class="money">{{SumCostAmount | formatPrice}}</span>
        </td>
      </tr>
      <tr class="tr" v-for="(vv0, index0) in list" :key="index0">
        <td class="td">{{ index0 + 1 }}</td>
        <td class="td">{{ vv0.userId.realName }}</td>
        <td class="td">{{ vv0.cardNickName }}</td>
        <td class="td">
          <span class="money">{{ vv0.totalLimit | formatPrice }}</span>
        </td>
        <td class="td">{{ vv0.nextBillDays }}天 ({{vv0.nextBillDate}})</td>
        <td class="td">{{ vv0.nextRepayDays }}天 ({{vv0.nextRepayDate}})</td>
        <td class="td" style="position: relative;">
          <RestLeng :rest="vv0.restAmount" :total="vv0.totalLimit" justState></RestLeng>
          <span class="money" style="position: relative;">{{ vv0.restAmount | formatPrice }}</span>
        </td>
        <td class="td">
          <BtnOpenModal modalTitle="刷卡明细">
            <span slot="button" class="money">
              <span>{{ vv0.totalLimit-vv0.restAmount | formatPrice }}</span>
              ({{vv0.takeList.length}}笔
              <Icon type="md-eye" />)
            </span>
            <CardBillTake :cardId="vv0._id"></CardBillTake>
          </BtnOpenModal>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import apiAxios from '@/apiAxios.js'
import ViewTake from './bill/ViewTake.vue'
import CardBillTake from './CardBillTake.vue'

export default {
  components: {
    // ViewTake,
    CardBillTake,
  },
  data() {
    return {
      QueryObj: {
        cardType: 'cc',
      },
      list: [],
      banklist: [],
      userList: [],
      editItem: {},
    }
  },
  watch: {},
  props: {},
  computed: {
    SumAmount() {
      return this.list.reduce((sum, item) => {
        if (item.cardType === 'cc') {
          return sum + item.totalLimit
        } else {
          return sum
        }
      }, 0)
    },
    SumRestAmount() {
      return this.list.reduce((sum, item) => {
        if (item.cardType === 'cc' && item.restAmount > 0) {
          return sum + item.restAmount
        } else {
          return sum
        }
      }, 0)
    },
    SumCostAmount() {
      return this.list.reduce((sum, item) => {
        if (item.cardType === 'cc') {
          return sum + (item.totalLimit - item.restAmount)
        } else {
          return sum
        }
      }, 0)
    },
  },
  methods: {
    async LoadList() {
      const { data } = await apiAxios.get('/card-today', {
        params: this.QueryObj,
      })
      data.result.forEach((vv1, index1) => {
        vv1.isEdit = false
      })
      this.list = data.result
    },
    DoneAdd(newItem) {
      this.list.unshift(newItem)
    },
    DoneEdit(newItem, index0) {
      this.list.splice(index0, 1, newItem)
    },
    async DelOne(id, index) {
      this.$Modal.confirm({
        title: '删除确认',
        content: '删除?',
        onOk: async () => {
          const { data } = await apiAxios.delete('/card-one-' + id)
          this.list.splice(index, 1)
        },
      })
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
.money {
  display: block;
  text-align: right;
  padding-right: 5px;
  cursor: pointer;
}
</style>
