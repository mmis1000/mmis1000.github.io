<template>
  <nav
  ref="nav"
  class="nav layout-header__container"
  :class="{ 'layout-header__container--active': activeBackground }"
  >
    <label class="icon click" for="toggle-menu">
      <i class="fa fa-bars"></i>
    </label>
    <input id="toggle-menu" type="checkbox">
    <div class="overlay">
      <ul class="links">
        <li class="close">
          <label class="click" for="toggle-menu">
            <i class="fa fa-times fa-2x"></i>
          </label>
        </li>
        <li><a href="#about-wrapper">About me</a></li>
        <li><a href="#learning">Learning</a></li>
        <li><a href="#gallery">Gallery</a></li>
        <li><a href="#contact">Contact</a></li>
        <li class="last"><a href="#copyright">Copyright</a></li>
      </ul>
    </div>
  </nav>
</template>
<script setup lang="ts">
const props = defineProps({
  traceOnSelector: {
    type: String,
    default: null
  }
})

const nav = ref<HTMLElement>(null!)
const activeBackground = ref(false)
onMounted(() => {
  if (props.traceOnSelector != null) {
    let options = {
      // rootMargin: '0px',
      // threshold: 0
    }

    let observer = new IntersectionObserver((entries) => {
      for (const item of entries) {
        activeBackground.value = !item.isIntersecting
      }

    }, options);

    observer.observe(document.querySelector(props.traceOnSelector) as HTMLElement)

    return () => [
      observer.disconnect()
    ]
  }
})

</script>
<style scoped>
.layout-header__container {
  transition: all .5s;
}
.layout-header__container--active {
  box-shadow: 0 3px 6px rgba(0,0,0,0.32);
  background: rgba(41, 182, 246, 1);
}




.nav {
  z-index:99998;
  position: fixed;
  top: 0px;
  left:0px;
  right:0px;
  
  text-align: right;
  line-height: 2.1em;
  height: 2.5em;
  padding: 0.2em;
}
.nav .icon {
  display: inline-block;
  height:2em;
  width:2em;
  margin-right:0.5em;
  line-height:1.8em;
  text-align: center;
  box-sizing: border-box;
  /*border: 0.1em solid #ffffff;*/
  border-radius: 4px;
  /*vertical-align: middle;*/
  color:white;
}
.nav .overlay {
  z-index:99999;
  position: fixed;
  top: 0px;
  bottom:0px;
  right:0px;
  left:0px;
  background: rgba(64, 64, 64, 0.7);
  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr='#b3404040', endColorstr='#b3404040');
  opacity: 0;
  pointer-events: none;
  transition: all .3s;
  overflow-x: hidden;
  overflow-y: auto;
}
#toggle-menu:checked ~ .overlay {
  opacity: 1;
  pointer-events: auto;
}
.overlay .links {
  transform: translateX(200px);
  transition: all .3s;
}
#toggle-menu:checked ~ .overlay .links{
  transform: translateX(0px);
}

.nav .links {
  position:absolute;
  right:0px;
  top:0px;
  bottom:0px;
  width:240px;
  
  list-style: none;
  text-align: right;
  
  padding: 1em;
  
  margin:0px;
  
  background:#4FC3F7;
  color:white;
}
.nav a:before {
  display: none;
}

.nav .links li {
  text-align:left;
  margin: 0em 0.5em 0em 0.5em;
  padding: 0.5em 0em 0.5em 0em;
  border-bottom: 1px solid #dddddd;
  position: relative;
}
.nav .links li.close {
  text-align:right;
  border-bottom: none;
}
.nav .links li.last {
  border-bottom: none;
}
.nav .links li:after {
  position: absolute;
  left: -8px;
  top: 6px;
  bottom: 6px;
  width: 4px;
  display:block;
  background: #ffffff;
  content: " ";
  opacity: 0;
  
  -webkit-transition: opacity 0.5s; /* Safari */
  transition: opacity 0.5s;
}
.nav .links li.selected:after {
  opacity: 1;
}
label.click {
  cursor: pointer;
}
#toggle-menu {
  display: none;
}
</style>