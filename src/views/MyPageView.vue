<template>
  <b-container>
    <b-button variant="outline-primary" @click="prevRouteMove"
      ><i class="bx bx-chevron-left"></i
    ></b-button>
    <header>
      <h1>마이페이지</h1>
    </header>
    <div>
      <h3>내 정보 수정하기</h3>
      <v-form @submit.prevent="updateUserInfo">
        <b-row>
          <b-col cols="3"> 이름 </b-col>
          <b-col cols="3"> {{ user.name }} </b-col>
          <b-col cols="3"> 전화번호 </b-col>
          <b-col cols="3"> {{ user.phone }} </b-col>
          <b-col cols="3"> 이메일 </b-col>
          <b-col cols="3"> {{ user.email }} </b-col>
        </b-row>
        <b-row>
          <vs-button size="large" flat type="submit">변경</vs-button>
        </b-row>
      </v-form>
    </div>
    <div>
      <h3>비밀번호 변경하기</h3>
      <b-form @submit.prevent="changePassword">
        <b-row>
          <b-col cols="3">
            <label for="oldPassword">현재 비밀번호</label>
          </b-col>
          <b-col cols="9">
            <input
              id="oldPassword"
              type="password"
              v-model="password.old"
              required />
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <label for="oldPassword">변경할 비밀번호</label>
          </b-col>
          <b-col cols="9">
            <input
              id="oldPassword"
              type="password"
              v-model="password.change"
              required />
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <label for="oldPassword">재입력 비밀번호</label>
          </b-col>
          <b-col cols="9">
            <input
              id="oldPassword"
              type="password"
              v-model="password.change"
              required />
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6">
            <vs-button size="large" flat type="submit">변경</vs-button>
          </b-col>
        </b-row>
      </b-form>
    </div>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import http from "@/api/http";

export default {
  name: "MyPage",
  data() {
    return {
      password: {
        old: "",
        change: "",
        rechange: "",
      },
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
  methods: {
    prevRouteMove() {
      this.$router.push({ name: "main" });
    },

    changePassword() {
      if (this.newPassword === this.renewPassword) {
        http
          .put("/member/password", {
            password: this.oldPassword,
            new_password: this.newPassword,
          })
          .then(({ data }) => {
            if (data) {
              alert("비밀번호가 변경됐습니다. 재 로그인 해주세요.");
              this.$store.dispatch("auth/logout");
            }
          })
          .catch(({ response }) => {
            alert(response.data.errorMessage);
          });
      } else {
        alert("비밀번호를 확인해주세요.");
      }
    },
    updateUserInfo() {
      console.log("updateUserInfo");
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 2rem;
}
</style>
