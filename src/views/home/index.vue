<script setup>
import carousel from '@/views/home/carousel.vue'
import products from '@/views/home/products.vue'
import card from '@/views/home/card.vue'
const anchor = () => {
  let el = document.querySelector('ss');
  document.body.scrollTop = el.offsetTop;
  document.documentElement.scrollTop = el.offsetTop
}
</script>

<template>
  <div class="view">
    
    <carousel></carousel>
    <card></card>
    <a href="" onclick="anchor('ss')" style="background-color: black;">12</a>
    <products id="ss"></products>
    
  </div>
</template>

<style scoped>
 .view{
  position: relative;
 }
</style>