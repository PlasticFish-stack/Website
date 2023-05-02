<script setup>
  import navgationBar from "@/components/dashboard/navgationBar.vue";
  import menuBar from "@/components/dashboard/menuBar.vue"
</script>

<template>
    <navgationBar/>
    <menuBar :type="true" id="menu" />
</template>

<style scoped>
#menu{
  position: relative;
  top: 40px;
}
</style>