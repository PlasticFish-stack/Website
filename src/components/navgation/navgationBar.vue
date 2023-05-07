<script setup>
import { computed, reactive, toRaw } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const menu = toRaw(computed(() => store.getters.menubar).value);//Navgationbar内的菜单列名
//菜单项展开
let stretch = reactive({
  state: [],
  bool: false
})
stretch.state = Object.keys(menu).map((item) => false);
function deform(index) {
  if (stretch.state[index]) {
    stretch.state[index] = false;
  } else {
    stretch.state[index] = true;
  }
}
function deformBox(){
  if(stretch.bool){
    stretch.bool = false
  }else{
    stretch.bool = true
  }
}
</script>

<template>
  <div id="navgation">
    <img style="width: 230px; height: 50px" src="/src/assets/card1.png" fit="contain" />
    <div id="menu" @mouseenter="deformBox" @mouseleave="deformBox">
      <div id="menu_child" v-for="value, key, index in menu" @mouseenter="deform(index)" @mouseleave="deform(index)">
        <span>{{ value.title }}</span>
        <div v-show="stretch.state[index]" v-for="item in value.child">
          <span>{{ item.title }}</span>
        </div>
      </div>
    </div>
    <ul id="lang">
      <li>简</li>
      <li>繁</li>
      <li>EN</li>
    </ul>
  </div>
  <Transition name="stretch">
    <div class="stretch" v-show="stretch.bool"></div>
  </Transition>
  
</template>

<style lang="scss" scoped>
#navgation {
  height: 5rem;
  width: 1200px;
  color: rgba(0, 0, 0, 0.9);
  position: relative;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  img {
    margin-left: 20px;
  }
  #menu {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.9);
    #menu_child {
      margin-top: -15px;
      margin-right: 30px;
      height: 0px;
      display: flex;
      flex-direction: column;
      align-items: center;
      div{
        display: flex;
        flex-direction: column;
        align-items: center;
        span{
          margin-top: 35px;
        }
      }
    }
  }
  #lang {
    display: flex;
    align-items: center;
    margin-right: 20px;
    font-weight: 600;

    li {
      margin-right: 15px;
    }
  }
}
.stretch {
  position: absolute;
  height: 300px;
  width: 100%;
  background-color: white;
  transform: translateY(-80px);
}
.stretch-enter-active{
  animation: bounce-in 0.5s;
}
.stretch-leave-active {
  animation: bounce-in 0.5s reverse;
}
.stretch-enter-to{
  
}
.stretch-enter-from{
  
}
.stretch-leave-to {

}
@keyframes bounce-in {
  0% {
    transform:  translateY(-500px);
  }
  100% {
    transform:  translateY(-80px);
  }
}
</style>
