<template>
  <div class="digit">
    <div class="wrapper" :style="`transform: translateY(-${50 * percentage}%)`">
      <div class="current">
        {{currentChar}}
      </div>
      <div class="next">
        {{nextChar}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    value: {
      type: Number,
      default: 0
    },
    base: {
      type: Number,
      default: 10
    }
  },
  computed: {
    current (): number {
      return Math.floor(this.value)
    },
    next (): number {
      return Math.floor(this.value) + 1
    },
    currentChar (): number {
      return ((this.current % this.base) + this.base) % this.base
    },
    nextChar (): number {
      return ((this.next % this.base) + this.base) % this.base
    },
    percentage (): number {
      return this.value - this.current
    },
  }
})
</script>

<style lang="scss" scoped>
.digit {
  font-size: 60px;

  height: 1em;
  width: 1em;
  overflow: hidden;
  display: inline-block;

  .current, .next {
    height: 1.2m;
    width: 1.2em;
    line-height: 1.2em;
    text-align: center;
    font-size: 0.8333em;
  }
}
</style>
