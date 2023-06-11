<script setup>
import navgation from '@/components/navgation/index.vue'
import backtop from '@/components/backTop.vue'
import { onMounted, computed, onDeactivated} from 'vue'
import { useStore } from 'vuex'
import { debounce } from '@/utils/index.js'

const store = useStore();
let viewWidth = document.documentElement.clientWidth;
let viewHeight = document.documentElement.clientHeight;
let scrollBottomBool = true
const Obtain = () => store.commit('obtainSize', {
  width: viewWidth,
  height: viewHeight
});
onMounted(() => {
  Obtain();
  window.onresize = () => {
    debounce(() => {
      viewWidth = document.documentElement.clientWidth;
      viewHeight = document.documentElement.clientHeight;
      Obtain();
    }, 200);
  }
})
onDeactivated(() => {
  window.onresize = null
})

</script>

<template>
  <Transition name="scrollBottom">
    <navgation id="nav" v-show="scrollBottomBool"></navgation>
  </Transition>
  <div id="layout">
    <router-view />
  </div>
  <backtop></backtop>
</template>

<style scoped>
#nav{
  position: fixed;
  z-index: 1;
}
#layout{
  margin-top: 5rem
}
</style>
