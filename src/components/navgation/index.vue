<script setup>
import navgationBar from './navgationBar.vue'
import { onMounted } from 'vue'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)
onMounted(() => {
  const showAnim = gsap.from('.bar', {
    yPercent: -100,
    paused: true,
    duration: 0.2
  }).progress(1);

  ScrollTrigger.create({
    start: "top top",
    end: 99999,
    onUpdate: (self) => {
      self.direction === -1 ? showAnim.play() : showAnim.reverse()
    }
  });
})

</script>

<template>
  <div class="bar">
    <navgationBar></navgationBar>
  </div>
</template>

<style lang="scss" scoped>
.bar {
  height: 5rem;
  width: 100%;
  background-color: #fffef9;
 
}
</style>