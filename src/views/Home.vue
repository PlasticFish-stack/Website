<script setup>
  import Carousel from "../components/Main/Carousel.vue"
  import Center from "../components/Main/Center.vue"
  import {reactive, ref, computed} from 'vue'
  import {mapGetters, mapState, useStore} from 'vuex'
  const store = useStore();
  
  const Num = computed(() => {
     return store.state.num
  })
</script>

<template>
  <div>
    <Carousel></Carousel>
    <Center></Center>
  </div>
</template>

<style scoped>

</style>