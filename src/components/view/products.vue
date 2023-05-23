<script setup>
import { onMounted, reactive } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
gsap.config({
  nullTargetWarn: false,
});
const productState = reactive({
  showBool: false
});
const productScale = (bool) => {
  console.log(bool);
  console.log(productState.showBool);
  productState.showBool = bool
}

</script>

<template>
  <div id="box">
    <div id="boxContain">
      <div class="box_card">
        <span>PRODUCTS</span>
      </div>
      <!-- <div class="box_products">
        <img src="src\assets\Page\silverstar.png">
        <img src="src\assets\Page\arctik.png">
      </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
#box {
  height: 400px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}

#boxContain {
  height: 295px;
  width: 1280px;
  background-color: white;
  display: flex;
  box-shadow: var(--el-box-shadow-dark);
  border-radius: 6px;
  position: relative;
  .box_card {
    height: 100%;
    width: 100%;
    background-image: linear-gradient(0deg, #005042, #1b735d, #339979, #4ac096);
    background-repeat: no-repeat;
    background-size: cover;
    text-align: center;
    border-radius: 6px;

    span {
      font-size: 30px;
      display: block;
      margin-top: 70px;
      padding-top: 10px;
    }

    span::after {
      content: '产品中心';
      font-size: 40px;
      font-weight: bolder;
      display: block;
      padding-top: 30px;
      padding-bottom: 5px;
    }
  }
}
//   .box_products {
//     transform: translateY(100%);
//     border-radius: 6px;
//     height: 295px;
//     width: 1200px;
//     position: absolute;
//     background-color: black;
//     display: flex;
//     overflow: hidden;

//     img {

//       width: 50%;
//       object-fit: cover;
//     }
//   }

</style>