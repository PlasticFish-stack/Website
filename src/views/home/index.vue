<script setup>
import carousel from '@/components/view/carousel.vue'
import products from '@/components/view/products.vue'
import center from '@/components/view/center.vue'
</script>

<template>
  <div class="view">
    <carousel></carousel>
    <products></products>
    <center></center>
  </div>
</template>

<style scoped>
 .view{
  position: relative;
  margin-top: 40px;
 }
</style>