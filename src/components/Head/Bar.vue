<script setup>
import { reactive } from 'vue';
const page = reactive(['雅江首页', '关于雅江', '线上展厅', '产品中心', '视频中心', '工程案例', '新闻动态', '创意光科技', '联系我们'])
</script>

<template>
  <div id="main">
    <img style="width: 300px; height: 60px" src="/src/assets/png/card.png" fit="contain"/>
    <ul>
        <li v-for="item in page">
            <div>{{item}}</div>
        </li>
    </ul>
  </div>
</template>

<style scoped>
#main{
    height: 5rem;
    width: 100vw;
    background-color: black;
    color: black;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: center;
    margin-left: -20px;
    margin-top: 48px;
}
img{
    margin-left: 10vw;
}
ul{
    width: 100%;
    margin-left: 15vw;
    flex-wrap: nowrap;
    display: flex;
}
li{
    margin-left: 0.5rem;
    list-style: none;
    float: left;
}
li > div{
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    height: 100%;
    width: 100px;
    color: white;
}

</style>