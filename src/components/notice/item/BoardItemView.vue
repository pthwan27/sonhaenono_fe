<template>
  <vs-alert :hidden-content.sync="hidden">
    <template #title> 글보기 </template>
    <b>{{ articleComment }}</b>
  </vs-alert>
</template>

<script>
export default {
  props: {
    comment: String,
  },
  name: "BoardItemView",
  data() {
    return {
      hidden: true,
      articleComment: "",
    };
  },
  created() {
    this.articleComment = this.comment;
  },
};
</script>

<style></style>
