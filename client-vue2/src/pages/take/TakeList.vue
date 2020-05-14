<template>
  <div class="wrap">
    <Form :label-width="50">
      <Row>
        <i-col :span="6">
          <BtnOpenModal buttonText="添加" modalTitle="添加刷卡记录">
            <TakeEdit @DoneSave="DoneAdd"></TakeEdit>
          </BtnOpenModal>
          <span style="margin-left:10px;">
            <template v-if="!isCopy">
              <Button size="small" @click="InitCopy()">复制</Button>
            </template>
            <template v-else>
              <Button size="small" ref="textForCopy">确认</Button>
              <Button size="small" @click="CancelCopy()">取消</Button>
            </template>
          </span>
        </i-col>
        <i-col :span="6">
          <FormItem label="状态">
            <Select v-model="QueryObj.state" @on-change="ChangeState()">
              <Option :value="'undone'">未还</Option>
              <Option :value="'done'">已还</Option>
              <Option :value="'all'">全部</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col :span="6">
          <FormItem label="用户">
            <SelectAjaxList
              url="/user-list-all"
              v-model="QueryObj.userId"
              @on-change="ChangeUser()"
              clearable
              v-slot="{item}"
            >{{item.realName}}</SelectAjaxList>
          </FormItem>
        </i-col>
        <i-col :span="6">
          <FormItem label="卡号">
            <SelectAjaxList
              :url="`/card-list-all?cardType=cc&userId=`+QueryObj.userId"
              v-model="QueryObj.cardId"
              @on-change="ChangeCard()"
              clearable
              v-slot="{item}"
            >{{item.cardNickName}}</SelectAjaxList>
          </FormItem>
        </i-col>
      </Row>
    </Form>

    <table class="table1">
      <tr class="tr">
        <th class="th" v-if="isCopy"></th>
        <th class="th">#</th>
        <th class="th">姓名</th>
        <th class="th">卡片</th>
        <th class="th">金额</th>
        <th class="th">刷卡时间</th>
        <th class="th">还款时间</th>
        <th class="th">已还时间</th>
      </tr>
      <tr class="tr">
        <td class="td" v-if="isCopy"></td>
        <td class="td"></td>
        <td class="td"></td>
        <td class="td"></td>
        <td class="td"></td>
        <td class="td" colspan="2">
          <div>未还: {{Sum2.sumUndone | formatPrice}} ({{Sum2.listUndone.length}}笔)</div>
          <div>已还: {{Sum2.sumDone | formatPrice}} ({{Sum2.listDone.length}}笔)</div>
          <div>总计: {{Sum2.sumTotal | formatPrice}} ({{Sum2.listAll.length}}笔)</div>
        </td>
        <td class="td"></td>
      </tr>
      <tr class="tr" v-for="(vv0, index0) in listByUser" :key="index0">
        <td class="td" v-if="isCopy">
          <Checkbox v-model="vv0.checked" @on-change="ChangeCheckCopy()"></Checkbox>
        </td>
        <td class="td">{{ index0 + 1 }}</td>
        <td class="td">{{ vv0.cardId.userId.realName }}</td>
        <td class="td">{{ vv0.cardId.cardNickName }}</td>
        <td class="td moneyiv-col">{{ vv0.money | formatPrice }}</td>
        <td class="td">{{ vv0.time | formatTime }}({{vv0.takeDays}}天)</td>
        <td class="td">
          <span
            v-if="!vv0.billId.doneTime"
          >{{ vv0.billId.repayTime | formatTime('date') }}({{vv0.repayDays}}天)</span>
        </td>
        <td class="td">
          <span
            v-if="vv0.billId.doneTime"
          >{{ vv0.billId.doneTime | formatTime }}({{vv0.repayDays}}天)</span>
          <Button v-else @click="DelOne(vv0._id, index0)" size="small">删除</Button>
        </td>
      </tr>
    </table>
    <div style="text-align: center;padding:10px;">
      <Button @click="LoadNextYear()" size="small">加载{{QueryObj.year-1}}</Button>
      <span style="margin:10px;">当前{{QueryObj.year}}</span>
      <Button @click="LoadPrevYear()" size="small">加载{{QueryObj.year+1}}</Button>
    </div>
  </div>
</template>
<script>
import apiAxios from '@/apiAxios.js'
import TakeEdit from './TakeEdit.vue'
import ClipboardJS from 'clipboard'

export default {
  components: {
    TakeEdit,
  },
  data() {
    return {
      list: [],
      QueryObj: {
        userId: null,
        cardId: null,
        state: 'all', // done/undone/all
        year: new Date().getFullYear(),
      },

      isCopy: false,
      strCopy: 'init',
      copyHandle: null,
    }
  },
  watch: {},
  props: {},
  computed: {
    Sum2() {
      const listDone = []
      const listUndone = []
      this.listByUser.forEach((vv1, index1) => {
        if (vv1.billId.doneTime) listDone.push(vv1)
        else listUndone.push(vv1)
      })
      return {
        listUndone,
        listDone,
        listAll: this.listByUser,
        sumUndone: listUndone.reduce((sum, vv) => sum + vv.money, 0),
        sumDone: listDone.reduce((sum, vv) => sum + vv.money, 0),
        sumTotal: this.listByUser.reduce((sum, vv) => sum + vv.money, 0),
      }
    },
    listByUser() {
      const list1 = this.userId
        ? this.list.filter(vv => vv.cardId.userId._id === this.userId)
        : this.list
      if (this.state === 'undone') {
        return list1.filter(vv => !vv.billId.doneTime)
      } else if (this.state === 'done') {
        return list1.filter(vv => vv.billId.doneTime)
      } else {
        return list1
      }
    },
  },
  methods: {
    async ChangeState() {},
    async ChangeUser() {
      this.QueryObj.cardId = ''
    },
    async ChangeCard() {},
    InitCopy() {
      this.isCopy = true
      this.$nextTick(() => {
        this.copyHandle = new ClipboardJS(this.$refs.textForCopy.$el, {
          text: () => {
            this.$Message.success('复制成功')
            this.$nextTick(() => {
              this.CancelCopy()
            })
            return this.strCopy
          },
        })
      })
    },
    CancelCopy() {
      this.copyHandle.destroy()
      this.isCopy = false
    },
    ChangeCheckCopy() {
      const rsList = this.list.filter(vv => vv.checked)
      const sum = rsList.reduce((sum, vv) => sum + vv.money, 0).toFixed(2)
      const strList = rsList.map(vv => {
        const user = vv.cardId.userId.realName
        const card = vv.cardId.cardNickName.replace(/[ \d]/g, '')
        const money = vv.money
        return `(已刷) ${user} ${card} ${money}`
      })
      strList.push(`合计 ${sum}`)
      this.strCopy = strList.join('\n')
    },
    async LoadThisYear() {
      this.QueryObj.year = new Date().getFullYear()
      await this.LoadList()
    },
    async LoadPrevYear() {
      this.QueryObj.year++
      await this.LoadList()
    },
    async LoadNextYear() {
      this.QueryObj.year--
      await this.LoadList()
    },
    async LoadList() {
      const { data } = await apiAxios.get('/take-list', {
        params: this.QueryObj,
      })
      for (const vv of data.result) {
        vv.checked = false
      }
      this.list = data.result
    },
    DoneAdd(newItem) {
      this.list.unshift(newItem)
    },
    async DelOne(id, index) {
      const { data } = await apiAxios.delete('/take-one-' + id)
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
