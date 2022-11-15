<template>
  <div id="app">
    <the-header-navbar></the-header-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import TheHeaderNavbar from "@/components/TheHeaderNavbar.vue";
export default {
  name: "App",
  components: { TheHeaderNavbar },
};
</script>

<style></style>
