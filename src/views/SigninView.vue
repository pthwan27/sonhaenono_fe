<template>
  <b-container fluid id="signinContainer">
    <div class="box flexible">
      <div class="flexible" style="flex-direction: column">
        <div style="height: 50%; width: 100%">
          <div style="font-size: 60px; font-weight: bold; text-align: center">
            태환이와 집을 알아볼까요?
          </div>
          <div style="max-width: 700px">
            <div style="font-size: 24px; text-align: center">네!</div>
            <!-- <typing-effect
              data-lines='["Welcome to GitHub!", "Let’s begin the adventure"]'>
              <span data-target="typing-effect.content"></span>
              <span data-target="typing-effect.cursor">|</span>
            </typing-effect> -->
          </div>
        </div>
      </div>
    </div>
    <div class="box flexible">
      <b-card class="box-item">
        <div class="center content-inputs">
          <vs-input label="아이디" :state="idhasError" v-model.lazy.trim="id">
            <template #message-warn> {{ idhasError }}</template>
          </vs-input>
        </div>
        <div class="center content-inputs">
          <vs-input
            label="비밀번호"
            v-model.lazy.trim="password"
            :state="passwordhasError"
            ref="password"
            type="password">
            <template #message-warn> {{ passwordhasError }}</template>
          </vs-input>
        </div>
        <div class="center content-inputs">
          <vs-input
            label="비밀번호 재입력"
            v-model.lazy.trim="repassword"
            ref="password"
            type="password">
            <template #message-warn> {{ repasswordhasError }}</template>
          </vs-input>
        </div>
        <div class="center content-inputs">
          <vs-input label="이름" v-model.lazy.trim="name">
            <template #message-warn> {{ namehasError }}</template></vs-input
          >
        </div>
        <div class="center content-inputs">
          <vs-input label="전화번호" v-model.lazy.trim="phone.value" type="tel">
            <template #message-warn> {{ phone.hasError }}</template>
          </vs-input>
        </div>
        <div class="center content-inputs">
          <vs-input label="이메일" v-model.lazy.trim="email.value" type="email">
            <template #message-warn> {{ email.hasError }}</template>
          </vs-input>
        </div>
        <div class="center content-inputs">
          <vs-button
            style="width: 200px"
            @click="createUser"
            :loading="loading">
            가입하기
          </vs-button>
        </div>
      </b-card>
    </div>
  </b-container>
</template>

<script>
import { debounce } from "lodash";
import http from "@/api/http";

async function idCheck(val, callback) {
  let { data } = await http.get(`/auth/checkId/${val}`);
  callback(!!data);
}
export default {
  name: "signinView",
  data() {
    return {
      id: "",
      idhasError: null,
      password: "",
      passwordhasError: null,
      repassword: "",
      repasswordhasError: null,
      name: "",
      namehasError: null,
      email: "",
      emailhasError: null,
      phone: "",
      phonehasError: null,
      loading: false,
    };
  },
  computed: {},
  watch: {
    id: function (newValue) {
      debounce(idCheck(newValue, this.isExistId), 500);
    },
    getError: function ({ errorMessage } = {}) {
      this.loading = false;
      alert(errorMessage);
    },
  },
  methods: {
    isExistId(status) {
      if (status) {
        this.idhasError = "이미존재하는 아이디입니다.";
      }
    },
    createUser() {
      this.loading = true;
    },
  },
};
</script>

<style scoped>
.item {
  object-fit: cover;
}
#signinContainer {
  display: flex;
  height: 100vh;
  background-color: #ffbf69;
}
.box {
  width: 100%;
  height: 100%;
}
.box-item {
  overflow: hidden;
  border-radius: 2rem;

  height: auto;
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
