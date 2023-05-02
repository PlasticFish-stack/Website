<script setup>
import bar from '@/components/dashboard/index.vue'
import menuBar from "@/components/dashboard/menuBar.vue"
import { onMounted, computed, onDeactivated} from 'vue'
import { useStore } from 'vuex'
import { debounce } from '@/utils/index.js'

const store = useStore();
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
    }, 300);
  }
})
onDeactivated(() => {
  window.onresize = null
})

</script>

<template>
  <div id="layout">
    <bar/>
    <router-view />
    <menuBar :type="false"></menuBar>
  </div>
</template>

<style scoped>

</style>
