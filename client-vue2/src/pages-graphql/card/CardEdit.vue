<template>
  <Form :label-width="120">
    <FormItem label="卡号">
      <Input type="text" v-model="editItem.cardNo" />
    </FormItem>
    <FormItem label="银行">
      <Select v-model="editItem.bankId">
        <Option v-for="(vv0, index0) in banklist" :key="index0" :value="vv0._id">{{ vv0.bankName }}</Option>
      </Select>
    </FormItem>
    <FormItem label="用户">
      <Select v-model="editItem.userId">
        <Option v-for="(vv0, index0) in userList" :key="index0" :value="vv0._id">{{ vv0.realName }}</Option>
      </Select>
    </FormItem>
    <FormItem label="卡片简称">
      <Input type="text" v-model="editItem.cardNickName" />
    </FormItem>
    <FormItem label="类型">
      <RadioGroup v-model="editItem.cardType" type="button">
        <Radio :label="'cc'">信用卡</Radio>
        <Radio :label="'fenqi'">分期</Radio>
      </RadioGroup>
    </FormItem>
    <template v-if="editItem.cardType==='cc'">
      <FormItem label="账单日">
        <Input type="text" v-model="editItem.billDate" />
      </FormItem>
      <FormItem label="还款日期类型">
        <RadioGroup v-model="editItem.dueType" type="button">
          <Radio :label="'fixed'">固定日期</Radio>
          <Radio :label="'after'">多少天之后</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="固定日期" v-if="editItem.dueType==='fixed'">
        <Input type="text" v-model="editItem.dueDateFixed" />
      </FormItem>
      <FormItem label="账单之后天数" v-if="editItem.dueType==='after'">
        <Input type="text" v-model="editItem.dueDateAfter" />
      </FormItem>
      <FormItem label="额度">
        <Input type="text" v-model="editItem.totalLimit" />
      </FormItem>
    </template>
    <FormItem label="禁用">
      <i-switch v-model="editItem.disabled" />
    </FormItem>
    <FormItem>
      <Button @click="SaveOne()">保存</Button>
    </FormItem>
  </Form>
</template>
<script>
import apiAxios from '@/apiAxios.js'

export default {
  components: {},
  data() {
    return {
      list: [],
      banklist: [],
      userList: [],
      editItem: {},
    }
  },
  watch: {},
  props: {
    id: null,
  },
  computed: {
    isAdd() {
      return !this.id
    },
  },
  inject: ['modalRoot'],
  methods: {
    async LoadBankList() {
      const gql_act = `bank_list`
      const { data } = await apiAxios.post('/graphql', {
        query: gql`
          query {
            ${gql_act} {
              id
              bankName
            }
          }
        `,
      })
      this.banklist = data.data[gql_act]
    },
    async LoadUserList() {
      const gql_act = `user_list`
      const { data } = await apiAxios.post('/graphql', {
        query: gql`
          query {
            ${gql_act} {
              id
              username
            }
          }
        `,
      })
      this.userList = data.data[gql_act]
    },
    async LoadOne() {
      if (this.isAdd) {
        const gql_act = `card_new`
        const { data } = await apiAxios.post('/graphql', {
          query: gql`
            query {
              ${gql_act} {
                bankId
                userId
                cardNo
                cardType
                cardNickName
                billDate
                dueType
                dueDateFixed
                dueDateAfter
                totalLimit
                disabled
              }
            }
          `,
        })
        this.editItem = data.data[gql_act]
      } else {
        const gql_act = `card`
        const { data } = await apiAxios.post('/graphql', {
          query: gql`
            query {
              ${gql_act}(id: "${this.id}") {
                id
                bankId
                userId
                cardNo
                cardType
                cardNickName
                billDate
                dueType
                dueDateFixed
                dueDateAfter
                totalLimit
                disabled
              }
            }
          `,
        })
        this.editItem = data.data[gql_act]
      }
    },
    async SaveOne() {
      const gql_act = this.isAdd ? 'card_add' : 'card_update'
      const { data } = await apiAxios.post('/graphql', {
        query: gql`
          mutation ($item: Card_Input) {
            ${gql_act}(obj: $item) {
              id
              bankName
              nickName
              good
            }
          }
        `,
        variables: {
          item: this.editItem,
        },
      })
      this.$emit('DoneSave', data.data[gql_act])
      this.modalRoot.DoHide()
    },
  },
  async mounted() {
    await this.LoadBankList()
    await this.LoadUserList()
    await this.LoadOne()
  },
}
</script>
<style lang="scss" scoped>
</style>
