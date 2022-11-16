<template>
  <div id="app">
    <side-bar></side-bar>
    <side-view>
      <template #routerBoxContainer>
        <vs-button
          flat
          :active="currentRouteName == 'map'"
          @click="moveToPage('map')">
          지도
        </vs-button>
        <vs-button
          flat
          :active="currentRouteName == 'community'"
          @click="moveToPage('community')">
          커뮤니티
        </vs-button>
        <vs-button
          flat
          :active="currentRouteName == 'notice'"
          @click="moveToPage('notice')">
          공지사항
        </vs-button>
        <vs-button
          flat
          :active="currentRouteName == 'qna'"
          @click="moveToPage('qna')">
          Q & A
        </vs-button>
      </template>
      <template #routerViewContainer>
        <router-view slot="router-view-container"></router-view>
      </template>
    </side-view>
  </div>
</template>

<script>
import SideBar from "./components/sidebar/SideBar.vue";
import SideView from "./components/sidebar/SideView.vue";

export default {
  name: "App",
  components: { SideBar, SideView },
  data() {
    return {};
  },
  methods: {
    moveToPage: function (name) {
      this.$router.push({ name });
    },
  },
  computed: {
    currentRouteName() {
      return this.$route.path.split("/")[1];
    },
  },
};
</script>

<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  height: 100vh;
  background-color: #fefefe;
}

#app {
  display: flex;
}
</style>
