<template>
  <b-container>
    <router-view></router-view>
  </b-container>
</template>

<script>
export default {
  name: "QnaView",
};
</script>

<style>
#router-view {
  overflow-y: auto;
}
</style>
