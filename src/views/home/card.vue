<script setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { onMounted } from 'vue';
gsap.registerPlugin(ScrollTrigger, Draggable);
onMounted(() => {
  const anime = () => {
    let iteration = 0;
    const stagger = 0.1;
    const box = gsap.utils.toArray('.swiper_box');
    const loop = gsap.timeline({
      paused: true,
      repeat: -1,
      ease: 'none'
    })//总时间轴
    const boxes = [...box, ...box, ...box];
    boxes.forEach((item, index) => {
      const line = gsap.timeline()
        .set(item, {
          xPercent: 200
        })
        .fromTo(item, {
          xPercent: 420,
          opacity: 1,
        }, {
          xPercent: -600,
          opacity: 1,
          duration: 1,
          ease: 'none',
          imageRendering: false,
          zIndex: boxes.length + 1,
        })
      loop.add(line, index * stagger)
    })
    const durations = 1;//等待时间
    const offset = stagger * box.length; //偏移值
    const durations_loop = boxes.length * stagger;// LOOP走完持续的时间
    const start_time = durations_loop + durations + offset; //起始时间 
    const end_time = start_time + durations_loop - offset; //结束时间
    
    const table = {
      start: start_time,
      end: end_time,
      duration: durations,
      offset,
      loop: durations_loop
    }
    console.table(table)
    const loop_head = gsap.fromTo(loop, {
      totalTime: start_time,

    }, {
      totalTime: end_time,
      duration: 10,
      ease: 'none',
      repeat: -1,
      paused: true
    })
    const PLAYHEAD = { position: 0 };
    const POSITION_WRAP = gsap.utils.wrap(0, loop_head.duration())
    const SCRUB = gsap.to(PLAYHEAD, {
      position: 0,
      onUpdate: () => {
        loop_head.totalTime(POSITION_WRAP(PLAYHEAD.position))
      },
      paused: true,
      duration: 1,
      ease: 'power3'
    })
    

    const TRIGGER = ScrollTrigger.create({
      start: 0,
      end: '+=5000',
      pin: '#main',
      horizontal: false,
      onUpdate: self => {
        const SCROLL = self.scroll()
        if (SCROLL > self.end - 1) {
          // Go forwards in time
          WRAP(1, 1)
        } else if (SCROLL < 1 && self.direction < 0) {
          WRAP(-1, self.end - 1)
        } else {
          SCRUB.vars.position = (iteration + self.progress) * loop_head.duration()
          SCRUB.invalidate().restart()
        }
      }
    })
    const WRAP = (iterationDelta, scrollTo) => {
      iteration += iterationDelta
      TRIGGER.scroll(scrollTo)
      TRIGGER.update()
    }
    const SNAP = gsap.utils.snap(1 / box.length); //计算距离
    
    const progressToScroll = progress => {
      return gsap.utils.clamp(1, TRIGGER.end - 1, gsap.utils.wrap(0, 1, progress) * TRIGGER.end);
    }
    const scrollToPosition = position => {
      const SNAP_POS = SNAP(position);
      const PROGRESS = (SNAP_POS - loop_head.duration() * iteration) / loop_head.duration();
      const SCROLL = progressToScroll(PROGRESS);
      if(PROGRESS >= 1 || PROGRESS < 0){
        return WRAP(Math.floor(PROGRESS), SCROLL)
      }
      TRIGGER.scroll(SCROLL);
    }
    ScrollTrigger.addEventListener('scrollEnd', () => {
      scrollToPosition(SCRUB.vars.position)
    })

  };
  anime()

























})
</script>

<template>
  <div id="main">
    <div id="flow">
      <span id="flow_top">视频中心</span>
      <span id="flow_center">VIDEO CENTER</span>
    </div>


    <div id="layout_box">
      <div class="swiper_box" :key="item" v-for="item in 10">
        {{ item }}
      </div>
    </div>


  </div>
</template>
<style lang="scss" scoped>
#main {
  width: 100%;
  // height: calc(100vh - 150px);
  height: 50000px;
  min-height: calc(100vh - 150px);
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

    .swiper_box {
      position: absolute;
      height: 600px;
      width: 900px;
      background-color: black;
      display: flex;
      justify-content: center;
      align-items: center;
      left: 50%;

    }
  }
}
</style>