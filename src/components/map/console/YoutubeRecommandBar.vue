<template>
  <div id="youtube-recommand-bar">
    <div class="title">
      <span style="align-self: center">추천 영상</span>
    </div>
    <div class="content">
      <iframe
        v-if="todayRandomContentId"
        id="ytplayer"
        type="text/html"
        width="100%"
        height="300px"
        :src="`https://www.youtube.com/embed/${todayRandomContentId}`"
        frameborder="0"
        allowfullscreen="allowfullscreen"></iframe>
      <div v-else>추천 영상이 없습니다.</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "YoutubeRecommandBar",

  computed: {
    ...mapState("news", ["todayRandomContentId"]),
  },
  created() {
    this.$store.dispatch("news/fetchYoutubeContent");
  },
};
</script>

<style>
#youtube-recommand-bar {
  height: 300px;
}
.title {
  height: 32px;
  width: 100%;

  padding: 0 1rem;
  background-color: #ff9f1c;

  font-size: 1rem;
  font-weight: 700;

  display: flex;
  align-content: center;
}
</style>
