<template>
  <div id="app">
    <the-header-navbar></the-header-navbar>
    <router-view />
  </div>
</template>

<script>
import TheHeaderNavBar from "@/components/TheHeaderNavbar.vue";
import TheHeaderNavbar from "@/components/TheHeaderNavbar.vue";
export default {
  components: { TheHeaderNavbar },
  name: "App",
  component: {
    TheHeaderNavBar,
  },
};
</script>

<style></style>
