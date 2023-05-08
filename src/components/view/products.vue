<script setup>

</script>

<template>
  <div id="box">
    <div id="main">
      <div id="box_card">
        <span>PRODUCTS</span>
      </div>
      <!-- <div id="box_img">
        <img src="src\assets\Page\silverstar.png" alt="" srcset="">
        <el-divider direction="vertical" />
        <img src="src\assets\Page\arctik.png" alt="" srcset="">
      </div> -->
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

#main {
  height: 295px;
  width: 1200px;
  background-color: white;
  display: flex;
  box-shadow: var(--el-box-shadow-dark);
  border-radius: 6px;
  overflow: hidden;
  #box_card {
    height: 100%;
    width: 100%;
    background:rgba(0, 0, 0, 0.6);
    background-repeat: no-repeat;
    background-size: cover;
    text-align: center;


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
  
  #box_img {
    width: 100%;
    color: black;
    flex-wrap: nowrap;
    overflow: hidden;

    img {
      height: 72%;
      width: 49%;
      position: relative;
      top: 15%;
    }
  }
  button {
    height: 45px;
    width: 150px;
    background-color: white;
    border-radius: 25px;
    color: #a0c836;
    outline: none;
    margin-top: 15px;
  }
}

:deep(.el-divider--vertical) {
  height: 9em;
  border-left: 2px var(--el-border-color) var(--el-border-style);
  z-index: 1;
  position: relative;
  top: 50%;
  transform: translateY(-140%);
}



@keyframes bigbig {
  to {
    transform: scale(1.04);
  }
}

#box_card>button:hover {
  animation: bigbig 0.2s forwards !important;
  border: 0;
}

#box_img>img:hover {
  height: 72%;
  width: 49%;
  position: relative;
  animation: bigbig 0.2s forwards !important;
}</style>