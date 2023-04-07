<script setup>
import { ref, reactive } from 'vue'
import { ArrowDown , Search } from '@element-plus/icons-vue'
const link = reactive(['weibo', 'wechat', 'qq', 'twitter', 'facebook', 'youtube'])
const search = ref('')
</script>

<template>
  <div id="top">
    <el-dropdown size="large" id="box">
      <span class="el-dropdown-link">
        Language
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>中文</el-dropdown-item>
          <el-dropdown-item>English</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <ul id="link">
      <li v-for="item in link" class="link">
        <a href="">
          <img :src="'/src/assets/icon/svgicons/' + item + '.svg'" alt="">
        </a>
        
      </li>
    </ul>
    <el-input
        v-model="search"
        placeholder="输入关键字"
        :suffix-icon="Search"
        class="w-50 m-2 search"
    />
  </div>
</template>

<style scoped>
#top {
  height: 3rem;
  width: 100%;
  background-color: white;
  color: black;
  position: fixed;
  top: 0%;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  overflow: hidden;
  z-index: 1;
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

#link {
  width: 280px;
  margin-left: -20px;
  margin-right: 0.5rem;
}

.link {
  margin-top: 0.5rem;
  margin-left: 10px;
  list-style: none;
  float: left;
}
:deep(.el-dropdown-link) {
  outline: none;
}

</style>
