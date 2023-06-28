<script setup>
import carousel from '@/views/home/carousel.vue'
import products from '@/views/home/products.vue'
import card from '@/views/home/card.vue'
</script>

<template>
  <div class="view">
    
    <!-- <carousel></carousel> -->
    <card></card>
    <products id="ss"></products>
    
  </div>
</template>

<style scoped>
 .view{
  position: relative;
  overflow-x: hidden;
 }
</style>