<template>
  <div>
    <div id="detail_header">
      <div class="title">{{ aptName }}</div>
      <div class="icon-box" @click="resetHouse">
        <i class="bx bx-x"></i>
      </div>
    </div>
    <div class="sub">{{ address }}</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "DetailHeader",
  props: {
    aptName: String,
    address: String,
  },
  methods: {
    ...mapActions("house", ["resetHouse"]),
  },
};
</script>

<style scoped>
#detail_header {
  width: 100%;
  height: 58px;

  padding: 0 1rem;

  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  background-color: #2ec4b6;
  color: #fff;
}
.title {
  font-size: 1.25rem;
  font-weight: 600;
}
.sub {
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: 400;

  background-color: #2ec4b6;
  color: #fff;

  border-top: 0.5px solid;
}
.icon-box {
  cursor: pointer;
  width: 1rem;
  height: 1rem;
  padding: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.2rem;
}
</style>
