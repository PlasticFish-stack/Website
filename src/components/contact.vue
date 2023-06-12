<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
let bool = true;
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
    <TransitionGroup name="list" tag="div">
      <div id="contact" key="contact" @mouseenter="lengthen()">
        <svg t="1686551078813" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="22950" width="30" height="30">
          <path
            d="M534.6 403.5l294.2 294.2c12.5 12.5 32.8 12.5 45.3 0l0 0c12.5-12.5 12.5-32.8 0-45.3L557.3 335.6c-25-25-65.5-25-90.5 0L150 652.4c-12.5 12.5-12.5 32.8 0 45.3l0 0c12.5 12.5 32.8 12.5 45.3 0l294.1-294.2C501.9 391 522.1 391 534.6 403.5z"
            fill="#45b787" p-id="22951"></path>
        </svg>
      </div>
      <div key="list">
        <ul>
          <li>aa</li>
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

<style scoped>
#view {
  opacity: 0;
}

#contact {
  height: 40px;
  width: 40px;
  display: flex;
  box-shadow: var(--el-box-shadow-lighter);
  justify-content: center;
  align-items: center;
  border-radius: 45px;
  position: fixed;
  margin-right: 80px;
  margin-bottom: 140px;
  right: 0;
  bottom: 0;
  transform: rotate(-90deg);
  background-color: white;
  cursor: pointer;
}

#contact::after {
  content: '';
  box-shadow: var(--el-box-shadow-lighter);
  border-radius: 50%;
  height: 100%;
  width: 100%;
  position: absolute;
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
  position: fixed;
  margin-right: 80px;
  margin-bottom: 80px;
  right: 0;
  bottom: 0;
  background-color: white;
  cursor: pointer;
}

#back::after {
  content: '';
  box-shadow: var(--el-box-shadow-lighter);
  border-radius: 50%;
  height: 100%;
  width: 100%;
  position: absolute;
}
</style>