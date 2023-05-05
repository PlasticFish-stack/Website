<script setup>
import { computed, toRaw } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const menu = toRaw(computed(() => store.state.menu).value);
const {home, ...as} = menu;


let stretchState = [];
let stretchBool = false;
for (let item in menu) {
  stretchState.push(false)
}
let stretchd = document.getElementById('stretch')

function stretch(index) {
  if (stretchState[index]) {
    stretchState[index] = false;
  } else {
    stretchState[index] = true;
  }
}

</script>

<template>
  <div id="navgation">
    <img style="width: 230px; height: 50px" src="/src/assets/card1.png" fit="contain" />
    <ul id="menu">
      <li v-for="value, key, index in menu" @mouseenter="stretch(index)" @mouseleave="stretch(index)">
        {{ value.title }}
      </li>
    </ul>
    <ul id="lang">
      <li>简</li>
      <li>繁</li>
      <li>EN</li>
    </ul>
  </div>
  <div id="stretch"></div>
</template>

<style lang="scss" scoped>
#navgation {
  height: 5rem;
  width: 1200px;
  background-color: white;
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
    margin-left: 150px;
    display: flex;
    align-items: center;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.9);

    li {
      margin-right: 30px;
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

#stretch {
  height: 20px;
  width: 100%;
}

</style>
