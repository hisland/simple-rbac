<template>
  <div class="wrap">
    <Row>
      <i-col :span="4">
        <BtnOpenModal buttonText="添加" modalTitle="添加卡片">
          <CardEdit @DoneSave="DoneAdd"></CardEdit>
        </BtnOpenModal>
      </i-col>
      <i-col :span="16">
        <Form :label-width="80">
          <FormItem label="过滤">
            <Select
              v-model="QueryObj.cardType"
              @on-change="LoadList()"
              clearable
              placeholder="请选择类别"
            >
              <Option :value="'cc'">信用卡</Option>
              <Option :value="'fenqi'">分期</Option>
            </Select>
          </FormItem>
        </Form>
      </i-col>
      <i-col :span="4" style="text-align:right;">
        <Button @click="LoadList()">查询</Button>
      </i-col>
    </Row>

    <table class="table1">
      <tr class="tr">
        <th class="th">#</th>
        <th class="th">姓名</th>
        <th class="th">卡号</th>
        <th class="th">类别</th>
        <th class="th">卡片别名</th>
        <th class="th">账单日</th>
        <th class="th">还款日</th>
        <th class="th">总额度</th>
        <th class="th">创建日期</th>
        <th class="th">禁用</th>
        <th class="th">操作</th>
      </tr>
      <tr class="tr">
        <td class="td"></td>
        <td class="td"></td>
        <td class="td"></td>
        <td class="td"></td>
        <td class="td"></td>
        <td class="td"></td>
        <td class="td"></td>
        <td class="td">{{SumAmount | formatPrice}}</td>
        <td class="td"></td>
        <td class="td"></td>
        <td class="td"></td>
      </tr>
      <tr class="tr" v-for="(vv0, index0) in list" :key="index0">
        <td class="td">{{ index0 + 1 }}</td>
        <td class="td">{{ vv0.userId.realName }}</td>
        <td class="td">{{ vv0.cardNo }}</td>
        <td class="td">{{ vv0.cardType }}</td>
        <td class="td">{{ vv0.cardNickName }}</td>
        <td class="td">
          <span v-if="vv0.cardType==='cc'">{{ vv0.billDate }}号</span>
        </td>
        <td class="td">
          <span v-if="vv0.dueType==='fixed'">{{ vv0.dueDateFixed }}号</span>
          <span v-else>{{ vv0.dueDateAfter }}天后</span>
        </td>
        <td class="td">
          <span v-if="vv0.cardType==='cc'">{{ vv0.totalLimit | formatPrice }}</span>
        </td>
        <td class="td">{{ vv0.createTime | formatTime('date') }}</td>
        <td class="td">
          <template v-if="vv0.disabled">
            <Tag color="error">禁</Tag>
          </template>
        </td>
        <td class="td">
          <BtnOpenModal buttonText="修改" buttonSize="small" modalTitle="修改卡片">
            <CardEdit :id="vv0._id" @DoneSave="DoneEdit($event, index0)"></CardEdit>
          </BtnOpenModal>
          <Button @click="DelOne(vv0._id, index0)" size="small">删除</Button>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import apiAxios from '@/apiAxios.js'
import CardEdit from './CardEdit.vue'

export default {
  components: {
    CardEdit,
  },
  data() {
    return {
      QueryObj: {
        cardType: null,
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
    ccList() {
      return this.list.filter(vv => vv.cardType === 'cc')
    },
    SumAmount() {
      return this.ccList.reduce((sum, vv) => sum + vv.totalLimit, 0)
    },
    SumRestAmount() {
      return this.ccList.reduce(
        (sum, vv) => (vv.restAmount > 0 ? sum + vv.restAmount : sum),
        0
      )
    },
  },
  methods: {
    async LoadList() {
      const { data } = await apiAxios.get('/card-list-all', {
        params: this.QueryObj,
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
        content: '确定删除卡片?',
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
</style>
