<script setup>
import gsap from 'gsap'
import 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { computed, onMounted } from 'vue';
import { GAP } from 'element-plus';
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
    defaults: { ease: 'none' },
    onReverseComplete: () => loop.totalTime(loop.rawTime() + loop.duration() * 100)
  });

  const initBox = {
    width: gsap.getProperty(box[0], 'width'),
    speed: 100,
    xStart: box[0].offsetLeft,
    xEnd: box[box.length - 1].offsetLeft,
    totalWidth: () => {
      return initBox.xEnd - initBox.xStart + initBox.width
    },
    snap: gsap.utils.snap(1),
    draggableStart : null,
    draggableEnd: null
  };
  initBox.totalWidth()
  let times = [];
  box.forEach((el, index) => {
    const { width, speed, xStart, xEnd, totalWidth, snap } = initBox;

    const start = el.offsetLeft - xStart;
    const end = totalWidth() + margin - start;
    console.log(totalWidth() + margin - start, '123');
    // console.table({
    //   'start': start,
    //   'end': end,
    //   'elLeft': el.offsetLeft,
    //   'xStart': xStart
    // });
    loop.to(el, {
      xPercent: -snap(start / width * 100),
      duration: start / speed,
      ease: 'none'
    }, 0).fromTo(el, {
      xPercent: snap(end / width * 100)
    }, {
      xPercent: 0,
      ease: 'none',
      duration: end  / speed,
      immediateRender: false,
    }, start / speed).add('label' + index, start / speed);
    times[index] = start / speed
    
  })
  loop.progress(1, true).progress(0, true);


  const curStart = ((document.querySelector('#layout_box').offsetWidth / 2) - initBox.width / 2) + margin/2 - margin +  (Math.abs(box[0].offsetLeft) + initBox.width);

  const timeWrap = gsap.utils.wrap(0, loop.duration());
  times.forEach((t, i) => {
    times[i] = +(timeWrap(times[i] + curStart * loop.duration() / initBox.totalWidth()).toFixed(2))
  })
  loop.seek(times[0])
  const wrap = gsap.utils.wrap(0, 1);
  
  const newArr = [];
  const loopProgress = loop.progress();
  times.forEach((item, index) => {
    newArr[index] = wrap(loopProgress + index * (1 / box.length));
  })
  console.log(newArr);
  const init = +gsap.utils.snap(newArr, 0);
  const ratio = gsap.utils.snap(1 / box.length);

  let animaDraggable = null;
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
      animaDraggable = initBox.draggableStart + ratio((this.startX - this.x)* (1 / initBox.totalWidth()));

      
      gsap.fromTo(loop, {
        progress: initBox.draggableEnd
      }, {
        progress: animaDraggable,
        ease: "back.out(1.1)",
        duration: 0.4
      })
   
      console.log(loop.iteration(), 'testttttt');
    },
  })
  loop.draggable = draggable;

  const wrap_test = gsap.utils.wrap(0, 1)
  let io = loop.progress();
  const lip = (test) => {
    io = wrap_test(io - (1 / box.length))
    loop.progress(io)
    
  }
  document.querySelector('#prev').addEventListener('click', () => {
    lip()
  })

  // const boxes = gsap.utils.toArray('.swiper_box');
  // const boxes_parentNode = boxes[0].parentNode;
  // console.log(boxes_parentNode);
  // gsap.set(boxes, {
  //   marginRight: 20
  // })
  // let loop = gsap.timeline({
  //   paused: true,
  //   repeat: -1,
  //   defaults: { ease: 'none' },
  //   onReverseComplete: () => loop.totalTime(loop.rawTime() + loop.duration() * 100)
  // });


  // const pixelSpeed = 1 * 100;
  // const snap = gsap.utils.snap(1);

  // const startX = boxes[0].offsetLeft;
  // let widths = [],
  //   xPercents = [];
  // function populateWdith() {
  //   boxes.forEach((el, index) => {
  //     widths[index] = parseFloat(gsap.getProperty(el, 'width', 'px'));
  //     xPercents[index] = snap(parseFloat(gsap.getProperty(el, 'x', 'px')) / widths[index] * 100 + gsap.getProperty(el, 'xPercent'))
  //   })
  // }
  // populateWdith();
  // const totalWidth = computed(() => {
  //   if (boxes[0].offsetLeft < 0) {
  //     return Math.abs(boxes[0].offsetLeft) + Math.abs(boxes[boxes.length - 1].offsetLeft) + gsap.getProperty(boxes[boxes.length - 1], "width");
  //   } else {
  //     return Math.abs(boxes[boxes.length - 1].offsetLeft) + gsap.getProperty(boxes[boxes.length - 1], "width");
  //   }
  // })//总宽度
  // const times = [];
  // boxes.forEach((el, index) => {
  //   const distanceToStart = el.offsetLeft - startX;
  //   console.log(el.offsetLeft, el.innerHTML);
  //   console.log(distanceToStart);
  //   const distanceToLoop = distanceToStart + widths[index];
  //   loop.to(el, {
  //     xPercent: snap((-distanceToLoop) / widths[index] * 100),
  //     duration: distanceToLoop / pixelSpeed
  //   }, 0)
  //   loop.fromTo(el, {
  //     xPercent: snap(((totalWidth.value - distanceToLoop + gsap.getProperty('.swiper_box', 'marginRight')) / widths[index] * 100))
  //   }, {
  //     xPercent: 0,
  //     duration: (totalWidth.value - distanceToLoop + gsap.getProperty('.swiper_box', 'marginRight')) / pixelSpeed,
  //     immediateRender: false
  //   }, distanceToLoop / pixelSpeed)
  //     .add("label" + index, distanceToStart / pixelSpeed)
  //   times[index] = distanceToStart / pixelSpeed
  // });
  // const wrap = gsap.utils.wrap(0, 1);
  // const ratio = 1 / totalWidth.value;
  // const dragSnap = totalWidth.value / boxes.length;

  // let startProgress = null;
  // let snap_sec = gsap.utils.snap(1 / boxes.length);
  // let transform_start = null;
  // let transform_end = null;
  // console.log(loop.duration() );
  // let timeOffset = loop.duration() * (boxes_parentNode.offsetWidth /2) / totalWidth.value;
  // console.log(timeOffset, 'off');



  // loop.progress(1, true).progress(0, true);
  // const scope = gsap.utils.wrap(0, 7)


  // const draggable = Draggable.create('.drag-proxy', {
  //   trigger: '#layout_box',
  //   type: "x",
  //   onPress() {
  //     startProgress = loop.progress();
  //     loop.progress(startProgress);
  //   },
  //   onDrag() {
  //     loop.progress(wrap(startProgress + (this.startX - this.x) * ratio));
  //     transform_start = loop.progress()
  //   },
  //   onRelease() {
  //     transform_end = snap_sec(loop.progress());
  //     gsap.fromTo(loop, {
  //       progress: transform_start
  //     }, {
  //       progress: transform_end,
  //       ease: "back.out(1.1)",
  //       duration: 0.75
  //     })
  //   },
  //   onThrowUpdate() {
  //     loop.progress(wrap(startProgress + (this.startX - this.x) * ratio));
  //     transform_start = loop.progress()
  //   },
  // })
  // console.log(loop);
  // loop.draggable = draggable;
  // loop.times = times
  // let test = 0;
  // const test_t = gsap.utils.wrap(0, 80)
  // const toIndex = (index, vars) => {
  //   vars = vars || {};
  //   (Math.abs(index - num) > boxes.length / 2) && (index += index > num ? -boxes.length : boxes.length);
  //   let newIndex = gsap.utils.wrap(0, boxes.length, index);
  //   let time = times[newIndex];
  //   console.log(time, loop.time(), index , num);
  //   if (time > loop.time() !== index > num) {
  //     vars.modifiers = {time: gsap.utils.wrap(0, loop.duration())}
  //     time += loop.duration() * (index > num ? 1 : -1);
  //   }
  //   num = newIndex;
  //   // return loop.tweenTo(('label' + (newIndex)).toString(), {
  //   //   duration: 0.4,
  //   //   overwrite: true
  //   // })

  //   return loop.tweenTo(time, vars)
  // }
  // const prev = document.querySelector('#prev').addEventListener('click', () => {
  //   toIndex(num - 1, {duration: 0.4})
  // })
  // const next = document.querySelector('#next').addEventListener('click', () => {
  //   toIndex(num + 1)
  // })
  // boxes.forEach((item, index) => {
  //   item.addEventListener('click', () => {

  //   })
  // })








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
    border: 1px solid blue;

    #flow_top {
      border: 1px solid blue;
      -webkit-text-stroke: black 0.3px;
      text-transform: uppercase;
    }

    #flow_center {
      border: 1px solid blue;
      margin-top: 10px;
      -webkit-text-stroke: black 0.3px;
    }
  }

  #layout_box {
    overflow-x: hidden;
    width: 100%;
    position: relative;
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