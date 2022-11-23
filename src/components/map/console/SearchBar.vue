<template>
  <div id="search-bar-wrapper">
    <div id="search-bar">
      <input type="search" v-model="query" />
    </div>
    <ul v-if="resultList.length > 0">
      <li
        class="list-item"
        v-for="result in resultList"
        :key="result.pnu"
        @click="goToSite(result)">
        {{ result.apartmentName }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      query: "",
      resultList: [
        {
          pnu: 12345,
          apartmentName: "한성아파트",
        },
        {
          pnu: 12345,
          apartmentName: "태환아파트",
        },
      ],
    };
  },
  methods: {
    goToSite(result) {
      console.log("GOTO", result);
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
  color: #fff;

  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
}
.list-item + .list-item {
  border-top: 1px solid white;
}
</style>
