<script setup>
import { computed, reactive, toRaw } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const menu = toRaw(computed(() => store.state.menu).value);//Navgationbar内的菜单列名
console.log(menu);
const icon = ['facebook', 'qq', 'twitter', 'wechat', 'weibo', 'youtube'];
</script>

<template>
  <div id="navBottom">
    <div>
      <div id="content">
        <div v-for="page in menu">
          <h2>{{ page.title }}</h2>
          <span v-for="child in page">{{ child }}</span>
        </div>
      </div>
      <div id="deep">
        <img style="width: 230px; height: 50px" src="/src/assets/card1.png" fit="contain" />
        <ul>
          <li v-for="item in icon">
            <a href="">
              <img :src="'src/icons/' + item + '.svg'" alt="" srcset="">
            </a>
          </li>
        </ul>
        <p>2023. All right reserved.</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#navBottom{
  border-top: 1px solid gray;
  color: black;
  height: 25rem;
  width: 100%;
  display: flex;
  justify-content: center;
  div{
    height: 100%;
    width: 1280px;
    background-color: white;
    display: grid;
    grid-template-rows: 2fr 1.3fr;
    #content{

    }
    #deep{
      border-top: 1px solid gray;
      display: flex;
      align-items: center;
      justify-content: space-between;
      ul{
        display: flex;
        li{
          margin-left: 10px;
        }
      }
    }
  }
}
</style>