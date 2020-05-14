<template>
  <div class="wrap">
    <Form :label-width="120">
      <FormItem label="刷卡卡片">
        <SelectAjaxList
          url="/card-list-all"
          v-model="genConfig.cardId"
          v-slot="{item}"
        >{{item.cardNickName}}</SelectAjaxList>
      </FormItem>
      <FormItem label="分期名">
        <Input type="text" v-model="genConfig.name" />
      </FormItem>
      <FormItem label="开始时间">
        <DatePicker v-model="genConfig.startTime" type="date"></DatePicker>
      </FormItem>
      <FormItem label="月间隔">
        <Input type="text" v-model.number="genConfig.perMonth" />
      </FormItem>
      <FormItem label="还款日">
        <Input type="text" v-model.number="genConfig.repayDate" />
      </FormItem>
      <FormItem label="期数">
        <Input type="text" v-model.number="genConfig.repayCount" />
      </FormItem>
      <FormItem label="每期金额">
        <Input type="text" v-model.number="genConfig.perAmount" />
      </FormItem>
      <FormItem>
        <Button @click="GenTpl()" style="margin-right: 10px;">生成</Button>
        <Button @click="DoSave()">保存</Button>
      </FormItem>
    </Form>
    <table>
      <tr>
        <td>#</td>
        <td>还款日</td>
        <td>金额</td>
        <td>备注</td>
        <td style="width:30px">已还</td>
        <td></td>
      </tr>
      <tr v-for="(vv0, index0) in genList" :key="index0">
        <td>{{ index0 + 1 }}</td>
        <td>
          <DatePicker v-model="vv0.repayTime" type="date" format="yyyy-MM-dd"></DatePicker>
        </td>
        <td>
          <Input type="text" v-model.number="vv0.amount" />
        </td>
        <td>
          <Input type="text" v-model="vv0.remark" />
        </td>
        <td>
          <Checkbox :value="vv0.done" @click.native="SetDone($event, vv0, index0)" />
        </td>
        <td>
          <DatePicker v-if="vv0.done" v-model="vv0.doneTime" type="date" format="yyyy-MM-dd"></DatePicker>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import apiAxios from '@/apiAxios.js'
import moment from 'moment'

export default {
  components: {},
  data() {
    return {
      genConfig: {
        cardId: null,
        name: '',
        startTime: '2019-01-01',
        perMonth: 1,
        repayDate: 3,
        repayCount: 12,
        doneCount: 0,
        doneAmount: 0,
        perAmount: 123,
      },
      genList: [],
      prevDoneIndex: null,
    }
  },
  watch: {},
  props: {},
  computed: {},
  methods: {
    async LoadOne() {
      if (this.id) {
        const { data } = await apiAxios.get('/bank-one-' + this.id)
        this.editItem = data.result
      } else {
        const { data } = await apiAxios.get('/bank-new-one')
        this.editItem = data.result
      }
    },
    async SaveOne() {
      const method = this.editItem._id ? 'put' : 'post'
      const { data } = await apiAxios[method]('/bank-one', this.editItem)
      this.$emit('DoneSave', data.result)
      this.modalRoot.DoHide()
    },

    async DoSave() {
      const { data } = await apiAxios.post('/fenqi-one', {
        genConfig: this.genConfig,
        genList: this.genList,
      })
      this.$emit('DoneSave', data.result)
      this.$parent.$parent.DoHide()
    },
    GenTpl() {
      const {
        startTime,
        perMonth,
        repayDate,
        repayCount,
        perAmount,
      } = this.genConfig
      const genList = []
      const startMoment = moment(startTime)
      startMoment.date(repayDate)
      for (let ii = 0; ii < repayCount; ii++) {
        startMoment.add(perMonth, 'month')
        genList.push({
          index: ii + 1,
          repayTime: startMoment.format('YYYY-MM-DD'),
          doneTime: null,
          amount: perAmount,
          remark: `${ii + 1}/${repayCount}期`,
        })
      }
      this.genList = genList
    },
    SetDone($event, vv0, index0) {
      const toState = !vv0.done
      let list = [vv0]
      if (
        $event.shiftKey &&
        !(this.prevDoneIndex === null || index0 === this.prevDoneIndex)
      ) {
        const from = Math.min(index0, this.prevDoneIndex)
        const to = Math.max(index0, this.prevDoneIndex)
        list = this.genList.slice(from, to + 1)
      }
      this.prevDoneIndex = index0
      list.forEach((vv1, index1) => {
        vv1.done = toState
        if (toState) {
          vv1.doneTime = moment(vv1.repayTime)
            .add(-1, 'days')
            .toDate()
        } else {
          vv1.doneTime = null
        }
      })
    },
  },
  async mounted() {},
}
</script>
<style lang="scss" scoped>
</style>
