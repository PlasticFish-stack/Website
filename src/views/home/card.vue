<script setup>
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n'
const {locale, t, tm} = useI18n();
console.log(tm('navbar.products'));
onMounted(() => {

})
</script>

<template>
  <div id="main">
    <div id="flow">
      {{ tm('navbar.products.title') }}
    </div>
    <div id="layout">
      <div id="layout_page">
        <button>{{ tm('navbar.products.child[0].title') }}</button>
        <button>{{ tm('navbar.products.child[1].title') }}</button>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
#main {
  width: 100%;
  display: flex;
  color: #45b787;
  font-weight: 600;
  justify-content: center;
  flex-wrap: wrap;

  #flow {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 1280px;
    font-size: 3rem;
  }

  #layout {
    height: 100vh;
    width: 1280px;
    background-color: gray;
    display: flex;
    justify-content: center;
    #layout_page{
      display: flex;
      margin-top: 20px;
      button{
        height: 50px;
        width: 8rem;
        margin-left: 20px;
        margin-right: 20px;
        background-color: #45b787;
        color: white;
        font-size: 17px;
        border-radius: 12px;
        border: none;
        box-shadow: var(--el-box-shadow-light);
      }
    }
  }
}</style>