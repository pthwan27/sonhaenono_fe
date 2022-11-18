<template>
  <b-container fluid id="loginContainer">
    <div class="box flexible">
      <div class="flexible" style="flex-direction: column">
        <div style="height: 50%; width: 100%">
          <div
            class="zI7 iyn Hsu"
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
          <vs-input label="아이디" v-model.lazy.trim="id" />
        </div>
        <div class="center content-inputs">
          <vs-input
            label="비밀번호"
            v-model.lazy.trim="password"
            type="password" />
        </div>
        <div class="center" style="padding: 0">
          <vs-checkbox v-model="remember"> 아이디 기억하기 </vs-checkbox>
        </div>
        <div class="center content-inputs">
          <vs-button style="width: 200px" @click="login"> 로그인 </vs-button>
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
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
  },
  watch: {
    isAuthenticated: function (val) {
      if (val) {
        if (this.remember) {
          this.$cookies.set(REMEBMER_USER_ID_KEY, this.id);
        } else {
          this.$cookies.remove(REMEBMER_USER_ID_KEY);
        }
        this.$router.push({ name: "map" });
      }
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

<style scoped>
.item {
  object-fit: cover;
}
#loginContainer {
  display: flex;
  height: 100vh;
  background-color: #cbf3f0;
}
.box {
  width: 100%;
  height: 100%;
}
.box-item {
  overflow: hidden;
  border-radius: 2rem;

  width: 400px;
  height: 500px;
  padding: 3rem 1rem;
}
.flexible {
  display: flex;
  justify-content: center;
  align-items: center;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  flex-wrap: wrap;
}
</style>
