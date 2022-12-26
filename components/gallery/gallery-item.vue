<template>
  <div class="gallery-item__container">
    <div class="gallery-item__title">
      <div class="gallery-item__text">
        {{ title }}
      </div>
      <div v-if="sourceLink != null" class="gallery-item__source">
        <a :href="sourceLink" title="open source in new window" target="_blank">
          <i class="fa fa-github" aria-hidden="true"></i>
        </a>
      </div>
      <div v-if="externalLink != null" class="gallery-item__open-in">
        <a :href="externalLink" title="open in new window" target="_blank">
          <i class="fa fa-external-link" aria-hidden="true"></i>
        </a>
      </div>
    </div>
    <div class="gallery-item__content">
      <slot></slot>
      <div v-if="displayedWithOverlay" class="gallery-item__overlay" @click="displayedWithOverlay = false">
        Click To interact
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  externalLink: {
    type: String,
    default: null
  },
  sourceLink: {
    type: String,
    default: null
  },
  preventInteraction: {
    type: Boolean,
    default: false
  }
})

const displayedWithOverlay = ref(props.preventInteraction)

</script>
<style scoped>
.gallery-item__container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  overflow: hidden;
}
.gallery-item__title {
  min-height: 40px;
  flex-grow: 0;
  background-color: #01579B;
  color: white;
  display: flex;
  align-items: center;
}
.gallery-item__text {
  width: 0;
  flex-grow: 1;
  padding: 0 8px;
  line-height: 40px;
}
.gallery-item__source, .gallery-item__open-in {
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.gallery-item__source a::before, .gallery-item__open-in a::before {
  display: none;
}
.gallery-item__content {
  flex-grow: 1;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  position: relative;
}
.gallery-item__content > ::v-slotted(*) {
  flex-grow: 1;
}
.gallery-item__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
}
</style>