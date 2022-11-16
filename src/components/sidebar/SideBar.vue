<template>
  <vs-sidebar id="sidebar" open>
    <template>
      <div id="sidebarSearchBar">
        <router-link to="/">
          <img class="logo" src="@/assets/logo.png" alt="logo" />
        </router-link>
        <div class="content-inputs">
          <vs-input v-model="search" placeholder="검색어를 입력해주세요" />
        </div>
      </div>
    </template>
    <template #footer>
      <vs-row justify="space-between">
        <user-profile></user-profile>
      </vs-row>
    </template>
  </vs-sidebar>
</template>

<script>
import UserProfile from "@/components/auth/UserProfile.vue";

export default {
  name: "SideBar",
  components: {
    UserProfile,
  },
  data() {
    return {
      search: "",
    };
  },
};
</script>

<style>
#sidebar {
  position: relative;
  max-width: 354px;

  padding: 1rem;

  border-radius: unset;
}
#sidebarSearchBar {
  display: flex;
  align-items: center;
  width: 100%;

  margin: 0 0 1rem !important;
}

#sidebarSearchBar .logo {
  max-width: 120px;
  max-height: 35px;
}
#sidebarSearchBar .content-inputs {
  flex-grow: 1;
  margin-left: 1rem;
}
.vs-sidebar-content .vs-sidebar__footer {
  margin: 1rem 0 0 !important;
  padding: 0 !important;
}
.vs-input-content,
.vs-input {
  width: 100%;
}
</style>
