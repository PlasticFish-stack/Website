<script setup>
import { ref } from 'vue';
import center from '@/components/load/card.vue';
const pagesVideo = ['舞台灯光', '建筑照明', '灯光秀', '活动视频'];
const pagesNew = ['雅江动态', '媒体报道', '雅江公益', '展会'];
</script>

<template>
  <div class="center">
    <center 
      title="视频中心"
      page="VIDEO CENTER"
      :block="pagesVideo"
      type="video"
    />
    <center
      title="新闻动态"
      page="NEWS"
      :block="pagesNew"
      type="news"
    />
  </div>
</template>

<style scoped>
.center {
  max-height: 100%;
  max-width: 100%;
  width: 100%;
  background-color: white;
  position: relative;
}
</style>