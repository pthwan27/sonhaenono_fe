<template>
  <div id="news-bar">
    <div class="title">
      <span style="align-self: center">뉴스</span>
    </div>
    <div class="content">
      <b-table
        id="news-table"
        :items="items"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        @row-clicked="onRowClicked"
        small>
      </b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="news-table"
        style="justify-content: center"></b-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "NewsBar",
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      fields: ["title"],
      items: [],
    };
  },
  actions: {
    ...mapActions("news", ["fetchNewsByQuery"]),
  },
  computed: {
    ...mapState("news", ["news"]),
    rows() {
      return this.items.length;
    },
  },
  watch: {
    news: function (newValue) {
      if (newValue && newValue.length > 0) {
        this.items = newValue;
      }
    },
  },
  mounted() {
    this.$store.dispatch("news/fetchNewsByQuery", {
      page: 1,
      count: 100,
    });
  },
  methods: {
    onRowClicked(item) {
      window.location.href = item.url;
    },
  },
};
</script>

<style scoped>
#news-bar {
  height: 430px;
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
tr {
  cursor: pointer !important;
}
</style>
