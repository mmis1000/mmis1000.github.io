<template>
  <section class="gallery page">
    <h2 class="title">Gallery</h2>
    <div class="grid">
      <div class="item">
        <iframe scrolling="no" title="ECS rain drop"
          src="https://codepen.io/mmis1000/embed/KKpwGjM?default-tab=result&editable=true" frameborder="no"
          loading="lazy" allowtransparency="true" allowfullscreen="true">
          See the Pen <a href="https://codepen.io/mmis1000/pen/KKpwGjM">
            ECS rain drop</a> by mmis1000 (<a href="https://codepen.io/mmis1000">@mmis1000</a>)
          on <a href="https://codepen.io">CodePen</a>.
        </iframe>
      </div>
      <div class="item">
        <iframe scrolling="no" title="Text drawing Dynamic step"
          src="https://codepen.io/mmis1000/embed/MZvpGd?default-tab=result&editable=true" frameborder="no"
          loading="lazy" allowtransparency="true" allowfullscreen="true">
          See the Pen <a href="https://codepen.io/mmis1000/pen/MZvpGd">
            Text drawing Dynamic step</a> by mmis1000 (<a href="https://codepen.io/mmis1000">@mmis1000</a>)
          on <a href="https://codepen.io">CodePen</a>.
        </iframe>
      </div>
      <div class="item">
        <iframe scrolling="no" title="The shooter"
          src="https://mmis1000.me/the-shooter/" frameborder="no"
          loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>
      </div>
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
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  overflow: hidden;
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
</style>