<template>
  <b-container>
    <header>
      <h1>Q&A</h1>
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

header {
  padding-top: 100px;
  height: 200px;
}
</style>
