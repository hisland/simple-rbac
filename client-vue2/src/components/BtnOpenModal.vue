<template>
  <span>
    <span @click="DoShow()">
      <slot name="button">
        <Button :size="buttonSize">{{ buttonText }}</Button>
      </slot>
    </span>
    <Modal :value="isVisible" :title="modalTitle" @on-cancel="DoHide()" footer-hide>
      <slot v-if="isVisible"></slot>
    </Modal>
  </span>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      isVisible: false,
    }
  },
  watch: {},
  props: {
    buttonText: { type: String, default: '查看' },
    buttonSize: { type: String, default: 'default' },
    modalTitle: { type: String, default: '提示框' },
  },
  computed: {},
  provide() {
    return {
      modalRoot: this,
    }
  },
  methods: {
    DoShow() {
      this.isVisible = true
      this.$emit('show')
    },
    DoHide() {
      this.isVisible = false
      this.$emit('hide')
    },
  },
  mounted() {},
}
</script>
<style lang="scss" scoped>
</style>
