<script setup>
import { reactive, computed, watch } from 'vue';
import { useStore } from 'vuex'

const store = useStore();
const windowWidth = store.state.windowWidth
const page = reactive([
  {
    id: 0,
    src: 'n1',
    num: 1,
  }, {
    id: 1,
    src: 'n2',
    num: 2,
  }, {
    id: 2,
    src: 'n3',
    num: 3,
  }, {
    id: 3,
    src: 'n4',
    num: 4,
  }
])
let screenHeight = windowWidth / 2.48 + "px"
</script>
<template>
  <el-carousel trigger="click" :height="screenHeight">
    <el-carousel-item v-for="item in page" :key="item">
      <img :src="'/src/assets/Carousel/' + item.src + '.jpg'" style="height:100%; width:100%; object-fit:fill;" />
    </el-carousel-item>
  </el-carousel>
</template>

<style scoped>
.el-carousel--horizontal {
  max-height: 100%;
  max-width: 100%;
  width: 100%;
  padding: 0px;
  position: relative;
  z-index: 0;
}

:deep(.el-carousel__indicators--horizontal) {
  bottom: 45px;
}

:deep(.el-carousel__button) {
  height: 15px;
  width: 15px;
  border: 2px solid white;
  background-color: transparent;
  outline: none;
  margin-left: 15px;
}

:deep(.is-active>.el-carousel__button) {
  height: 15px;
  width: 15px;
  border-radius: 90%;
  border: 2px solid white;
  background-color: transparent;
  transform-origin: 8px 12px;
  transform: scale(1.5);
  outline: none;
  position: relative;
}

:deep(.is-active>.el-carousel__button::after) {
  content: '';
  height: 7px;
  width: 7px;
  background-color: greenyellow;
  border-radius: 45%;
  position: relative;
  left: 21%;
  top: 0%;
  display: block;
}</style>