<script setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { computed, onMounted } from 'vue';
gsap.registerPlugin(ScrollTrigger, Draggable);


const block = new Array(7);
for (let i = 0; i < block.length; i++) {
  block[i] = 'display' + i
}//块显示内容

onMounted(() => {
  const box = gsap.utils.toArray('.swiper_box');
  const margin = 30;
  gsap.set(box, {
    marginRight: margin
  })
  const loop = gsap.timeline({
    repeat: -1,
    paused: true,
    // reversed: true,
    defaults: { ease: 'none' },
    onReverseComplete: () => loop.totalTime(loop.rawTime() + loop.duration() * 100)
  });
  const initBox = {
    width: gsap.getProperty(box[0], 'width'),
    speed: 100,
    xStart: box[0].offsetLeft,
    xEnd: box[box.length - 1].offsetLeft,
    totalWidth: () => {
      return initBox.xEnd - initBox.xStart + initBox.width + margin
    },
    snap: gsap.utils.snap(1),
    draggableStart: null,
    draggableEnd: null
  };
  let times = [];
  let num = [];
  box.forEach((el, index) => {
    const { width, speed, xStart, xEnd, totalWidth, snap } = initBox;
    const start = el.offsetLeft - xStart;
    const end = totalWidth() - start;
    loop.to(el, {
      xPercent: -snap((start / width * 100)),
      duration: start / speed,
      ease: 'none'
    }, 0)
    loop.fromTo(el, {
      xPercent: end / width * 100
    }, {
      xPercent: 0,
      ease: 'none',
      duration: end / speed,
      immediateRender: false,
    }, start / speed).add('label' + index, start / speed);
    times[index] = start / speed;
    num[index] = index + 1
  })
  loop.progress(1, true).progress(0, true);
  // let ratio = gsap.utils.snap((1 / box.length ));;

  const rtaio_i = (1 / initBox.totalWidth()) * 30
  const curStart = ((document.querySelector('#layout_box').offsetWidth / 2) - (initBox.width / 2)) + ((-box[0].offsetLeft) + initBox.width);


  const timeWrap = gsap.utils.wrap(0, loop.duration());
  times.forEach((t, i) => {
    times[i] = +(timeWrap(times[i] + curStart * loop.duration() / initBox.totalWidth()).toFixed(2))
  })
  loop.seek(times[0])
  const wrap = gsap.utils.wrap(0, 1);

  let io = new Array(8);

  for (let i = 0; i < box.length; i++) {
    io[i] = wrap(loop.progress() + (1 / initBox.totalWidth() * 1310) * i)

  }

  const ratio = gsap.utils.snap(io)

  const newArr = [];
  const loopProgress = loop.progress();
  times.forEach((item, index) => {
    newArr[index] = ratio(wrap(loopProgress + index * (1 / box.length)));
  })
  let animaDraggable = null

  let nowPage = 0;
  const draggable = Draggable.create('.drag-proxy', {
    trigger: '#layout_box',
    type: "x",
    onPressInit() {
      initBox.draggableStart = loop.progress();
    },
    onDrag() {
      loop.progress(wrap(initBox.draggableStart + (this.startX - this.x) * (1 / initBox.totalWidth())));
      initBox.draggableEnd = loop.progress();

    },
    onDragEnd() {
      animaDraggable = ratio(wrap(initBox.draggableEnd));
      gsap.fromTo(loop, {
        progress: initBox.draggableEnd
      }, {
        progress: animaDraggable,
        ease: "back.out(1.1)",
        duration: 0.4
      })
    },
  })
  loop.draggable = draggable;


  //test
  let config= {};
  let time = null;
  let nowIndex = 0;
  box.forEach((item, index) => {
    item.addEventListener('click', () => {
      time = times[index];
      console.log({'time': time, 'now': loop.time() , 'index' : index, 'nowindex': nowIndex});
      if(time < loop.time() && index > nowIndex){
        console.log(time);
        time = time  + loop.duration();
        console.log(time);
        console.log('chus');
      }else if(time < loop.time() && index < nowIndex){
        time = -time+loop.duration()
        console.log('1');
      }
      nowIndex = index
      config.duration = 1
      loop.tweenTo(time, config)
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
      <div class="swiper_box" :key="item" v-for="item in block">
        <div style="border: 1px solid red;">
          {{ item }}
        </div>

      </div>
      <div>
        <!--         
        <div id="prev">左</div>
        <div id="next">右</div> -->
      </div>

      <div class="drag-proxy"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#main {
  width: 100vw;
  height: calc(100vh - 5rem);
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
    overflow: hidden;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;

    .swiper_box {
      height: 720px;
      width: 1280px;
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