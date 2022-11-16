<template>
  <div id="userProfileBox" v-if="user">
    <vs-avatar id="userProfileIcon" primary>
      <!-- <img :src="'/static/' + user.profile" alt="" /> -->
      <template #text>
        {{ user.name | firstName }}
      </template>
    </vs-avatar>
    {{ user.name }}

    <vs-button block @click="logout" size="small"> 로그아웃 </vs-button>
  </div>
  <div id="userProfileBox" v-else @click="active = !active">
    <vs-avatar id="userProfileIcon">
      <i class="bx bx-user"></i>
    </vs-avatar>
    <span>로그인 해주세요 :)</span>

    <template>
      <vs-dialog v-model="active">
        <template #header>
          <h4 class="not-margin">Welcome to <b>손해노노</b></h4>
        </template>

        <div class="con-form">
          <vs-input v-model="id" placeholder="아이디">
            <template #icon>
              <i class="bx bxs-id-card"></i>
            </template>
          </vs-input>
          <vs-input type="password" v-model="password" placeholder="비밀번호">
            <template #icon>
              <i class="bx bxs-lock"></i>
            </template>
          </vs-input>
          <div class="flex">
            <vs-checkbox v-model="remember">아이디 기억하기</vs-checkbox>
            <a href="#">비밀번호를 잃어버리셨나요?</a>
          </div>
        </div>

        <template #footer>
          <div class="footer-dialog">
            <vs-button block @click="login"> 로그인 </vs-button>

            <div class="new">
              <a href="#">회원가입</a>
            </div>
          </div>
        </template>
      </vs-dialog>
    </template>
  </div>
</template>

<script>
export default {
  name: "UserProfile",
  data() {
    return {
      active: false,
      id: "",
      password: "",
      remember: this.$store.state.auth.remember,
      user: this.$store.state.auth.user,
    };
  },
  filters: {
    firstName: function (value) {
      return value.charAt(0);
    },
  },
  methods: {
    login() {
      const loginInfo = {
        id: this.id,
        password: this.password,
      };
      this.$store.dispatch("auth/login", loginInfo);
    },
    toggleRemember() {
      this.$store.commit("user/TOGGLE_REMEMBER");
    },
    logout() {
      this.$store.dispatch("auth/logout");
    },
  },
};
</script>

<style lang="stylus">
#userProfileBox {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
}
#userProfileIcon {
  margin-right: 1rem;
}
  getColor(vsColor, alpha = 1)
      unquote("rgba(var(--vs-"+vsColor+"), "+alpha+")")
  getVar(var)
      unquote("var(--vs-"+var+")")
  .not-margin
    margin 0px
    font-weight normal
    padding 10px
  .con-form
    width 100%
    .flex
      display flex
      align-items center
      justify-content space-between
      a
        font-size .8rem
        opacity .7
        &:hover
          opacity 1
    .vs-checkbox-label
      font-size .8rem
    .vs-input-content
      margin 10px 0px
      width calc(100%)
      .vs-input
        width 100%
  .footer-dialog
    display flex
    align-items center
    justify-content center
    flex-direction column
    width calc(100%)
    .new
      margin 0px
      margin-top 20px
      padding: 0px
      font-size .7rem
      a
        color getColor('primary') !important
        &:hover
          text-decoration underline
    .vs-button
      margin 0px
</style>
