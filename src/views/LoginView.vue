<template>
  <b-container fluid id="loginContainer">
    <div class="box flexible">
      <div class="flexible" style="flex-direction: column">
        <div style="height: 50%; width: 100%">
          <vs-button shadow @click="$router.push({ name: 'main' })">
            메인으로 이동하기
          </vs-button>
          <div
            style="
              color: rgb(0, 107, 108);
              font-size: 60px;
              font-weight: bold;
              text-align: center;
            ">
            빠르게 집을 알아볼 수 있도록 도와드릴게요!
          </div>
          <div style="max-width: 700px">
            <div style="font-size: 24px; color: rgb(0, 107, 108)">
              관심지역을 등록하시면 개인에 맞춘 집 추천 서비스를 제공하고
              있습니다.
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="box flexible">
      <b-card class="box-item">
        <div class="center content-inputs">
          <vs-input label="아이디" v-model.lazy.trim="id" ref="id" />
        </div>
        <div class="center content-inputs">
          <vs-input
            label="비밀번호"
            v-model.lazy.trim="password"
            ref="password"
            type="password" />
        </div>
        <div class="center content-inputs pt-0 pb-0">
          <vs-checkbox v-model="remember"> 아이디 기억하기 </vs-checkbox>
        </div>
        <div class="center content-inputs">
          <vs-button style="flex: 1" @click="login" :loading="loading">
            로그인
          </vs-button>
        </div>
        <div class="center content-inputs">
          <span>
            회원가입은 <router-link to="/singin">여기</router-link>에서
            가능합니다 :)</span
          >
        </div>
      </b-card>
    </div>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import { REMEBMER_USER_ID_KEY } from "@/common/constant";

export default {
  name: "LoginView",
  data() {
    return {
      id: "",
      password: "",
      remember: false,
      loading: false,
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "getError"]),
  },
  watch: {
    isAuthenticated: function (val) {
      this.loading = false;
      if (val) {
        if (this.remember) {
          this.$cookies.set(REMEBMER_USER_ID_KEY, this.id);
        } else {
          this.$cookies.remove(REMEBMER_USER_ID_KEY);
        }
        this.$router.push({ name: "map" });
      }
    },
    getError: function ({ errorMessage } = {}) {
      this.loading = false;
      console.debug(errorMessage);
      alert("아이디와 비밀번호를 확인해주세요.");
    },
  },
  methods: {
    login() {
      if (!this.id) {
        alert("아이디를 입력해주세요.");
        this.$ref.id.focus();
        return;
      }
      const loginInfo = {
        id: this.id,
        password: this.password,
      };
      this.loading = true;
      this.$store.dispatch("auth/login", loginInfo);
    },
  },
  created() {
    const rememberId = this.$cookies.get(REMEBMER_USER_ID_KEY);
    this.remember = !!rememberId;
    if (this.remember) {
      this.id = rememberId;
    }
  },
};
</script>

<style>
#loginContainer {
  display: flex;
  height: 100vh;
  background-color: #cbf3f0;
}
#loginContainer .box {
  width: 100%;
  height: 100%;
}
#loginContainer .box-item {
  overflow: hidden;
  border-radius: 2rem;

  width: 450px;

  height: auto;
  padding: 3rem 1rem;
}
#loginContainer .flexible {
  display: flex;
  justify-content: center;
  align-items: center;
}

#loginContainer .center {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  flex-wrap: wrap;
}

#loginContainer .vs-input-parent,
#loginContainer .vs-input-content,
#loginContainer input {
  flex: 1 !important;
}
</style>
