<script setup>
import { computed, reactive, toRaw, onMounted} from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n'
const store = useStore();
const {locale, t, tm} = useI18n();
let language = toRaw(tm('navbar'));
const changeLang = (l) => {
  if(locale.value == l){
    return
  }else{
    locale.value = l;
    localStorage.setItem('locale', l);
    language = toRaw(tm('navbar'));
  }
}
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
function deformBox() {
  if (stretch.bool) {
    stretch.bool = false
  } else {
    stretch.bool = true
  }
}
onMounted(() => {
  if(!localStorage.getItem('locale')){
    return
  }else{
    locale.value = localStorage.getItem('locale')
  }
  language = toRaw(tm('navbar'));
})
</script>

<template>
  <div id="navgation">
    {{  locale.value }}
    <img style="width: 230px; height: 50px" src="/src/assets/card1.png" fit="contain" />
    <div id="menu" @mouseenter="deformBox" @mouseleave="deformBox">
      <div id="menu_child" v-for="value, key, index in language" @mouseenter="deform(index)" @mouseleave="deform(index)"
        class="name" :key="value">
        <span id="title" :key="value.title">{{ value.title }}</span>
        <Transition name="underline">
          <div v-show="stretch.state[index]" :key="index" class="underline"></div>
        </Transition>
        <TransitionGroup name="list" tag="div" class="box">
          <div v-show="stretch.state[index]" v-for="item in value.child" :key="item" class="list">
            <a href=""  id="childTitle"><span>{{ item.title }}</span></a>
          </div>
        </TransitionGroup>
      </div>
    </div>
    
    <ul id="lang">      
      <li :class="locale == 'zh' ? 'selectLang' : '' " @click="changeLang('zh')">简</li>
      <li>/</li>
      <li :class="locale == 'hk' ? 'selectLang' : '' " @click="changeLang('hk')">繁</li>
      <li>/</li>
      <li :class="locale == 'en' ? 'selectLang' : '' " @click="changeLang('en')">EN</li>
    </ul>
  </div>
  <Transition name="stretch">
    <div class="stretch" v-show="stretch.bool"></div>
  </Transition>
</template>

<style lang="scss" scoped>
#navgation {
  height: 5rem;
  width: 1280px;
  color: #2b312c;
  position: fixed;
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
    color: #2b312c;

    #menu_child {
      margin-right: 30px;
      height: 48px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 32px;
      .underline {
        height: 5px;
        width: 100%;
        background-color: #45b787;
        margin-top: 8px;
      }

      .box {
        position: absolute;
        margin-top: 20px;

        .list {
          display: flex;
          flex-direction: column;
          align-items: center;

          #childTitle {
            color: #6E7783;
            margin-top: 32px;
          }

          #childTitle:hover {
            color: rgba(0, 0, 0, 0.8);
          }
        }
      }

    }
  }

  #lang {
    display: flex;
    align-items: center;
    margin-right: 20px;
    font-weight: 600;
    color: #6E7783;
    .selectLang{
      color: #2b312c;
    }
    li {
      margin-right: 4px;
    }
  }
}

.stretch {
  position: absolute;
  height: 25rem;
  width: 100%;
  background-color: #fffef9;
  transform: translateY(-80px);
  box-shadow: var(--el-box-shadow-dark)
}



.underline-enter-active {
  animation: fadeIn 1s cubic-bezier(0.55, 0, 0.1, 1);
}
.underline-leave-active{
  animation: fadeOut 0.6s cubic-bezier(0.55, 0, 0.1, 1);
}

.list-enter-active {
  animation: fadeInLeft 1s cubic-bezier(0.55, 0, 0.1, 1);
}

.list-leave-active {
  animation: fadeOutUp 0.5s;
}

.stretch-enter-active {
  animation: bounce-in 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

.stretch-leave-active {
  animation: bounce-in 0.4s cubic-bezier(0.55, 0, 0.1, 1) reverse;
}

@keyframes bounce-in {
  0% {
    transform: translateY(-500px);
    box-shadow: none;
  }

  75% {
    box-shadow: none;
  }

  100% {
    transform: translateY(-80px);

  }
}
</style>
