<template>
  <Select
    :value="value"
    @input="$emit('input', $event)"
    @on-open-change="ToggleOpen"
    v-bind="$attrs"
    v-on="$listeners"
    :loading="isLoading"
  >
    <Option v-for="(vv0, index0) in list" :key="index0" :value="vv0._id">
      <slot :item="vv0"></slot>
    </Option>
  </Select>
</template>
<script>
import apiAxios from '@/apiAxios.js'

export default {
  components: {},
  data() {
    return {
      isLoading: true,
      isCached: false,
      list: [],
    }
  },
  props: {
    value: null,
    url: String,
  },
  watch: {
    url() {
      this.isCached = false
    },
  },
  computed: {},
  methods: {
    async LoadList() {
      if (this.isCached) return
      this.isCached = true
      this.isLoading = true
      const { data } = await apiAxios.get(this.url)
      // await new Promise(function(resolve, reject) {
      //   setTimeout(resolve, 3000)
      // })
      this.list = data.result
      this.isLoading = false
    },
    async ToggleOpen(isOpen) {
      if (isOpen) {
        await this.LoadList()
      }
    },
  },
  mounted() {
    // console.log(this.$attrs)
    // console.log(this.$listeners)
  },
}
</script>
<style scoped lang="scss">
</style>
