<template>
  <b-container>
    <header>
      <h1 style="font-weight: bold">공지사항</h1>
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
h1 {
  text-align: center;
}
</style>
