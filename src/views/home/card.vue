<script setup>
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Draggable } from 'gsap/Draggable';
import { onMounted, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n'
const { locale, t, tm } = useI18n();
import { useStore } from 'vuex'
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(Draggable)

const store = useStore();
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
const windowWidth = computed(() => store.state.windowWidth);
let screenHeight = computed(() => (windowWidth.value / 5));

const page = reactive([
  {
    id: 0,
    src: 'n1',
    num: 1,
  }, {
    id: 1,
    src: 'n2',
    num: 2,
  }, {
    id: 2,
    src: 'n3',
    num: 3,
  }, {
    id: 3,
    src: 'n4',
    num: 4,
  }
])





onMounted(() => {
  const stagger = 0.5;
  const DURATION = 1;
  const BOXES = gsap.utils.toArray('.swiper_box');
  const LOOP = gsap.timeline(
    {
      paused: true,
      repeat: -1,
    })
  const shifts = [...BOXES, ...BOXES, ...BOXES]
  shifts.forEach((box, index) => {
    console.log(box, index);
    LOOP.fromTo(box, {
      xPercent: 150
    }, {
      xPercent: -250,
      duration: 1.5,
      ease: 'none',
    }, index * stagger
    )
  })
  const CYCLE_DURATION = stagger * BOXES.length
  const START_TIME = CYCLE_DURATION + (DURATION * 0.5)
  const END_TIME = START_TIME + CYCLE_DURATION
  gsap.fromTo(LOOP, {
    totalTime: START_TIME,
  },
    {
      totalTime: END_TIME,
      duration: 10,
      ease: 'none',
      repeat: -1,
    })
})
</script>

<template>
  <div id="main">
    <div id="flow">
      <span id="flow_top">视频中心</span>
      <span id="flow_center">VIDEO CENTER</span>
    </div>
    <TransitionGroup tag="div" id="layout_box" :style="{ height: screenHeight + 'px' }">
      <div :key="item" class="swiper_box" v-for="item in page"
        :style="{ height: screenHeight + 'px', width: windowWidth / 2.5 + 'px' }">
        <img :src="'/src/assets/Carousel/' + item.src + '.jpg'" style="height:100%; width:100%; object-fit:fill;" />
      </div>

    </TransitionGroup>

    <div id="check"></div>
  </div>
</template>

<style lang="scss" scoped>
#main {
  width: 100%;
  height: calc(100vh - 150px);
  display: flex;
  color: red;
  background-color: #fffef9;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  #flow {
    height: 150px;
    width: 1280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #2b3138;
    overflow: hidden;

    #flow_top {
      -webkit-text-stroke: black 0.3px;
      text-transform: uppercase;
    }

    #flow_center {
      margin-top: 10px;
      -webkit-text-stroke: black 0.3px;
    }

  }

  #layout_box {
    overflow: hidden;
    display: flex;

    .swiper_box {
      position: absolute;
      overflow: hidden;
    }
  }
}
</style>