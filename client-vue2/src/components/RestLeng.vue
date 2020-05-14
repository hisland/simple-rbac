<template>
  <div class="wrap">
    <div class="rest" :style="lengStyle"></div>
  </div>
</template>
<script>
export default {
  props: {
    rest: Number,
    total: Number,
    justState: { type: Boolean, default: false },
    position: { type: String, default: 'right' },
  },
  computed: {
    percent() {
      const rest = this.rest > 0 ? this.rest : 0
      return this.total === 0 ? 0 : (rest / this.total) * 100
    },
    bgColor() {
      if (this.justState) {
        return this.rest > 10000
          ? '#64e291'
          : this.rest > 5000
          ? '#fec771'
          : '#eb7070'
      } else {
        return this.percent > 70
          ? '#64e291'
          : this.percent > 40
          ? '#fec771'
          : '#eb7070'
      }
    },
    lengStyle() {
      return {
        width: this.percent + '%',
        [this.position]: 0,
        background: this.bgColor,
      }
    },
  },
  methods: {},
}
</script>
<style scoped lang="scss">
.wrap {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.rest {
  position: absolute;
  top: 0;
  bottom: 0;
}
</style>
