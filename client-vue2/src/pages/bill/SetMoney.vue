<template>
  <Form :label-width="120">
    <FormItem label="账单年月">{{one.billYear}}年{{one.billMonth}}月</FormItem>
    <FormItem label="自动金额">{{one.autoMoney | formatPrice}}</FormItem>
    <FormItem label="手工金额">
      <Input type="text" v-model="one.setMoney" clearable />
    </FormItem>
    <FormItem label="原因">
      <Input type="text" v-model="one.setReason" clearable />
    </FormItem>
    <FormItem>
      <Button @click="DoSave()">保存</Button>
    </FormItem>
  </Form>
</template>
<script>
import apiAxios from '@/apiAxios.js'

export default {
  components: {},
  data() {
    return {
      one: {
        setMoney: null,
        setReason: '',
      },
    }
  },
  watch: {},
  props: {
    billId: String,
  },
  computed: {},
  inject: ['DoHide'],
  methods: {
    async DoSave() {
      const { data } = await apiAxios.post('/bill-set-money', {
        billId: this.billId,
        setMoney: this.one.setMoney,
        setReason: this.one.setReason,
      })
      this.$Message.success(data.message)
      this.$emit('DoneSet', data.result)
      await this.DoHide()
    },
    async LoadOne() {
      const { data } = await apiAxios.get('/bill-one-' + this.billId)
      this.one = data.result
    },
  },
  async mounted() {
    await this.LoadOne()
  },
}
</script>
<style lang="scss" scoped>
</style>
