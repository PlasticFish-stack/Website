<script setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { ref, computed, onMounted, watch } from 'vue';
gsap.registerPlugin(ScrollTrigger, Draggable);


const block = new Array(7);
for (let i = 0; i < block.length; i++) {
  block[i] = 'display' + i
}//块显示内容
const throttle = (fn, time) => {
  let timer = null;
  return function(){
    if(!timer){
      timer = setTimeout(function(){
        fn()
        timer = null
      }, time)
    }
  }
}
onMounted(() => {
  const box = gsap.utils.toArray('.swiper_box');
  const margin = 30
  const color = ['#00828b', '#276893', '#37344c', '#004db5', '#e67a2a', '#afc8ba', '#b65b46', '#c6574b', '#a22076', '#423171', '#c3a6cb'];
  gsap.set(box, {
    marginRight: margin,
    backgroundColor: gsap.utils.wrap(color)
  })
  let length = box.length;
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

  let io = new Array(box.length);

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
  let tweenLoop = null;
  let nowIndex = 0;
  let startX = 0;
  let ratioStart = gsap.utils.snap((1 / initBox.totalWidth() * (initBox.width + margin)));
  let wrapIndex = gsap.utils.wrap(0, box.length);
  let curIndex = 0
  const draggable = Draggable.create('.drag-proxy', {
    trigger: '#layout_box',
    type: "x",
    onPressInit() {
      initBox.draggableStart = loop.progress();
      startX = loop.progress();
    },
    onDrag() {
      if(tweenLoop){
        tweenLoop.pause();
      }
      loop.progress(wrap(initBox.draggableStart + (this.startX - this.x) * (1 / initBox.totalWidth())));
      initBox.draggableEnd = loop.progress();
      
    },
    onDragEnd() {
      toIndexBool = true;
      animaDraggable = ratio(wrap(initBox.draggableEnd));
      console.log(animaDraggable, io.indexOf(animaDraggable), nowIndex, 'index');
      toIndex(io.indexOf(animaDraggable), {duration: 0.4})
      
    }, 
  })
  loop.draggable = draggable;
  console.log("loop总时间为:" + loop.duration());
  
  let is = [];
  times.map((item, index) => {
    is[index] = [item]
  })
  const timingWrap = gsap.utils.wrap(0, loop.duration());

  let toIndexBool = true;
  function toIndex(index, config){
    if(toIndexBool === false){
      return
    }
    setTimeout(() => {
      toIndexBool = true
    }, 600)
    config = config || {};
    let timing = null;
    let offsetIndex = box.length / 2;
    index = gsap.utils.wrap(0, box.length, index);
    config.modifiers = {overwrite : true};
    
    if(index > nowIndex && times[index] < times[nowIndex] && Math.abs(index - nowIndex) < offsetIndex && loop.time() >= times[nowIndex]){
      config.modifiers = {time: gsap.utils.wrap(0, loop.duration())}
      timing = times[nowIndex] + loop.labels["label1"] * Math.abs(nowIndex - index)
      tweenLoop = loop.tweenTo(timing, config)
    }else if(index < nowIndex && times[index] > times[nowIndex] && index - nowIndex <= 1 && Math.abs(index - nowIndex) < offsetIndex && loop.time() <= times[nowIndex]){
      config.modifiers = {time: gsap.utils.wrap(0, loop.duration())}
      timing = times[nowIndex] - loop.labels["label1"] * Math.abs(nowIndex - index)
      tweenLoop = loop.tweenTo(timing, config)
    }else{
      tweenLoop = loop.tweenTo(times[index], config)
    }
    nowIndex = index
    toIndexBool = false
  }
  console.log(nowIndex);
    // if(!tweenLoop){
        
    //   }else{
    //     tweenLoop.pause();
    //   }
    // config = config || {};
    
    // (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length)
    // let newIndex = gsap.utils.wrap(0, length, index);
    // let time = times[newIndex];
    // if(time > loop.time() !== index > curIndex){
    //   config.modifiers = {time: gsap.utils.wrap(0, loop.duration())};
    //   time += loop.duration() * (index > curIndex ? 1 : -1)
    // }
    // curIndex = newIndex;
    // config.overwrite = true;
    // tweenLoop = loop.tweenTo(time, config)

    // console.log(tweenLoop);
    // return tweenLoop
  
    // time = times[index];
    //   if(time < loop.time() && index > nowIndex && +Math.abs(time - loop.time()).toFixed(1) / +Math.abs(index-nowIndex) >= timing){
    //     time = +((time + loop.duration()).toFixed(1));
    //   }else if(time > loop.time()  && index < nowIndex && +Math.abs(time - loop.time()).toFixed(1) / +Math.abs(index-nowIndex) >= timing){
    //     config.modifiers = {time: gsap.utils.wrap(0, loop.duration())}
    //     time = +((loop.time()-(timing * +Math.abs(index-nowIndex))).toFixed(1));
    //   }
    //   nowIndex = index
    //   config.duration = 0.7;
    //   config.modifiers = {overwrite : true};
    //   console.log(config);
    //   tweenLoop = loop.tweenTo(time, config)
    //   return tweenLoop
  
  box.forEach((item, index) => {
    item.addEventListener('click', () => {
      toIndex(index, {duration: 0.4})
      console.log("点击的是"  + index + "NowIndex值为:"+nowIndex);
    })
  })
  document.querySelector("#next").addEventListener("click", ()=>{
    
    throttle(toIndex(nowIndex+1, {duration: 0.4}), 2000)

  })
  document.querySelector("#prev").addEventListener("click", ()=>{
    throttle(toIndex(nowIndex-1, {duration: 0.4}), 2000)
  })










})

</script>

<template>
  <div id="main">
    <div id="u"></div>
    <div id="flow">
      <span id="flow_top">视频中心</span>
      <span id="flow_center">VIDEO CENTER</span>
    </div>


    <div id="layout_box">
      <div class="swiper_box" :key="item" v-for="item in block">
        <div style="color: white; font-size: 80px;">
          {{ item }}
        </div>

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
#u{
  height: 100%;
  width: 20%;
  position: fixed;
  border: 10px solid red;
}
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
      width: 380px;
      
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