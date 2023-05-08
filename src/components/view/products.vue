<script setup>
import { reactive } from 'vue';
import {gsap} from 'gsap'

const productState = reactive({
  showBool: false
});
const productScale = (bool) => {
  console.log(bool);
  console.log(productState.showBool);
  productState.showBool = bool
}
gsap.timeline({
  ScrollTrigger: {
        trigger: ".main",
        start: "top top",
        end: "bottom bottom",
        scrub: 1
    }
  }).fromTo(".box_card", { y: 0 }, { y: "-75%" }, 0);
</script>

<template>
  <div id="box">
    <div class="main" @mouseenter="productScale(true)" @mouseleave="productScale(false)">
        <div class="box_card" >
          <span>PRODUCTS</span>
        </div>
        <div class="box_products">
          <img src="src\assets\Page\silverstar.png">
          <img src="src\assets\Page\arctik.png">
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#box {
  height: 420px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;

}

.main {
  height: 295px;
  width: 1200px;
  background-color: white;
  display: flex;
  box-shadow: var(--el-box-shadow-dark);
  border-radius: 6px;
  overflow: hidden;
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
      font-size: 25px;
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

  .box_products {
    transform: translateY(400px);
    border-radius: 6px;
    height: 295px;
    width: 1200px;
    position: absolute;
    background-color: black;
    display: flex;
    overflow: hidden;

    img {

      width: 50%;
      object-fit: cover;
    }
  }
}
.card-enter-active {
  animation: slideInDown 1s cubic-bezier(0.55, 0, 0.1, 1);
}
.card-leave-active{
  animation: slideOutUp 1s cubic-bezier(0.55, 0, 0.1, 1);
}
.products-enter-active {
  animation: fadeIn 1s cubic-bezier(0.55, 0, 0.1, 1);
}
.products-leave-active{
  animation: fadeOut 0.6s cubic-bezier(0.55, 0, 0.1, 1);
}

</style>