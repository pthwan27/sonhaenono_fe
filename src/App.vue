<template>
  <div id="app">
    <vs-navbar center-collapsed v-if="!hideNavbar">
      <template #left>
        <router-link to="/">
          <img :src="logo" alt="" id="logoIcon" />
        </router-link>
      </template>
      <vs-navbar-item
        v-for="page in pageList"
        :key="page.link"
        :active="page.link === currentRouteName"
        :id="page.link"
        @click="moveToPage(page.link)">
        {{ page.name }}
      </vs-navbar-item>

      <template #right>
        <template v-if="!isAuthenticated && !user">
          <vs-button flat color="rgb(59,222,200)" @click="moveToPage('login')"
            >로그인</vs-button
          >
          <vs-button flat @click="moveToPage('signin')">회원가입</vs-button>
        </template>
        <template v-else>
          <b-dropdown
            size="lg"
            variant="link"
            toggle-class="text-decoration-none"
            no-caret
            dropleft>
            <template #button-content>
              <vs-avatar color="#ff9f1c" size="40">
                <template #text> {{ user.name | firstName }} </template>
              </vs-avatar>
            </template>

            <b-dropdown-item @click="moveToPage('mypage')"
              >마이페이지</b-dropdown-item
            >
            <b-dropdown-item @click="logout">로그아웃</b-dropdown-item>
          </b-dropdown>
        </template>
      </template>
    </vs-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import logo from "@/assets/logo.png";
import { mapState } from "vuex";
const navBarPageList = [
  { name: "아파트 거래", link: "map" },
  { name: "커뮤니티", link: "community" },
  { name: "공지사항", link: "notice" },
  { name: "Q&A", link: "qna" },
];
const pageList = navBarPageList.map((p) => p.link);
export default {
  name: "App",
  components: {},
  data() {
    return {
      pageList: navBarPageList,
      hideNavbar: false,
      logo,
    };
  },
  computed: {
    ...mapState("auth", ["user", "isAuthenticated"]),
    currentRouteName() {
      return this.$route.path.split("/")[1];
    },
  },
  methods: {
    moveToPage: function (name) {
      this.$router.push({ name });
    },
    logout: function () {
      this.$store.dispatch("auth/logout");
    },
  },
  filters: {
    firstName: function (value) {
      return value.charAt(0);
    },
  },
  watch: {
    currentRouteName: function (cur) {
      if (!pageList.includes(cur)) {
        this.hideNavbar = true;
      } else {
        this.hideNavbar = false;
      }
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

#logoIcon {
  width: 42px;
  height: 42px;
}
body {
  height: 100vh;
}
body > * {
  transition: 0.5s;
}

.vs-navbar-content {
  position: relative !important;
}
</style>
