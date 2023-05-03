<script setup>
import { ref, reactive } from 'vue'
</script>

<template>
  <div id="navgation">
    <img style="width: 230px; height: 50px" src="/src/assets/card.png" fit="contain" />
    <!-- <ul id="link">
      <li v-for="item in link" class="link">
        <a href="">
          <img :src="iconLink + item + '.svg'" alt="">
        </a>
        
      </li>
    </ul> -->
    <ul id="lang">
      <li>简</li>
      <li>繁</li>
      <li>EN</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
#lang{
  display: flex;
  margin-right: 20px;
  li{
    margin-right: 10px;
  }
}
#navgation {
  height: 4rem;
  width: 1200px;
  background-color: white;
  color: white;
  position: relative;
  top: 0%;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
}
#link {
  width: 280px;
  margin-left: -20px;
  margin-right: 0.5rem;
  li{
    margin-top: 0.5rem;
    margin-left: 10px;
    list-style: none;
    float: left;
  }
}
.search{
  width: 12rem;
  margin-right: 1.5rem;
}
:deep(.el-input__wrapper){
  background-color: rgb(207, 207, 207);
  border: 0px;
  border-radius: 40px;
}
:deep(.el-input__inner){
  text-indent: 9px;
}
:deep(.el-dropdown-link) {
  outline: none;
}

</style>
