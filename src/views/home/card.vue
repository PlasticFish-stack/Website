<script setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';


import { onMounted, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n'
const { locale, t, tm } = useI18n();
import { useStore } from 'vuex'


import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
const modules = [Pagination, Navigation]
gsap.registerPlugin(ScrollTrigger)
const store = useStore();
const windowWidth = computed(() => store.state.windowWidth);
let screenHeight = computed(() => (windowWidth.value / 3.5));

const page = reactive([
  {
    id: 0,
    src: 'n1',
    num: 1,
  }, {
    id: 1,
    src: 'n2',
    num: 2,
  }, {
    id: 2,
    src: 'n3',
    num: 3,
  }, {
    id: 3,
    src: 'n4',
    num: 4,
  }
])
onMounted(() => {

})
</script>

<template>
  <div id="main">
    <div id="flow">
      <span id="flow_top">视频中心</span>
      <span id="flow_center">VIDEO CENTER</span>
    </div>
    <TransitionGroup tag="div" id="layout_box" :style="{ height: screenHeight + 'px', width: 100+'%'}">
      <swiper :slidesPerView="3"  :loop="true" :pagination="{ clickable: true, }" :navigation="true"
        :modules="modules" key="i" class="mySwiper">
        <swiper-slide :key="item" class="swiper_box" v-for="item in page" :style="{ height: screenHeight + 'px', width: windowWidth / 2 + 'px' }"
          >
          <img :src="'/src/assets/Carousel/' + item.src + '.jpg'"  :key="item + '123'"/>
        </swiper-slide>
      </swiper>
    </TransitionGroup>
    <button id="add">1</button>
    <div id="check"></div>
  </div>
</template>
<style lang="scss">
.swiper {
  width: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper {
  width: 100%;
  height: 100%;
}
</style>
<style lang="scss" scoped>
#main {
  width: 100%;
  height: calc(100vh - 150px);
  display: flex;
  color: red;
  background-color: #fffef9;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  #flow {
    height: 150px;
    width: 1280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #2b3138;

    #flow_top {
      -webkit-text-stroke: black 0.3px;
      text-transform: uppercase;
    }

    #flow_center {
      margin-top: 10px;
      -webkit-text-stroke: black 0.3px;
    }
  }

}
</style>