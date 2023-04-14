<script setup>
  import navgationBar from "@/components/dashboard/navgationBar.vue";
  import searchBar from "@/components/dashboard/searchBar.vue"
  const bool = true
</script>

<template>
    <navgationBar/>
    <searchBar :type="bool" class="searchbar"/>
</template>

<style scoped>
.searchbar{
  position: relative;
  top: 48px;
}
</style>