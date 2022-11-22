<template>
  <b-container>
    <header>
      <h3>커뮤니티</h3>
    </header>
    <router-view></router-view>
  </b-container>
</template>

<script>
export default {
  name: "ComunityView",
};
</script>

<style>
#router-view {
  overflow-y: auto;
}
</style>
