<template>
  <div id="search-bar-wrapper">
    <div id="search-bar">
      <input
        placeholder="검색(2글자 이상) 후 엔터를 눌러주세요."
        type="search"
        @input="changeQuery"
        @keypress="checkEnter" />
    </div>
    <div class="search-list" v-show="searchResults.length">
      <div
        class="list-item"
        v-for="result in searchResults"
        :key="result.pnu"
        @click="goToSite(result.pnu)">
        <span class="sub-text" v-if="result.dong" v-text="result.dong" />
        <span>{{ result.apartmentName }}</span>
      </div>
      <div
        class="list-item"
        v-if="query.length >= 2 && searchResults.length == 0">
        <span>검색 결과가 없습니다.</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "SearchBar",
  data() {
    return {
      query: "",
    };
  },
  computed: {
    ...mapState("house", ["searchResults"]),
  },
  methods: {
    ...mapActions("house", [
      "searchByAptName",
      "resetSearchResult",
      "selectHouse",
    ]),
    goToSite(pnu) {
      this.resetSearchResult();
      this.selectHouse(pnu);
    },
    changeQuery(e) {
      this.query = e.target.value;
      if (this.query.trim().length == 0) {
        this.resetSearchResult();
      }
    },
    checkEnter(e) {
      if (e.keyCode === 13) {
        if (this.query.trim().length >= 2) {
          this.searchByAptName(this.query);
        } else {
          this.openNotification({
            message: "검색어를 2글자 이상 적어주세요.",
            color: "danger",
          });
        }
      }
    },
    openNotification({ message, color = "primary" }) {
      this.$vs.notification({
        flat: true,
        position: "bottom-left",
        text: message,
        color,
      });
    },
  },
};
</script>

<style scoped>
#search-bar {
  width: 100%;
  height: 58px;

  padding: 0 1rem;

  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  background-color: #ff9f1c;
  color: #fff;
}
#search-bar input {
  width: 100%;
  padding: 0 1rem;
  border-radius: 1rem;
}
.list-item {
  padding: 0.5rem 1rem;
  background-color: #ffbf69;
  color: #000;

  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;

  display: flex;
  justify-content: space-between;
}
.list-item:hover {
  filter: brightness(70%);
}
.list-item .sub-text {
  font-size: 0.75rem;
  border: 1px solid;
  border-radius: 0.75rem;
  padding: 0.125rem 0.25rem;
}
.list-item + .list-item {
  border-top: 1px solid white;
}

.search-list {
  height: 200px;
  overflow-y: scroll;
}
</style>
