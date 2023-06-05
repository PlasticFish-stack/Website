<script setup>
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { onMounted } from 'vue';
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

onMounted(() => {
  gsap.fromTo(window, {
    scrollTrigger: {
      trigger: "#flow",
      start: "top center",
      end: "top top",
      scrub: 1,
      once: true
    },
    scrollTo: {y: "#check",  },
    duration: 1
  })
})
</script>

<template>
  <div id="main">
    <div id="flow">
      <span id="flow_top">Products</span>
      <span id="flow_center">产品中心</span>
      <span id="flow_bottom">系列展示</span>
    </div>
    <div id="layout">
      <div>SSP舞台灯光</div>
      <div>ARC建筑照明</div>
    </div>
    <div id="check"></div>
  </div>

</template>

<style lang="scss" scoped>
#main{
  width: 100%;
  display: flex;
  color: red;
  background-color: #fffef9;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  #flow{
    height: 150px;
    margin-top: 50px;
    margin-bottom: 50px;
    width: 1280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #2b3138;
    #flow_top{
      font-size: 50px;
      text-transform: uppercase;
    }
    #flow_center{
      margin-top: 20px;
      font-size: 40px;
      -webkit-text-stroke: black 0.7px;
    }
    #flow_bottom{
      margin-top: 14px;
      font-size: 25px;
      letter-spacing: 18px;
      direction: unset;
      padding-left: 18PX;
      -webkit-text-stroke: black 0.5px;
    }
  }
  #layout{
    height: calc(100vh - 150px);
    width: 1280px;
    background-color: black;
  }
}
</style>