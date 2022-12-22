<template>
  <header class="page about-wrapper" ref="hello">
    <div class="about-outer">
      <div class="about-inner">
        <i class="fa fa-user fa-5x avatar" :class="avatarClass"></i>
        <h1>Mmis1000</h1>
        <p class="links">
          <a href="https://mmis1000.me/blog"><button class="button">Blog</button></a>
          <a href="https://t.me/mmis1000"><button class="button">Telegram</button></a>
        </p>
        <p v-if="!ghostWoken" class="cursor target">
          Hello
          visitor!
          I am mmis1000.
          <br>
          Who learning the web technology and skills.
        </p>
        <p v-else class="cursor target" :style="currentStyle" v-html="ghostWritingHTML">
        </p>
        <button class="control" :class="{
          hide: !mounted,
          play: !ghostWoken,
          stop: ghostWoken
        }" @click="ghostWoken ? onStop() : onPlay()"></button>
      </div>
    </div>
    <Teleport to="body">
      <div v-show="popupVisible" id="popup" class="popup">Hey, I am a popup!</div>
    </Teleport>
  </header>
</template>
<script lang="ts" setup>
import imgUrl from '~~/assets/example.gif'
const currentStyle: Record<string, string | undefined> = reactive({})
const hello = ref<HTMLElement>()
const popupVisible = ref(false)
const avatarClass = ref<string[]>([])
const ghostWoken = ref(false)
const ghostWritingHTML = ref('')
const mounted = ref(false)
const actions = ScriptBuilder.create()
  .effect(() => {}, async () => {
    hello.value?.focus()
  })
  .text(`Hello
          visitor!
          I am mmis1000`)
  .changeInterval(500)
  .text('...')
  .changeInterval(50)
  .text('<br>Who learning the web technology and skills.')
  .delay(2000)
  .clear()

  .text('Let\'s talk about what am I learning.')
  .text('<br>The main components of a web pages are HTML, CSS and JS.')
  .delay(1000)
  .clear()

  .text('The HTML create the page and text you saw now. ')
  .text('<br> For example: add an Image ')
  .text(`<br><img src="${imgUrl}"> `)
  
  .delay(5000)
  .deleteLine(2)

  .text('<br>Or create a list ')
  .text(`<br>
      <ol>
        <li>I</li>
        <li>am</li>
        <li>a</li>
        <li>list.</li>
      </ol>
    `)
  .delay(5000)
  .deleteLine(2)

  .text('<br> Or make a link ')
  .text(`<br>
      <a href="javascript:void(0)">Click me please.</a>
    `)
  .delay(5000)
  .clear()

  .text('The CSS stylize the text and page. ')
  .delay(1000)
  .text('<br>For Example: Make the Text Red ')
  .effect(
    () => { currentStyle.color = undefined },
    async () => { currentStyle.color = 'red' }
  )
  .text('<br>Make the Text Bold ')
  .effect(
    () => { currentStyle['font-weight'] = undefined },
    async () => { currentStyle['font-weight'] = 'bold' }
  )
  .text('<br>Make the Text Big ')
  .effect(
    () => { currentStyle['font-size'] = undefined },
    async () => { currentStyle['font-size'] = '1.5em' }
  )
  .delay(1000)
  .effect(
    () => {},
    async () => {
      currentStyle.color = undefined
      currentStyle['font-weight'] = undefined
      currentStyle['font-size'] = undefined
    }
  )
  .clear()

  .text('The CSS can easily control how the page should display ')
  .text('<br>And make web colorful. ')
  .delay(1000)
  .clear()

  .text('And the JS animate the web. ')
  .effect(
    () => { avatarClass.value = [] },
    async () => {
      avatarClass.value = ['avatar--delay-250']
      await nextTick()
      avatarClass.value = ['avatar--delay-250', 'avatar--left']
      await new Promise(resolve => setTimeout(resolve, 250))
      avatarClass.value = ['avatar--delay-500', 'avatar--left']
      await nextTick()
      avatarClass.value = ['avatar--delay-500', 'avatar--right']
      await new Promise(resolve => setTimeout(resolve, 500))
      avatarClass.value = ['avatar--delay-250', 'avatar--right']
      await nextTick()
      avatarClass.value = ['avatar--delay-250', 'avatar--middle']
      await new Promise(resolve => setTimeout(resolve, 250))
    }
  )
  .text('<br>Interact with user. ')
  .delay(1000)
  
  .effect(
    () => { popupVisible.value = false },
    async () => { popupVisible.value = true }
  )
  .delay(1000)
  .effect(
    () => {},
    async () => { popupVisible.value = false }
  )
  .text('<br>Make all kinds of magic happens. ')
  .delay(1000)
  .clear()

  .text('These are all I am learning now. ')
  .text('<br>Thank you for your listening. ')
  .text('<br>Goodbye!!! ')
  .delay(3000)
  .build()

let writer: InstanceType<typeof GhostTyping> | null = null

const onPlay = () => {
  writer?.start()
}
const onStop = () => {
  writer?.stop()
}

onMounted(() => {
  mounted.value = true
  writer = new GhostTyping(actions)
  writer.onState(state => {
    ghostWoken.value = state === 'START'
  })
  writer.onText(text => {
    ghostWritingHTML.value = text
  })
})
</script>
<style scoped>
.avatar {
  position : relative;
}
.avatar--delay-250 {
  transition: all .25s;
}
.avatar--delay-500 {
  transition: all .5s;
}
.avatar--left {
  left: -50px;
}
.avatar--right {
  left: 50px;
}
.avatar--middle {
  left: 0;
}

.about-wrapper {
  height:100%;
  display:table;
  
  background:black;
  background:url(~/assets/bg.jpg);
  background-size: auto, 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  color: white;
}
.about-outer {
  display:table-cell;
  vertical-align:middle;
}
.about-inner {
  margin-left:auto;
  margin-right:auto;
  width:80%;
  text-align:center;
  -webkit-text-shadow:0px 2px 10px #000000;
     -moz-text-shadow:0px 2px 10px #000000;
          text-shadow:0px 2px 10px #000000;
}
.about-inner .links a::before {
  display: none;
}


.cursor:after{
  content: "|";
  
  -webkit-animation-name: blink;
  -webkit-animation-duration: 0.8s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
  -webkit-animation-timing-function: linear, steps(2, end);
  
  animation-name: blink;
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-timing-function: linear, steps(2, end);
}

.links > a {
  margin-left: 4px;
}
.links > a:first-child {
  margin-left: 0;
}

/* Chrome, Safari, Opera */
@-webkit-keyframes blink {
  0% {opacity: 1;}
  50% {opacity: 0;}
  100% {opacity: 1;}
}
/* Standard syntax */
@keyframes blink {
  0% {opacity: 1;}
  50% {opacity: 0;}
  100% {opacity: 1;}
}

.control {
  background: transparent;
  border: 1px solid #bbbbbb;
  padding: 0.5em;
  border-radius: 6px;
  -webkit-text-shadow:0px 2px 10px #000000;
     -moz-text-shadow:0px 2px 10px #000000;
          text-shadow:0px 2px 10px #000000;
}
.control.hide {
  display: none;
}
.control:before {
  font-family: FontAwesome;
  font-size : 0.8em;
  vertical-align:middle;
  display: inline-block;
  padding-right: 3px;
}

@keyframes blink-button {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.75;
  }
  100% {
    opacity: 1;
  }
}
.control.play {
  filter: drop-shadow(0 0 1px rgba(255,255,255,0.5));
  animation: infinite 2s blink-button;
}
.control.play:before {
  content: "\f04b";
  color: #4f4;
}
.control.play:after {
  content: "Tell me about you";
  color: #4f4;
}

.control.stop:before {
  content: "\f04d";
  color: #f44;
}
.control.stop:after {
  content: "stop";
  color: #f44;
}

.popup {
  display: block;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -50px;
  width: 200px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  background: #fefefe;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.32) 0px 3px 6px;
  z-index: 1;
}
</style>