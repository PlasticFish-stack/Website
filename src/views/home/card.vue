<script setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { onMounted, reactive, computed } from 'vue';
import { useStore } from 'vuex'
gsap.registerPlugin(ScrollTrigger, Draggable);
const store = useStore();
const windowWidth = computed(() => store.state.windowWidth);
let screenHeight = computed(() => (windowWidth.value / 8)); //5
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

})
</script>

<template>
  <div id="main">
    <div id="flow">
      <span id="flow_top">视频中心</span>
      <span id="flow_center">VIDEO CENTER</span>
    </div>
    <TransitionGroup tag="div" id="layout_box" :style="{ height: screenHeight + 'px', width: 100 + '%' }">
      <div class="swiper_box" :key="item" v-for="item in page"
        :style="{ height: screenHeight + 'px', width: screenHeight * 3.5 + 'px' }">
        <img :src="'/src/assets/Carousel/' + item.src + '.jpg'" style="height: 100%; width: 100%; object-fit: fill;" />
      </div>
      
    </TransitionGroup>
    <div class="actions">
    <button class="prev">←</button>
    <button class="next">→</button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.drag-proxy {
  visibility: hidden;
  position: absolute;
}
#main {
  width: 100%;
  height: calc(100vh - 150px);
  min-height: calc(100vh - 150px);
  display: flex;
  color: red;
  background-color: #fffef9;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  #flow {
    top: 0;
    position: relative;
    height: 100px;
    width: 1280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #2b3138;

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
    width: 100%;
    height: 100vh;

    
    .swiper_box {
      position: absolute;
      left: 60%;
      transform: translateX(-40%);
    }
    .prev{
      top: 0;
      left: 0;
      margin-left: 20px;
      height: 50px;
      width: 50px;
      position: absolute;
      background-color: red;
      z-index: 999;
    }
    .next{
      top: 0;
      right: 0;
      margin-right: 20px;
      height: 50px;
      width: 50px;
      position: absolute;
      background-color: red;
      z-index: 999;
    }
  }
}</style>