<template>
  <b-container>
    <header>
      <h1>공지사항</h1>
    </header>
    <router-view></router-view>
  </b-container>
</template>

<script>
export default {
  name: "NoticeView",
};
</script>

<style>
#router-view {
  overflow-y: auto;
}
</style>
