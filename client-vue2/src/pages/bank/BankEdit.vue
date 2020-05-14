<template>
  <div class="wrap">
    <Form :label-width="120">
      <FormItem label="银行名称">
        <Input type="text" v-model="editItem.bankName" />
      </FormItem>
      <FormItem label="银行简称">
        <Input type="text" v-model="editItem.nickName" />
      </FormItem>
      <FormItem label="好处">
        <Input type="textarea" :rows="4" v-model="editItem.scoreGood" />
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
      editItem: {},
    }
  },
  watch: {},
  props: {
    id: null,
  },
  inject: ['modalRoot'],
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
  },
  async mounted() {
    await this.LoadOne()
  },
}
</script>
<style lang="scss" scoped>
</style>
