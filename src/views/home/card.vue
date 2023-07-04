<script setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onMounted, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
gsap.registerPlugin(ScrollTrigger)


const { locale, t, tm } = useI18n();
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
  const elementTeam = gsap.utils.toArray('.swiper_box');
  const init = (team) => {
    const box = [...team, ...team, ...team];
    const timelink = 1;
    let iteration = 0;
    const playhead = {position: 0};
    const cycle_duration = 0.6 * box.length;
    const start_time = cycle_duration + (timelink * 0.5);
    const end_time = start_time + cycle_duration;
    const loop = gsap.timeline({
      repeat: -1,
      paused: true,
      ease: 'none'
    });
    box.forEach((item, index) => {
      const loop_animation = gsap
        .timeline()
        .fromTo(item, { xPercent: 110 }, { xPercent: -110, duration: 1, immediateRender: true, zIndex: index })
      loop.add(loop_animation, index * 0.3)
    });
    
    const loop_head = gsap.fromTo(loop, {
      totalTime: start_time
    }, {
      totalTime: end_time,
      duration: 10,
      ease: 'none',
      repeat: -1,
      paused: true,
    });
    const position_wrap = gsap.utils.wrap(0, loop_head.duration());
    const scrub_loop = gsap.to(playhead, {
      position: 0,
      onUpdate: ()=>{loop_head.totalTime(position_wrap(playhead.position))},
      paused: true,
      duration: 1,
      ease: 'none'
    })
    const WRAP = (iterationDelta, scrollTo) => {
      iteration += iterationDelta
      TRIGGER.scroll(scrollTo)
      TRIGGER.update()
    }
    const trigger = ScrollTrigger.create({
      start: 0,
      end: '+=2000',
      horizontal: false,
      pin: '#layout_box',
      onUpdate: self => {
        const SCROLL = self.scroll()
        if (SCROLL > self.end - 1) {
          WRAP(1, 1)
        } else if (SCROLL < 1 && self.direction < 0) {
          WRAP(1, self.end - 1)
        } else {
          scrub_loop.vars.totalTime = loop_head.duration() * self.progress
          scrub_loop.invalidate().restart()
        }
      }
    })//滚动触发器
    const SNAP = gsap.utils.snap(1 / box.length);
    const progressToScroll = progress => gsap.utils.clamp(1, TRIGGER.end -1 , gsap.utils.wrap(0, 1, progress) * TRIGGER.end)
    const scrollToPosition = position => {
      const snap_pos = SNAP(position)
      const Progress = (snap_pos - loop_head.duration() * iteration) /loop_head.duration();
      const SCROLL = progress
    }
    ScrollTrigger.addEventListener('scrollEnd', () => scrollToPosition(scrub_loop.vars.position));
  }
  init(elementTeam)
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
        :style="{ height: screenHeight + 'px', width: screenHeight * 2.48 + 'px' }">
        <img :src="'/src/assets/Carousel/' + item.src + '.jpg'" style="height: 100%; width: 100%; object-fit: fill;" />
      </div>
      <button id="prev" key="prev">prev</button>
      <button id="next" key="next">next</button>
    </TransitionGroup>
    <button id="add">1</button>
    <div id="check"></div>
  </div>
</template>
<style lang="scss" scoped>
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
    height: 150px;
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
    height: 100%;
    width: 100%;
    display: grid;
    place-items: center;
    
    .swiper_box {
      position: absolute;
    }
    #prev{
      left: 0;
      margin-left: 20px;
      height: 50px;
      width: 50px;
      position: absolute;
      background-color: red;
      z-index: 999;
    }
    #next{
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