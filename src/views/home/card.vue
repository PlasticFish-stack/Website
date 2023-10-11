<script setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { TextPlugin } from 'gsap/all';
import { ref, computed, onMounted, watch } from 'vue';
import { add, divide, multiply, subtract } from '@/mixins/math.js';

gsap.registerPlugin(ScrollTrigger, Draggable, TextPlugin);
const message = ref(null)
const buy = ref(null)
const title = ref(null)
const block = new Array(7);
for (let i = 0; i < block.length; i++) {
  block[i] = 'display' + i
}//块显示内容
const throttle = (fn, time) => {
  let timer = null;
  return function () {
    if (!timer) {
      timer = setTimeout(function () {
        fn()
        timer = null
      }, time)
    }
  }
}
onMounted(() => {
  console.log(title);
  const box = gsap.utils.toArray('.swiper_box');
  const margin = 30
  const color = ['#00828b', '#276893', '#37344c', '#004db5', '#e67a2a', '#afc8ba', '#b65b46', '#c6574b', '#a22076', '#423171', '#c3a6cb'];
  const imgs = ['url(src/assets/Background/1.jpg)',
    'url(src/assets/Background/2.jpg)',
    'url(src/assets/Background/3.jpg)',
    'url(src/assets/Background/4.jpg)',
    'url(src/assets/Background/5.jpg)',
    'url(src/assets/Background/6.jpg)',
    'url(src/assets/Background/7.jpg)'];
  const msg = [
    {
      title: '拍摄设备',
      content: '明月几时有 把酒问青天',
      alink0: {
        src: 'www.baidu.com',
        title: '了解更多'
      },
      alink1: {
        src: 'www.baidu.com',
        title: '立即购买'
      }
    },
    {
      title: '拍摄设备',
      content: '山重水复疑无路 柳暗花明又一村',
      alink0: {
        src: 'www.baidu.com',
        title: '立即购买'
      },
      alink1: {
        src: 'www.baidu.com',
        title: '了解更多'
      }
    },
    {
      title: '拍摄设备',
      content: '人生如梦 一尊还酹江月',
      alink0: {
        src: 'www.baidu.com',
        title: '了解更多'
      },
      alink1: {
        src: 'www.baidu.com',
        title: '立即购买'
      }
    },
    {
      title: '拍sdadsa摄设备',
      content: '斜阳照墟落 穷巷牛羊归',
      alink0: {
        src: 'www.baidu.com',
        title: '立即购买'
      },
      alink1: {
        src: 'www.baidu.com',
        title: '了解更多'
      }
    },
    {
      title: '拍摄wqewqe设备',
      content: '红豆生南国 春来发几枝',
      alink0: {
        src: 'www.baidu.com',
        title: '了解更多'
      },
      alink1: {
        src: 'www.baidu.com',
        title: '立即购买'
      }
    },
    {
      title: '拍asdasdaf摄设备',
      content: '青山遮不住 毕竟东流去',
      alink0: {
        src: 'www.baidu.com',
        title: '立即购买'
      },
      alink1: {
        src: 'www.baidu.com',
        title: '了解更多'
      }
    },
    {
      title: '拍摄设备',
      content: '海上生明月 天涯共此时',
      alink0: {
        src: 'www.baidu.com',
        title: '了解更多'
      },
      alink1: {
        src: 'www.baidu.com',
        title: '立即购买'
      }
    }
  ]
  gsap.set(box, {
    marginRight: margin,
    backgroundImage: gsap.utils.wrap(imgs),
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
    const { width, speed, xStart, totalWidth, snap } = initBox;
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

  // let ratio = gsap.utils.snap((1 / box.length ));;
  const curStart = ((document.querySelector('#layout_box').offsetWidth / 2) - (initBox.width / 2)) + ((-box[0].offsetLeft) + initBox.width);
  const map = gsap.utils.mapRange(0, 1, 0, loop.duration());//map方法

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


  let nowIndex = 0;

  const midrange = times.some((item, index) => {
    return subtract(times[index + 1], item) > 0
  }) ? divide(subtract(times[1], times[0]), 2) : null;//times偏离值
  const interval = times.map((item, index) => {
    let val = null
    if (times[index + 1] === undefined) {
      val = +timeWrap(subtract(times[0], midrange)).toFixed(2)
    } else {
      val = +timeWrap(subtract(times[index + 1], midrange)).toFixed(2)
    }
    return { "min": +timeWrap(subtract(item, midrange)).toFixed(2), "max": val, 'index': index }
  })
  interval.forEach((item, index) => {
    if (item.min - item.max > 0) {
      interval[interval.length] = { "min": item.min, "max": add(item.min, multiply(midrange, 2)), 'index': index }
      item.min = subtract(item.max, multiply(midrange, 2))
    }
  })

  const boxWrap = gsap.utils.wrap(0, times.length);
  console.table(interval);
  const adsorption = (val) => {
    const result = interval.find((item) => {
      if (val >= item.min)
        return val >= item.min && val <= item.max
    })
    return result.index
  }
  let startX = null;
  const draggable = Draggable.create('.drag-proxy', {
    trigger: '#layout_box',
    type: "x",
    minimumMovement: 40,
    onPressInit() {
      initBox.draggableStart = loop.progress();
      startX = loop.progress();
    },
    onDrag() {
      if (tweenLoop) {
        tweenLoop.pause();
        tweenLoop = null;
        nowIndex = adsorption(loop.time())
      }
      loop.progress(wrap(initBox.draggableStart + (this.startX - this.x) * (1 / initBox.totalWidth())));
      //拖动强制结束动画，进行拖动操作
      // if (bool) {
      //   loop.progress(wrap(initBox.draggableStart + (this.startX - this.x) * (1 / initBox.totalWidth())));
      //   nowIndex = adsorption(loop.time())
      // }
      //强制等动画结束才能拖动

    },
    onDragEnd() {
      console.log('chufa');
      nowIndex = adsorption(loop.time())
      toIndex(loop.time(), { duration: 0.4 }, true)
    },
  })
  loop.draggable = draggable;
  loop.progress(1, true).progress(io[0], true);



  let bool = true;
  let tweenLoop = null;
  let textVal = 0;
  function toIndex(timeVal, config, compel) {
    if (!compel) {
      if (!bool) {
        return
      } else {
        bool = false;
        setTimeout(() => bool = true, config.duration ? add(multiply(config.duration, 1000), 200) : 800);
      }
    }
    let vals = adsorption(loop.time());
    let val = adsorption(timeVal)
    config = config || {};
    config.duration = config.duration || 0.6;
    config.ease = config.ease || "power3.out"

    console.log("当前的时间轴值是" + times[nowIndex], "索引值是" + nowIndex, "目标时间轴值是" + times[val], "目标索引是" + val, vals);
    switch (true) {
      case ((subtract(times[val], loop.time()) > divide(loop.duration(), 2)) && (loop.time() < times[val]) && ((-loop.time()) >= (-times[val])) && subtract(loop.time(), multiply(midrange, 6)) < 0):
        config.modifiers = { time: gsap.utils.wrap(0, loop.duration()), overwrite: true };
        tweenLoop = loop.tweenTo(
          // subtract(loop.time(), subtract(add(times[nowIndex], loop.duration()), times[val]))
          -(subtract(loop.duration(), times[val]))
          , config);
        textChange()
        console.log({
          "当前time值": loop.time(),
          "nowIndex": nowIndex,
          "val": val,
          "times[val]": times[val],
          "times[nowIndex]": times[nowIndex]
        }, "<-----------");
        break;//   <------
      case ((subtract(times[val], times[nowIndex]) < -divide(loop.duration(), 2)) && loop.time() >= subtract(times[nowIndex], midrange) && subtract(loop.time(), divide(loop.duration(), 2)) > 0):
        config.modifiers = { time: gsap.utils.wrap(0, loop.duration()), overwrite: true };
        tweenLoop = loop.tweenTo(
          // add(times[nowIndex], add(subtract(loop.duration(), times[nowIndex]), times[val]))
          add(loop.time(), add(subtract(loop.duration(), times[nowIndex]), times[val]))
          , config);
        textChange();
        console.log({
          "当前time值": loop.time(),
          "nowIndex": nowIndex,
          "val": val,
          "times[val]": times[val],
          "times[nowIndex]": times[nowIndex]
        }, "----------->");
        break;//  -------->
      case ((val === nowIndex) && times[vals] == gsap.utils.snap(times, loop.duration()) && (Math.abs(subtract(loop.time(), loop.duration())) > subtract(loop.duration(), midrange)) && (-loop.time() >= -times[nowIndex])):
        config.modifiers = { time: gsap.utils.wrap(0, loop.duration()), overwrite: true };
        tweenLoop = loop.tweenTo(-(subtract(loop.duration(), times[vals])), config);
        console.log(loop.duration(), times[vals], loop.time());
        console.log(-(subtract(loop.duration(), times[vals])), 'woca')
        break;// ||||||||||||||||
      default:
        tweenLoop = loop.tweenTo(times[val], config);
        // if(!times[val] == times[nowIndex]){
        //   textChange()
        // }
        console.log(vals, nowIndex, val, loop.time(), adsorption(loop.time()));
        textChange(vals)
        console.log({
          'vals': vals,
          "当前time值": loop.time(),
          "nowIndex": nowIndex,
          "val": val,
          "times[val]": times[val],
          "times[nowIndex]": times[nowIndex]
        }, "-----------");
        break;
    }
    console.log(tweenLoop.vars.time, loop.time());

    nowIndex = val
    return tweenLoop
  }

  gsap.set(title.value, {
    text: msg[nowIndex].content,
  })
  gsap.set(message.value, {
    text: msg[nowIndex].alink0.title
  })
  gsap.set(buy.value, {
    text: msg[nowIndex].alink1.title
  })

  function textChange(val) {
    if (textVal == val) {
      return
    }
    gsap.timeline().to(title.value, {
      opacity: 0,
      y: -50,
    }).to(title.value, {
      y: 10,
      text: msg[nowIndex].content,
      duration: 0
    }).to(title.value, {
      opacity: 1,
      y: 0,
      duration: 0.2
    })



    gsap.timeline().to(message.value, {
      opacity: 0,
      y: -30,
      duration: 0.6
    }).to(message.value, {
      y: 20,
      text: msg[nowIndex].alink0.title,
      duration: 0
    }).to(message.value, {
      opacity: 1,
      y: 0,
      duration: 0.6
    })



    gsap.timeline().to(buy.value, {
      opacity: 0,
      y: -30,
      duration: 0.6
    }).to(buy.value, {
      y: 20,
      text: msg[nowIndex].alink1.title,
      duration: 0
    }).to(buy.value, {
      opacity: 1,
      y: 0,
      ease: '"power4.out"',
      duration: 0.6
    })
    textVal = val
    console.log(textVal, 'TEXT');
  }

  box.forEach((item, index) => {
    item.addEventListener('click', () => {
      if (nowIndex === index) {
        console.log('cnm');
        return
      }
      toIndex(times[index], { duration: 1 })
    })
  })
  document.querySelector("#next").addEventListener("click", () => {
    toIndex(times[boxWrap(nowIndex + 1)], { duration: 0.4 })
  })
  document.querySelector("#prev").addEventListener("click", () => {
    toIndex(times[boxWrap(nowIndex - 1)], { duration: 0.4 })
  })










})

</script>

<template>
  <div id="main">
    <!-- <div id="u"></div> -->
    <div id="flow">
      <span id="flow_top">视频中心</span>
      <span id="flow_center">VIDEO CENTER</span>
    </div>


    <div id="layout_box">
      <div id="msg">
        <span>灯光设备</span>
        <span ref="title"></span>
        <div>
          <a ref="message"></a>
          <a ref="buy"></a>
        </div>
      </div>
      <div class="swiper_box" :key="item" v-for="item in block">

      </div>
      <div>

        <div id="prev">&lt</div>
        <div id="next">&gt</div>
      </div>

      <div class="drag-proxy"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#msg {
  color: black;
  margin-top: 50px;
  height: 30%;
  width: 50%;
  position: absolute;
  // border: 10px solid red;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    font-size: 48px;
    margin-bottom: 10px;
    font-weight: 600;
    color: white;
  }

  div {
    margin-top: 15px;
    display: flex;
  }

  a {
    font-size: 18px;
    font-weight: 600;
    color: white;
    margin-left: 25px;
    margin-right: 25px;
    display: block;
    position: relative;
  }

  a::after {
    position: absolute;
    height: 18px;
    width: 18px;
    content: url(@/icons/subscript.svg);
  }
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

    .mask {
      background-color: black;
      opacity: 0.5;
    }

    .swiper_box {
      height: 720px;
      width: 1200px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      position: relative;
    }

    .swiper_box::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: black;
      opacity: 0.3;
      /* 可调整透明度 */
      z-index: 1;
      /* 确保遮罩层在背景之上 */
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
}</style>