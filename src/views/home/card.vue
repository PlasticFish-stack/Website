<script setup>
import gsap from 'gsap'
import 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { onMounted } from 'vue';
gsap.registerPlugin(ScrollTrigger, Draggable);
onMounted(() => {
  const boxes = gsap.utils.toArray('.swiper_box');
  let loop = gsap.timeline({
    paused: true,
    repeat: -1,
    defaults: { ease: 'none' },
  });
  const startX = boxes[0].offsetLeft;

  const pixelSpeed = 1 * 100;
  const snap = gsap.utils.snap(1);

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
    // x: -startX
    xPercent: 0
  })
  const totalWidth = snap(boxes[boxes.length - 1].offsetLeft - boxes[0].offsetLeft + gsap.getProperty(boxes[0], 'width'));//最后一个块离屏幕左侧距离
  console.log(totalWidth);

  boxes.forEach((el, index) => {
    const distanceToStart = el.offsetLeft - startX;
    const distanceToLoop = distanceToStart + widths[index];
    loop.to(el, {
      xPercent: snap((-distanceToLoop) / widths[index] * 100),
      duration: distanceToLoop / pixelSpeed
    }, 0)
    loop.fromTo(el, {
      xPercent: snap(((totalWidth - distanceToLoop + gsap.getProperty('.swiper_box', 'marginRight')) / widths[index] * 100))
    }, {
      xPercent: 0,
      duration: (totalWidth - distanceToLoop + gsap.getProperty('.swiper_box', 'marginRight')) / pixelSpeed,
      immediateRender: false
    }, distanceToLoop / pixelSpeed)
      .add("label" + index, distanceToStart / pixelSpeed)
  })
  const wrap = gsap.utils.wrap(0, 1);
  const ratio = 1 / totalWidth;
  const dragSnap = totalWidth / boxes.length;

  let startProgress = null;
  let startPage = 4;
  let snap_sec = gsap.utils.snap(1 / boxes.length);
  console.log(snap_sec);
  let transform_start = null;
  let transform_end = null;
  loop.progress(ratio * dragSnap * startPage);// 第一项位置为4

  const draggable = Draggable.create('.drag-proxy', {
    trigger: '#layout_box',
    type: "x",
    onPress() {
      startProgress = loop.progress();
      loop.progress(startProgress);
    },
    onDrag() {
      loop.progress(wrap(startProgress + (this.startX - this.x) * ratio));
      console.log(wrap(startProgress + (this.startX - this.x) * ratio), '111')
      transform_start = loop.progress()
    },
    onDragEnd() {
      transform_end = snap_sec(loop.progress());
      gsap.fromTo(loop, {
        progress: transform_start
      }, {
        progress: transform_end,
        ease: "back.out(1.2)",
        duration: 0.25
      })
    },
    onThrowUpdate() {
      loop.progress(wrap(startProgress + (this.startX - this.x) * ratio));
      transform_start = loop.progress()
    },
  })
  loop.draggable = draggable;
  document.querySelector('#prev').addEventListener('click', () => {
    let plan = loop.progress() - 1 / boxes.length;

    gsap.to(draggable,  {
      onDragEnd(){ wrap(plan)},
    })
  });
  document.querySelector('#next').addEventListener('click', () => {
    gsap.fromTo(loop, {
      progress: loop.progress()
    }, {
      progress: loop.progress() + 1 / boxes.length,
      
    })
    console.log(loop.progress(), "next");
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
      <div class="swiper_box" :key="item" v-for="item in 7">
        {{ item }}
      </div>
      <div>
        <div id="prev">左</div>
        <div id="next">右</div>
      </div>

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
    overflow-x: hidden;
    width: 100%;
    position: relative;
    height: 720px;
    display: flex;
    justify-content: center;

    .swiper_box {
      height: 720px;
      width: 1200px;
      margin-right: 15px;
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
      border-radius: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
      left: 45%;
      top: 50%;
      transform: translate(-380px, -50%);
    }

    #next {
      height: 50px;
      width: 50px;
      position: absolute;
      z-index: 999;
      background-color: white;
      display: flex;
      border-radius: 45px;
      justify-content: center;
      align-items: center;
      right: 45%;
      top: 50%;
      transform: translate(380px, -50%);
    }

    .drag-proxy {
      visibility: hidden;
      position: absolute
    }
  }
}
</style>