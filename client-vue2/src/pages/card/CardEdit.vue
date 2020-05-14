<template>
  <div class="wrap">
    <Form :label-width="120">
      <FormItem label="卡号">
        <Input type="text" v-model="editItem.cardNo" />
      </FormItem>
      <FormItem label="银行">
        <SelectAjaxList
          url="/bank-list-all"
          v-model="editItem.bankId"
          v-slot="{item}"
        >{{item.bankName}}</SelectAjaxList>
      </FormItem>
      <FormItem label="用户">
        <SelectAjaxList
          url="/user-list-all"
          v-model="editItem.userId"
          v-slot="{item}"
        >{{item.realName}}</SelectAjaxList>
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
  </div>
</template>
<script>
import apiAxios from '@/apiAxios.js'

export default {
  components: {},
  data() {
    return {
      list: [],
      editItem: {},
    }
  },
  watch: {},
  props: {
    id: null,
  },
  computed: {},
  methods: {
    async InitOne() {
      if (this.id) {
        const { data } = await apiAxios.get('/card-one-' + this.id)
        this.editItem = data.result
      } else {
        const { data } = await apiAxios.get('/card-new-one')
        this.editItem = data.result
      }
    },
    async SaveOne() {
      const method = this.editItem._id ? 'patch' : 'post'
      const { data } = await apiAxios[method]('/card-one', this.editItem)
      this.$emit('DoneSave', data.result)
      this.$parent.$parent.DoHide()
    },
  },
  async mounted() {
    await this.InitOne()
  },
}
</script>
<style lang="scss" scoped>
.col1 {
  display: inline-block;
  width: 8em;
  text-align: right;
}
</style>
