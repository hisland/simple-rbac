<template>
  <Form :label-width="120">
    <FormItem label="银行名称">
      <Input type="text" v-model="editItem.bankName" />
    </FormItem>
    <FormItem label="银行简称">
      <Input type="text" v-model="editItem.nickName" />
    </FormItem>
    <FormItem label="好处">
      <Input type="textarea" :rows="4" v-model="editItem.good" />
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
      editItem: {},
    }
  },
  watch: {},
  inject: ['modalRoot'],
  props: {
    id: null,
  },
  computed: {
    isAdd() {
      return !this.id
    },
  },
  methods: {
    async LoadOne() {
      if (this.isAdd) {
        const gql_act = `bank_new`
        const { data } = await apiAxios.post('/graphql', {
          query: gql`
            query {
              ${gql_act} {
                bankName
                nickName
                good
              }
            }
          `,
        })
        this.editItem = data.data[gql_act]
      } else {
        const gql_act = `bank`
        const { data } = await apiAxios.post('/graphql', {
          query: gql`
            query  {
              ${gql_act}(id: "${this.id}") {
                id
                bankName
                nickName
                good
              }
            }
          `,
        })
        this.editItem = data.data[gql_act]
      }
    },
    async SaveOne() {
      const gql_act = this.isAdd ? 'bank_add' : 'bank_update'
      const { data } = await apiAxios.post('/graphql', {
        query: gql`
          mutation ($item: Bank_Input) {
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
    await this.LoadOne()
  },
}
</script>
<style lang="scss" scoped>
</style>
