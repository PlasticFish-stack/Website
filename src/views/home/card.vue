<script setup>
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n'
const { locale, t, tm } = useI18n();
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
    scrollTo: { y: "#check", },
    duration: 1
  })




</script>

<template>
  <div id="main">
    <div id="flow">
      <span id="flow_top">Products</span>
      <span id="flow_center">产品中心</span>
      <span id="flow_bottom">系列展示</span>
      {{ tm('navbar.products.title') }}
    </div>
    <div id="layout">
      <div id="layout_page">
        <button>{{ tm('navbar.products.child[0].title') }}</button>
        <button>{{ tm('navbar.products.child[1].title') }}</button>
      </div>

    </div>
    <div id="check"></div>
  </div>
</template>

<style lang="scss" scoped>
#main {
  width: 100%;
  display: flex;
  color: red;
  background-color: #fffef9;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;

  #flow {
    height: 150px;
    margin-top: 50px;
    margin-bottom: 50px;
    width: 1280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #2b3138;

    #flow_top {
      font-size: 50px;
      text-transform: uppercase;
    }

    #flow_center {
      margin-top: 20px;
      font-size: 40px;
      -webkit-text-stroke: black 0.7px;
    }

    #flow_bottom {
      margin-top: 14px;
      font-size: 25px;
      letter-spacing: 18px;
      direction: unset;
      padding-left: 18px;
      -webkit-text-stroke: black 0.5px;
    }
  }

  #layout {
    height: calc(100vh - 150px);
    color: #45b787;
    font-weight: 600;
    justify-content: center;
    flex-wrap: wrap;

    #flow {
      margin-top: 20px;
      margin-bottom: 20px;
      width: 1280px;
      font-size: 3rem;
    }

    #layout {
      height: 100vh;
      width: 1280px;
      background-color: gray;
      display: flex;
      justify-content: center;

      #layout_page {
        display: flex;
        margin-top: 20px;

        button {
          height: 50px;
          width: 8rem;
          margin-left: 20px;
          margin-right: 20px;
          background-color: #45b787;
          color: white;
          font-size: 17px;
          border-radius: 12px;
          border: none;
          box-shadow: var(--el-box-shadow-light);
        }
      }
    }
  }</style>