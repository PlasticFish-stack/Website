<script setup>
import { onMounted, ref } from 'vue';
const props = defineProps(['title', 'page', 'block', 'type',]);
let showBool = true
if (props.type != 'video') {
  showBool = false
}
const num = ref(4);
onMounted(() => {
  if (num.value < 5) {
    document.getElementById('swiper').style.justifyContent = 'center';
  }
})
function changePosition(item) {
  if (num.value < 4) {
    return
  }
  if (item > num.value - 4) {
    swiper_hook.style.transform = 'translateX(' + (-337 * (num.value - 4)) + 'px' + ')';
  } else {
    swiper_hook.style.transform = 'translateX(' + (-337 * item) + 'px' + ')';
  }
}
</script>

<template>
  <div :class="showBool === true ? 'centerVideo' : 'centerNews'">

    <span id="page">{{ props.page }}</span>
    <span id="title">{{ props.title }}</span>
    <ul id="ul_f">
      <li id="li_f" v-for="item in props.block" :key="item">
        <el-button round type="success">
          {{ item }}
        </el-button>
      </li>
    </ul>

    <div id="grid" v-if="showBool">
      <el-card v-for="item in 6" id="grid_card">
        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image" />
        <div id="cardText">
          <span>Yummy hamburger</span>
        </div>
      </el-card>
    </div>

    <div id="swiper" v-if="!showBool">
      <div id="swiper_hook" style="transform: translateX(0px);">
        <el-card :body-style="{ padding: '0px' }" class="swiper_box" v-for="item in num" :key="item">
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image" />
          <div style="padding: 0px">
            <span>{{ item }}</span>
          </div>
        </el-card>
      </div>
      <ul id="ul_s">
        <li v-for="item in num" :key="item" id="li_s" @click="changePosition(item - 1)"><button></button></li>
      </ul>
    </div>

  </div>
</template>

<style scoped>
#swiper_hook {
  height: 400px;
  display: flex;
  align-items: center;
}

#ul_s {
  display: flex;
  position: absolute;
  margin-top: -50px;
  margin-left: 8px;
  left: 50%;
  transform: translateX(-50%);
  padding-right: 75px;
}

#li_s>button {
  height: 15px;
  width: 15px;
  border-radius: 45px;
  padding: 0px;
  background-color: #909399;
  flex-shrink: 0;
}

#li_s>button:hover {
  border-color: transparent;
  background-color: #95d475;
}

#li_s>button:focus {
  outline-style: none;
}

#li_s>button:focus-visible {
  outline-style: none;
}

#li_s {
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

#swiper {
  height: 400px;
  width: 1330px;
  background-color: transparent;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
}

.swiper_box {
  margin-top: -60px;
  height: 330px;
  width: 320px;
  background-color: white;
  color: red;
  margin-right: 10px;
  margin-left: 5px;
  flex-shrink: 0;
}

.image {
  height: 260px;
  width: 100%;
  position: relative;
  object-fit: cover;
  z-index: 0;
}

:deep(#grid>.el-card) {
  height: 260px;
  width: 400px;
  --el-card-padding: 0px;
  margin-left: 30px;
  margin-bottom: 120px;
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
  display: inline-block;
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
}</style>