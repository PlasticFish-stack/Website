<script setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { onMounted } from 'vue';
import { castToVueI18n } from 'vue-i18n';
gsap.registerPlugin(ScrollTrigger, Draggable);
onMounted(() => {
  const boxes = gsap.utils.toArray('.swiper_box');
  let loop = gsap.timeline({
    paused: false,
    repeat: -1,
    defaults: { ease: 'none' },
  });
  const startX = boxes[0].offsetLeft;
  console.log(startX, '123');
  const pixelSpeed = 1 * 100;
  const snap = gsap.utils.snap(1)
 
  let widths = [],
    xPercents = [];
  function populateWdith() {
    boxes.forEach((el, index) => {
      widths[index] = parseFloat(gsap.getProperty(el, 'width', 'px'));
      xPercents[index] = snap(parseFloat(gsap.getProperty(el, 'x', 'px')) / widths[index] * 100 + gsap.getProperty(el, 'xPercent'))
      
    })
  }
  populateWdith();
  gsap.set(boxes, {
    x: -startX
  })
  
  console.log(snap(boxes[0].offsetLeft));
  const totalWidth = snap(boxes[boxes.length-1].offsetLeft - boxes[0].offsetLeft - gsap.getProperty(boxes[0], 'width'));//最后一个块离屏幕左侧距离
  boxes.forEach((el, index) => {
    const distanceToStart = el.offsetLeft - startX;
    
    const distanceToLoop = distanceToStart + widths[index];
    console.log({
      '最后一项位置' : totalWidth,
      '到左第一走的距离': distanceToLoop,
      '继续位置': (distanceToLoop + totalWidth),
      '时间': (distanceToLoop + totalWidth) / pixelSpeed,
      '不知道什么东西':  ((totalWidth - distanceToLoop) + widths[0] * 2)
    });

    loop.to(el, {
      xPercent: snap((-distanceToLoop) / widths[index] * 100),
      duration: distanceToLoop / pixelSpeed
    }, 0)
    loop.fromTo(el, {
      xPercent: snap(( ((totalWidth - distanceToLoop) + widths[0] * 2) / widths[index] * 100))
    },{
      xPercent: 0,
      duration: ((totalWidth - distanceToLoop) + widths[0] * 2)/ pixelSpeed,
      immediateRender: false
    }, distanceToLoop / pixelSpeed)
    .add("label" + index, distanceToStart / pixelSpeed)
  })




















})
</script>

<template>
  <div id="main">
    <div id="flow">
      <span id="flow_top">视频中心</span>
      <span id="flow_center">VIDEO CENTER</span>
    </div>


    <div id="layout_box">
      <div class="swiper_box" :key="item" v-for="item in 15">
        {{ item }}
      </div>
      <div>
        <div id="prev">左</div>
        <div id="next">右</div>
      </div>
      <ul id="stone">
        <li v-for="item in 15"></li>
      </ul>
      <div class="drag-proxy"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#main {
  width: 100%;
  // height: calc(100vh - 150px);
  height: calc(100vh - 150px);
  display: flex;
  color: red;
  background-color: #fffef9;
  flex-direction: column;
  align-items: center;

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
    position: absolute;
    height: 1000px;
    display: flex;
    justify-content: center;
    left: 0;
    top: 130px;
    .swiper_box {
      height: 600px;
      width: 30%;
      background-color: black;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
    }

    #prev {
      height: 50px;
      width: 50px;
      position: absolute;
      z-index: 999;
      background-color: white;
      left: 50%;
      top: 30%;
      transform: translate(-380px, -50%);
    }

    #next {
      height: 50px;
      width: 50px;
      position: absolute;
      z-index: 999;
      background-color: white;
      right: 50%;
      top: 30%;
      transform: translate(380px, -50%);
    }

    .drag-proxy {
      visibility: hidden;
      position: absolute
    }
  }
}</style>