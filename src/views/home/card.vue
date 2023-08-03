<script setup>
import gsap from 'gsap'
import 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { computed, onMounted } from 'vue';
import { GAP } from 'element-plus';
gsap.registerPlugin(ScrollTrigger, Draggable);
onMounted(() => {
  const boxes = gsap.utils.toArray('.swiper_box');
  gsap.set(boxes, {
    marginRight: 20
  })
  let loop = gsap.timeline({
    paused: true,
    repeat: -1,
    defaults: { ease: 'none' },
    onReverseComplete: () => loop.totalTime(loop.rawTime() + loop.duration() * 100)
  });


  const pixelSpeed = 1 * 100;
  const snap = gsap.utils.snap(1);

  const startX = boxes[0].offsetLeft;
  let widths = [],
    xPercents = [];
  function populateWdith() {
    boxes.forEach((el, index) => {
      widths[index] = parseFloat(gsap.getProperty(el, 'width', 'px'));
      xPercents[index] = snap(parseFloat(gsap.getProperty(el, 'x', 'px')) / widths[index] * 100 + gsap.getProperty(el, 'xPercent'))
    })
  }
  populateWdith();
  const totalWidth = computed(() => {
    if (boxes[0].offsetLeft < 0) {
      return Math.abs(boxes[0].offsetLeft) + Math.abs(boxes[boxes.length - 1].offsetLeft) + gsap.getProperty(boxes[boxes.length - 1], "width");
    } else {
      return Math.abs(boxes[boxes.length - 1].offsetLeft) + gsap.getProperty(boxes[boxes.length - 1], "width");
    }
  })//总宽度
  const times = [];
  boxes.forEach((el, index) => {
    const distanceToStart = el.offsetLeft - startX;
    const distanceToLoop = distanceToStart + widths[index];
    loop.to(el, {
      xPercent: snap((-distanceToLoop) / widths[index] * 100),
      duration: distanceToLoop / pixelSpeed
    }, 0)
    loop.fromTo(el, {
      xPercent: snap(((totalWidth.value - distanceToLoop + gsap.getProperty('.swiper_box', 'marginRight')) / widths[index] * 100))
    }, {
      xPercent: 0,
      duration: (totalWidth.value - distanceToLoop + gsap.getProperty('.swiper_box', 'marginRight')) / pixelSpeed,
      immediateRender: false
    }, distanceToLoop / pixelSpeed)
      .add("label" + index, distanceToStart / pixelSpeed)
    times[index] = distanceToStart / pixelSpeed
  });
  console.log(loop, 'time');
  console.log(times);
  const wrap = gsap.utils.wrap(0, 1);
  const ratio = 1 / totalWidth.value;
  const dragSnap = totalWidth.value / boxes.length;

  let startProgress = null;
  let snap_sec = gsap.utils.snap(1 / boxes.length);
  let transform_start = null;
  let transform_end = null;
  loop.progress(1, true).progress(0, true);
  const scope = gsap.utils.wrap(0, 7)
  let num = 4;
  loop.seek(times[num]);

  // loop.progress(ratio * dragSnap * startPage);// 第一项位置为4
  const draggable = Draggable.create('.drag-proxy', {
    trigger: '#layout_box',
    type: "x",
    onPress() {
      startProgress = loop.progress();
      loop.progress(startProgress);
    },
    onDrag() {
      loop.progress(wrap(startProgress + (this.startX - this.x) * ratio));
      transform_start = loop.progress()
    },
    onRelease() {
      transform_end = snap_sec(loop.progress());
      gsap.fromTo(loop, {
        progress: transform_start
      }, {
        progress: transform_end,
        ease: "back.out(1.1)",
        duration: 0.75
      })
    },
    onThrowUpdate() {
      loop.progress(wrap(startProgress + (this.startX - this.x) * ratio));
      transform_start = loop.progress()
    },
  })
  loop.draggable = draggable;
  loop.times = times
  const toIndex = (index) => {
    (Math.abs(index - num) > boxes.length / 2) && (index += index > num ? -boxes.length : boxes.length);
    let newIndex = gsap.utils.wrap(0, boxes.length, index);
    let time = times[newIndex];
    console.log(time, '123');
    if (time > loop.time() !== index > num) {
      time += loop.duration() * (index > num ? 1 : -1);
    }
    num = newIndex;
    return loop.tweenTo(time, {
      duration: 0.4,
      ease: "power1.inOut",
      overwrite: true
    })
  }
  const prev = document.querySelector('#prev').addEventListener('click', () => {
    toIndex(num - 1)
  })
  const next = document.querySelector('#next').addEventListener('click', () => {
    toIndex(num + 1)
  })
  boxes.forEach((item, index) => {
    item.addEventListener('click', () => {

    })
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