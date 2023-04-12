<script setup>
import bar from '@/components/dashboard/index.vue'
import { onMounted, computed, onDeactivated} from 'vue'
import { useStore } from 'vuex'
import { debounce } from '@/utils/index.js'

const store = useStore();
const windowWidth = computed(() => store.state.windowWidth);
let viewWidth = document.documentElement.clientWidth;
let viewHeight = document.documentElement.clientHeight;
const Obtain = () => store.commit('Obtain', {
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
      console.log(viewHeight, viewWidth);
    }, 300);
  }
})
onDeactivated(() => {
  window.onresize = null
})

</script>

<template>
  <div id="layout">
    <bar />
    {{ windowWidth }}
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
