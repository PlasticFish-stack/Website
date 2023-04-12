<script setup>
  import navgationBar from "@/components/dashboard/navgationBar.vue";
  import searchBar from "@/components/dashboard/searchBar.vue"
</script>

<template>
  <div>
    <navgationBar/>
    <searchBar :type="true" />
    <!-- <searchBar :type="false" /> -->
  </div>
</template>

<style scoped>

</style>