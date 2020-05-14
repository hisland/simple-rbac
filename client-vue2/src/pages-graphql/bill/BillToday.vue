<template>
  <div class="wrap">
    <div style="padding:10px;">
      <RadioGroup :value="ViewType" type="button" @input="ChangeType">
        <Radio label="今天"></Radio>
        <Radio label="按月"></Radio>
      </RadioGroup>

      <template v-if="ViewType==='今天'">
        <Button style="margin-left:20px" ref="textForCopy">复制</Button>
      </template>
    </div>
    <Form :label-width="40" v-if="ViewType==='按月'">
      <FormItem label="年">
        <RadioGroup v-model="QueryObj.year" type="button" @on-change="DoQueryHistory()">
          <Radio :label="2017"></Radio>
          <Radio :label="2018"></Radio>
          <Radio :label="2019"></Radio>
          <Radio :label="2020"></Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="月">
        <RadioGroup v-model="QueryObj.month" type="button" @on-change="DoQueryHistory()">
          <Radio key="-1" label="-1">整年</Radio>
          <Radio v-for="(vv0, index0) in 12" :key="index0" :label="vv0"></Radio>
        </RadioGroup>
      </FormItem>
    </Form>

    <table class="table">
      <tr class="tr">
        <th class="th">#</th>
        <th class="th">姓名</th>
        <th class="th">卡片</th>
        <th class="th">自动金额</th>
        <th class="th">手工金额</th>
        <th class="th">差额</th>
        <th class="th">出单时间</th>
        <th class="th">应还时间</th>
        <th class="th">已还时间</th>
      </tr>
      <tr class="tr">
        <td class="td"></td>
        <td class="td"></td>
        <td class="td"></td>
        <td class="td" style="text-align:right;">{{Sum1 | formatPrice}}</td>
        <td class="td"></td>
        <td class="td"></td>
        <td class="td"></td>
        <td class="td"></td>
        <td class="td"></td>
      </tr>
      <tr class="tr" v-for="(vv0, index0) in list" :key="index0">
        <td class="td">{{ index0 + 1 }}</td>
        <td class="td">{{ vv0.cardId.userId.realName }}</td>
        <td class="td">{{ vv0.cardId.cardNickName }}</td>
        <template v-if="vv0.type==='fenqi'">
          <td class="td" style="text-align:right;">
            <span>{{ vv0.amount | formatPrice }}</span>
          </td>
          <td class="td">
            <BtnOpenModal :buttonText="vv0.remark" buttonSize="small" modalTitle="查看分期记录">
              <FenqiView :fenqiId="vv0.fenqiId"></FenqiView>
            </BtnOpenModal>
          </td>
          <td class="td"></td>
        </template>
        <template v-else>
          <td class="td" style="text-align:right;">
            <BtnOpenModal modalTitle="刷卡明细">
              <div slot="button" style="cursor:pointer">
                <span>{{ vv0.autoMoney | formatPrice }}</span>
                <span>(</span>
                <span>{{vv0.takeList.length}}笔</span>
                <Icon v-if="vv0.autoMoney>0" type="md-eye"></Icon>
                <span>)</span>
              </div>
              <ViewTake :billId="vv0._id"></ViewTake>
            </BtnOpenModal>
          </td>
          <td class="td" style="text-align:right;">
            <span v-if="vv0.setDate">{{ vv0.setMoney | formatPrice }}</span>
          </td>
          <td class="td" style="text-align:right;">
            <span v-if="vv0.setDate">{{ (vv0.setMoney - vv0.autoMoney) | formatPrice }}</span>
          </td>
        </template>
        <td class="td">
          <span v-if="vv0.type==='cc'">
            <span v-if="ViewType==='今天'">{{ vv0.billTime | formatTime('yearmonth') }}</span>
            <span v-else>{{ vv0.billTime | formatTime('date') }}</span>
            <span v-if="ViewType==='今天'">({{vv0.billDays}}天)</span>
          </span>
        </td>
        <td class="td">
          <span v-if="ViewType==='今天'">{{ vv0.repayTime | formatTime('yearmonth') }}</span>
          <span v-else>{{ vv0.repayTime | formatTime('date') }}</span>
          <span v-if="ViewType==='今天'" :class="{red:vv0.dueDays<4}">
            <span>(</span>
            <span>{{vv0.dueDays}}天</span>
            <span>)</span>
          </span>
        </td>
        <td class="td">
          <template v-if="vv0.type==='cc'">
            <BtnOpenModal
              v-if="!vv0.doneTime"
              buttonText="手工金额"
              buttonSize="small"
              modalTitle="设置实际金额"
            >
              <SetMoney :billId="vv0._id" @DoneSet="DoneSet(vv0, $event)"></SetMoney>
            </BtnOpenModal>
          </template>
          <span v-if="vv0.doneTime">{{ vv0.doneTime | formatTime }}</span>
          <Button v-else @click="DoneOne(vv0, index0)" size="small" style="margin-left:10px">确认</Button>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import apiAxios from '@/apiAxios.js'
import ViewTake from './ViewTake.vue'
import SetMoney from './SetMoney.vue'
import FenqiView from '../fenqi/FenqiView.vue'
import ClipboardJS from 'clipboard'

export default {
  components: {
    ViewTake,
    SetMoney,
    FenqiView,
  },
  data() {
    const now = new Date()
    return {
      QueryObj: {
        year: 2019,
        month: now.getMonth() + 1,
      },
      ViewType: '今天',
      list: [],
    }
  },
  watch: {},
  props: {},
  computed: {
    Sum1() {
      return this.list.reduce(
        (sum, vv) => sum + (vv.amount || vv.setMoney || vv.autoMoney),
        0
      )
    },
  },
  methods: {
    InitCopy() {
      const copyHandle = new ClipboardJS(this.$refs.textForCopy.$el, {
        text: () => {
          const list1 = this.list.filter(vv => vv.dueDays <= 3)
          const sum = list1
            .reduce((sum, vv) => {
              if (vv.type === 'cc') {
                if (vv.setDate) {
                  return sum + vv.setMoney
                } else {
                  return sum + vv.autoMoney
                }
              } else {
                return sum + vv.amount
              }
            }, 0)
            .toFixed(2)
          const str = list1
            .map((vv, idx) => {
              const type = vv.type
              const days = vv.dueDays
              const user = vv.cardId.userId.realName
              const card = vv.cardId.cardNickName
              if (vv.type === 'cc') {
                const takeLen = vv.takeList.length
                const str = `${idx + 1}) ${days}天内 ${user}
  ${card}
    自动 ￥${vv.autoMoney} (${takeLen}笔)`
                if (vv.setDate) {
                  return (
                    str +
                    `
    手动 ￥${vv.setMoney}`
                  )
                } else {
                  return str
                }
              } else {
                const amount = vv.amount
                const remark = vv.remark
                return `${idx + 1}) ${days}天内 ${user}
   ${card} ￥${amount} ${remark}`
              }
            })
            .join('\n')
          const minDays = Math.min(...list1.map(vv => vv.dueDays))
          this.$Message.success('复制成功')
          return `${sum}(合计) 最近${minDays}天内:

${str}

`
        },
      })
      this.$on('hook:beforeDestroy', () => copyHandle.destroy())
    },
    async DoQueryToday() {
      this.list = []
      const { data } = await apiAxios.get('/bill-today')
      this.list = data.result
    },
    async DoQueryHistory() {
      this.list = []
      const { data } = await apiAxios.get('/bill-history', {
        params: this.QueryObj,
      })
      this.list = data.result
    },
    async DoneOne(vv0, index) {
      const prefix = vv0.type === 'fenqi' ? 'fenqi' : 'bill'
      const { data } = await apiAxios.post(`/${prefix}-set-done-` + vv0._id)
      this.list.splice(index, 1, data.result)
    },
    DoneSet(orgObj, newObj) {
      orgObj.setMoney = newObj.setMoney
      orgObj.setDate = newObj.setDate
      orgObj.setUser = newObj.setUser
    },
    async ChangeType(type) {
      this.ViewType = type
      if (type === '今天') {
        await this.DoQueryToday()
      } else {
        await this.DoQueryHistory()
      }
    },
  },
  async mounted() {
    await this.DoQueryToday()
    this.InitCopy()
  },
}
</script>
<style lang="scss" scoped>
.lower {
  font-size: 8px;
}
.red {
  color: #fff;
  background: red;
}
.green {
  color: #fff;
  background: green;
}
</style>
