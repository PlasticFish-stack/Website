<script setup>
import gsap from 'gsap'

import { onMounted, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n'
const { locale, t, tm } = useI18n();
import { useStore } from 'vuex'

const store = useStore();
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
  const stagger = 3
  const box = gsap.utils.toArray('.swiper_box')
  const LOOP = gsap.timeline({
    paused: true,
    repeat: -1
  })
  const boxs = [...box, ...box, ...box];
  boxs.forEach((item, index) => {
    LOOP.fromTo(item, {
      xPercent: 0
    },{
      xPercent: 0,
    }, 3)
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
    display: flex;
    z-index: 0;
    .swiper_box {
      margin-left: 5rem;
      margin-right: 5rem;
      overflow: hidden;
      z-index: 1;
    }
  }
}
</style>