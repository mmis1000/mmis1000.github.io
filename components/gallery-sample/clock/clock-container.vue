<template>
  <div class="clock">
    <Clock class="clock-item" :current="current"/>
    <Clock class="clock-item" :current="reversed"/>
    <Clock class="clock-item" :current="fast"/>
    <Clock class="clock-item" :current="slow"/>
    <Clock class="clock-item" :current="current" :animationFunction="i => Math.sin((i * 2 - 1) * Math.PI / 2) * 0.5 + 0.5"/>
  </div>
</template>

<script lang="ts">
import Clock from "./clock-body.vue"

export default defineComponent({
  components: {
    Clock: Clock
  },
  setup () {
    const state = reactive({
      current: Date.now(),
      initial: Date.now()
    });

    const { onFrame } = useRAF()

    onFrame(() => {
      state.current = Date.now()
    })

    return state
  },
  computed: {
    fast (): number {
      return this.initial + (this.current - this.initial + Math.random() * 16) * 10
    },
    slow (): number {
      return this.initial + (this.current - this.initial) / 10
    },
    reversed (): number {
      return this.initial - (this.current - this.initial)
    }
  }
})
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Major+Mono+Display&display=swap');
.clock {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background-color: rgb(237, 237, 237);
}
.clock-item {
  margin-top: 0.1em;
}

::v-deep(.wrapper) {
  font-size: 40px;
}

@media screen and (max-width: 800px) {
  ::v-deep(.wrapper) {
    font-size: 10vw
  }
}


::v-deep(*) {
  font-family: 'Major Mono Display', monospace;
}
</style>
