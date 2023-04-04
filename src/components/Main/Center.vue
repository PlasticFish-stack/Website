<script setup>
import { ref } from 'vue';
import videoCenter from '../load/videoCenter.vue';
const pagesVideo = ['舞台灯光', '建筑照明', '灯光秀', '活动视频'];
const pagesNew = ['雅江动态', '媒体报道', '雅江公益', '展会'];
</script>

<template>
  <div class="center">
    <div id="box">
      <div id="box_card">
        <span>PRODUCTS</span>
        <button>查看详情</button>
      </div>
      <div id="box_img">
        <img src="src\assets\png\Page\silverstar.png" alt="" srcset="">
        <el-divider direction="vertical" />
        <img src="src\assets\png\Page\arctik.png" alt="" srcset="">
      </div>
    </div>
    <videoCenter 
      title="视频中心"
      page="VIDEO CENTER"
      :block="pagesVideo"
      type="video"
    />
    <videoCenter
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
  top: -20px;
  margin-top: 100px;
}

#box {
  height: 295px;
  width: 1380px;
  background-color: white;
  display: flex;
  flex-wrap: nowrap;
  margin: 0 auto;
  justify-content: center;
  border-bottom: 1px solid var(--el-border-color);
  box-shadow: var(--el-box-shadow-dark);
  border-radius: 4px;
  margin-bottom: 80px;
}

#box_card {
  height: 296px;
  width: 361px;
  background-image: url(src/assets/png/Background/bg1.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 4px;
  margin-top: 0px;
  flex-shrink: 0;
}
#box_card>span{
  font-size: 25px;
  display: block;
  margin-top: 70px;
}
#box_card>span::after{
  content: '产品中心';
  font-size: 40px;
  font-weight: bolder;
  display: block;
}

#box_img {
  width: 100%;
  color: black;
  flex-wrap: nowrap;
  overflow: hidden;
}

#box_img>img {
  height: 72%;
  width: 49%;
  position: relative;
  top: 15%;
}
#box_img>img:hover {
  height: 72%;
  width: 49%;
  position: relative;
  animation: bigbig 0.2s forwards !important;
}

:deep(.el-divider--vertical) {
  height: 9em;
  border-left: 2px var(--el-border-color) var(--el-border-style);
  z-index: 1;
  position: relative;
  top: 50%;
  transform: translateY(-120%);
}

#box_card>button {
  height: 45px;
  width: 150px;
  background-color: white;
  border-radius: 25px;
  color: #a0c836;
  outline: none;
  margin-top: 15px;
}
@keyframes bigbig {
  to{transform: scale(1.04);}
}
#box_card>button:hover {
  animation: bigbig 0.2s forwards !important;
  border: 0;
}
</style>