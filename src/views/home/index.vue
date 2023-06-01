<script setup>
import carousel from '@/views/home/carousel.vue'
import products from '@/views/home/products.vue'
import card from '@/views/home/card.vue'
import {onMounted, ref} from 'vue'
const carouselblock = ref(null);
onMounted(() => {
  console.log(carouselblock.value, '123');
  console.log(document.getElementById('s'));
})
</script>

<template>
  <div class="view">
    <carousel :ref="carouselblock" id="s"></carousel>
    <products></products>
    <card></card>
  </div>
</template>

<style scoped>
 .view{
  position: relative;
 }
</style>