<script setup>
import { onMounted, ref } from 'vue';


const props = defineProps(['title', 'page', 'block', 'type',]);
let showBool = true
if (props.type != 'video') {
  showBool = false
}
const num = ref(5)
function changePage(key){
  console.log(document.getElementById('swiper').style.transform(transformX)+ '231312');
  document.getElementById('swiper').style.transform = "translateX(+40px)";
}
</script>

<template>
  <div :class="showBool === true ? 'centerVideo' : 'centerNews'">
    <span id="page">{{ props.page }}</span>
    <span id="title">{{ props.title }}</span>
    <ul id="ul_f">
      <li id="li_f" v-for="item in props.block" :key="item"><el-button round type="success">{{ item }}</el-button></li>
    </ul>
    <div id="grid" v-if="showBool">
      <el-card v-for="item in 8">
        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="image" />
        <div id="cardText">
          <span>Yummy hamburger</span>
        </div>
      </el-card>
    </div>
    <div id="swiper" v-if="!showBool">
      <div id="swiper_hook">
        <div v-for="item in num" :key="item" class="swiper_box" >item</div>
      </div>
      <ul id="ul_s">
        <li v-for="item in num" :key="item"  id="li_s" @click="changePage(item)"><button></button></li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
#swiper_hook{
  height: 400px;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
#ul_s{
  display: flex;
  position: absolute;
  margin-top: 330px;
  left: 50%;
  transform: translateX(-50%);
  padding-left: 0px;
}
#li_s>button{
  height: 15px;
  width: 15px;
  border-radius: 45px;
  padding: 0px;
  background-color: #909399;
}
#li_s>button:hover{
  border-color:  #e1f3d8;
  background-color: #95d475;
}
#li_s>button:focus {
  outline-style: none;
}
#li_s>button:focus-visible{
  outline-style: none;
}
#li_s{
  
  margin-left: 25px;
  list-style: none;
}
#grid {
  width: 80%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
  overflow: hidden;
}
#swiper{
  padding-left: 20px;
  height: 400px;
  width: 100%;
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
}
.swiper_box{
  margin-top: -60px;
  height: 300px;
  width: 200px;
  background-color: black;
  color: red;
  margin-right: 30px;
}
img {
  height: 260px;
  width: 100%;
  position: relative;
  object-fit: cover;
  z-index: 0;
}

:deep(.el-card) {
  height: 260px;
  width: 400px;
  --el-card-padding: 0px;
  margin-left: 30px;
  margin-bottom: 40px;
}

#cardText {
  height: 60px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  margin-top: -66px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}


.centerVideo {
  width: 100%;
  background: url("src/assets/png/Background/bg2.jpg") no-repeat;
  background-size: cover;
  position: relative;
  color: black;
}

.centerNews {
  width: 100%;
  background: url("src/assets/png/Background/bg3.jpg") no-repeat;
  background-size: cover;
  position: relative;
  color: black;
}

#ul_f {
  display: flex;
  margin-right: 60px;
  justify-content: center;
}

#li_f {
  margin-left: 20px;
  list-style: none;
}

:deep(.el-button) {
  width: 120px;
  height: 40px;
  margin-bottom: 20px;
  background-color: white;
  color: #739c00;
  border-color: #67C23A;
}

:deep(.el-button:hover) {
  border-color: transparent;
  background-color: #a0c836;
  color: white;
}

#page {
  display:inline-block;
  font-size: 24px;
  margin-top: 45px;
  color: #606266;
}

#title {
  font-size: 35px;
  color: #a0c836;
  display: block;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

#title::before {
  content: '';
  height: 2px;
  display: block;
  width: 65px;
  background-color: #a0c836;
  margin-right: 10px;
}

#title::after {
  content: '';
  height: 2px;
  display: block;
  width: 65px;
  background-color: #a0c836;
  margin-left: 10px;
}

:deep(.el-divider--horizontal) {
  margin: 20px auto;
  height: 2px;
  width: 15%;
  background-color: #a0c836;
  border: 0;
}
</style>