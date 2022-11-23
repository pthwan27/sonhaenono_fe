<template>
  <b-container>
    <header>
      <h1 style="font-weight: bold">Q&A</h1>
    </header>
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
