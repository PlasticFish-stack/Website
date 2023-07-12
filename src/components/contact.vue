<script setup>
import { onMounted, reactive, } from 'vue'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { throttle } from '@/utils/index.js'
gsap.registerPlugin(ScrollTrigger);

const icon = ['facebook', 'meta', 'qq', 'redbook', 'tiktok', 'twitter', 'wechat', 'weibo', 'youtube'];
let bool = reactive({ type: true });
const lengthen = (val) => {
  bool.type = val;
}
function onEnter(el, done) {
  if(bool.type == false){
    gsap.fromTo(el, {
    width: 40
  },{
    width: 390,
    duration: 0.4,
    immediateRender: false,
  })
  }else{
    gsap.fromTo(el, {
    width: 390
  },{
    width: 40,
    duration: 0.3,
    immediateRender: false,
  })
  }
  
}
onMounted(() => {
  const showAnim = gsap.from('#view', {
    autoAlpha: 1,
    paused: true,
    duration: 0.5,
  }).progress(1);
  ScrollTrigger.create({
    start: 150,
    end: 99999,
    onUpdate: (self) => {
      self.direction === -1 ? showAnim.play() : showAnim.reverse()
    }
  });
})
</script>

<template>
  <div id="view">
    <TransitionGroup name="list" :css="false" tag="div" @enter="onEnter"  id="viewbox">
      <div id="contact" :key="bool.type" @mouseenter="throttle(lengthen(false), 1000)" @mouseleave="throttle(lengthen(true), 1000)">
        <img src="/src/icons/link.svg" v-show="bool.type == true">
        <ul id="icon" v-show="bool.type == false">
          <li v-for="item in icon"><img :src="'/src/icons/'+ item + '.svg'" alt="" srcset=""></li>
        </ul>
      </div>
    </TransitionGroup>
    <div id="back">
      <svg t="1686551078813" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="22950" width="30" height="30">
        <path
          d="M534.6 403.5l294.2 294.2c12.5 12.5 32.8 12.5 45.3 0l0 0c12.5-12.5 12.5-32.8 0-45.3L557.3 335.6c-25-25-65.5-25-90.5 0L150 652.4c-12.5 12.5-12.5 32.8 0 45.3l0 0c12.5 12.5 32.8 12.5 45.3 0l294.1-294.2C501.9 391 522.1 391 534.6 403.5z"
          fill="#45b787" p-id="22951"></path>
      </svg>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#viewbox {
  margin-right: -40px;
  border-radius: 20px;
  height: 40px;
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  position: relative;
  /* overflow: hidden; */
}

#view {
  overflow: hidden;
  justify-content: flex-end;
  height: 120px;
  width: 400px;
  opacity: 0;
  display: flex;
  position: fixed;
  margin-right: 80px;
  margin-bottom: 80px;
  padding-right: 3px;
  right: 0;
  bottom: 0;
}

#list {
  transform: translateX(240px);
  position: absolute;
  height: 40px;
  width: 200px;
  display: flex;
  box-shadow: var(--el-box-shadow-lighter);
  justify-content: center;
  align-items: center;
  border-radius: 45px;
  background-color: #fffef9;
}

#contact {

  position: absolute;
  height: 40px;
  width: 40px;
  display: flex;
  box-shadow: var(--el-box-shadow-lighter);
  justify-content: center;
  align-items: center;
  border-radius: 45px;
  background-color: #fffef9;
  cursor: pointer;
  #icon{
    margin-left: 1%;
    display: flex;
    width: 90%;
    color: black;
    align-items: center;
    justify-content: center;
    li{
      margin-right: 9px;
      width: 28px;
      display: flex;
      justify-content: center;
    }
  }
}


#back {
  height: 40px;
  width: 40px;
  transform: rotate(0deg);
  display: flex;
  box-shadow: var(--el-box-shadow-lighter);
  justify-content: center;
  align-items: center;
  border-radius: 45px;
  background-color: #fffef9;
  cursor: pointer;
  margin-top: 65px;
}

</style>