<template>
  <section class="gallery page">
    <h2 class="title">Gallery</h2>
    <div class="grid">
      <GalleryItem
        class="item"
        title="A rain effect animation on canvas 2d"
        external-link="https://codepen.io/mmis1000/pen/MZvpGd"
      >
        <iframe scrolling="no" title="ECS rain drop"
          src="https://codepen.io/mmis1000/embed/KKpwGjM?default-tab=result&editable=true" frameborder="no"
          loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>
      </GalleryItem>
      <GalleryItem
        class="item"
        title="A text animation rendered with vue"
        external-link="https://codepen.io/mmis1000/pen/MZvpGd"
      >
        <iframe scrolling="no" title="Text drawing Dynamic step"
          src="https://codepen.io/mmis1000/embed/MZvpGd?default-tab=result&editable=true" frameborder="no"
          loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>
      </GalleryItem>
      <GalleryItem
        class="item"
        title="A shooter game without framework"
        source-link="https://github.com/mmis1000/the-shooter"
        external-link="https://mmis1000.me/the-shooter/"
        prevent-interaction
      >
        <iframe scrolling="no" title="The shooter"
          src="https://mmis1000.me/the-shooter/" frameborder="no"
          loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>
      </GalleryItem>
      <GalleryItem
        class="item"
        title="A clock wrote using vue"
        source-link="https://github.com/mmis1000/mmis1000.github.io/blob/master/components/gallery-sample/clock/clock-container.vue"
      >
        <GallerySampleClockContainer />
      </GalleryItem>
    </div>
  </section>
</template>
<style>
.gallery {
  padding-top: 2em;
  position: relative;
}

.gallery::before {
  display: block;
  content: "";
  position: absolute;
  top: 0;
  left: 2em;
  right: 2em;
  border-top: 2px solid #0277BD;
}

.title {
  text-align: center;
  margin-bottom: 2em;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  padding: 0;
}

.item {
  width: 100%;
  height: 80vh;
}

.item iframe {
  flex-grow: 1;
}

@media screen and (min-width: 800px) {
  .gallery {
    padding-bottom: 2em;
  }

  .grid {
    padding: 0 2em;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
  }

  .item {
    border-radius: 4px;
  }
}
@media screen and (min-width: 1000px) {
  
  .grid {
    width: 936px;
    margin: 0 auto;
  }
}
</style>