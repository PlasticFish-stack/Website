<script setup>
  import Navgation from "./components/Head/Navgation.vue";
  import Bar from "./components/Head/Bar.vue"
  

</script>

<template>
  <div class="layout">
    <el-container>
      <el-header class="El_header" height="128px">
        <Navgation style="z-index: 1;"></Navgation>
        <Bar type="head"></Bar>
      </el-header>
      <el-main class="El_main">
        <router-view/>
      </el-main>
      <el-footer class="El_footer"  height="150px">
        <Bar type="foot"></Bar>
      </el-footer>
    </el-container>
    <el-backtop :right="50" :bottom="50" />
  </div>
</template>

<style scoped>
.layout{
  width: 100%;
  height: 100%;
  max-height: 100%;
  max-width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  
}
.El_header{
  background-color: brown;
  overflow: hidden;
  padding:0px
}
.El_main{
  background-color: white;
  padding:0px
}
.El_footer{
  padding:0px
}

</style>
