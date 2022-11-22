<template>
  <b-container fluid id="signinContainer">
    <div class="box flexible">
      <div class="flexible" style="flex-direction: column">
        <div style="height: 50%; width: 100%">
          <vs-button shadow @click="$router.push({ name: 'main' })">
            메인으로 이동하기
          </vs-button>
          <div style="font-size: 60px; font-weight: bold; text-align: left">
            안녕하세요 :) <br />손해노노 입니다.
          </div>
          <div style="max-width: 700px">
            <div style="font-size: 24px">
              손해입지 않고 집을 어떻게 구해야할 지 막막하셨죠?
            </div>
            <div style="font-size: 24px">고민을 덜어드립니다!</div>
          </div>
        </div>
      </div>
    </div>
    <div class="box flexible">
      <b-card class="box-item">
        <div class="center content-inputs">
          <vs-input
            :loading="idcheckLoading"
            label="아이디"
            :state="idhasError"
            v-model.lazy.trim="id"
            :maxlength="20">
            <template #message-warn> {{ idhasError }}</template>
          </vs-input>
        </div>
        <div class="center content-inputs">
          <vs-input
            label="비밀번호"
            v-model.trim="password"
            :state="passwordhasError"
            type="password"
            :maxlength="16">
            <template #message-warn> {{ passwordhasError }}</template>
          </vs-input>
        </div>
        <div class="center content-inputs">
          <vs-input
            label="비밀번호 재입력"
            v-model.lazy.trim="repassword"
            ref="password"
            type="password"
            :maxlength="16">
            <template #message-warn> {{ repasswordhasError }}</template>
          </vs-input>
        </div>
        <div class="center content-inputs">
          <vs-input label="이름" v-model.lazy.trim="name" :maxlength="40">
            <template #message-warn> {{ namehasError }}</template></vs-input
          >
        </div>
        <div class="center content-inputs">
          <vs-input label="전화번호" v-model="phone" :maxlength="16">
            <template #message-warn> {{ phone.hasError }}</template>
          </vs-input>
        </div>
        <div class="center content-inputs">
          <vs-input
            label="이메일"
            v-model.lazy.trim="email"
            type="email"
            :maxlength="100">
            <template #message-warn> {{ email.hasError }}</template>
          </vs-input>
        </div>
        <div class="center content-inputs">
          <vs-button style="flex: 1" @click="createUser" :loading="loading">
            가입하기
          </vs-button>
        </div>
      </b-card>
    </div>
  </b-container>
</template>

<script>
import { debounce } from "lodash";
import validation from "@/common/validation";
import http from "@/api/http";

const idCheck = debounce(async (val, before, callback) => {
  if (!val) return callback("아이디를 입력해주세요.");
  before();
  let { data } = await http.get(`/auth/checkId/${val}`);
  if (data) {
    return callback("이미 존재하는 아이디입니다.");
  }
  return callback();
}, 500);

export default {
  name: "signinView",
  data() {
    return {
      id: "",
      idhasError: null,
      idcheckLoading: false,
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
      if (!validation.isIdValidationCheck(newValue)) {
        return this.afterIdCheck(
          "5~20자의 영문 소문자, 숫자와 특수기화(-),(_)만 사용 가능합니다.",
        );
      }
      this.idhasError = null;
      this.idcheckLoading = false;
      idCheck(newValue, this.beforeIdCheck, this.afterIdCheck);
    },
    getError: function ({ errorMessage } = {}) {
      this.loading = false;
      alert(errorMessage);
    },

    password: function (newValue) {
      if (!validation.isPasswordValidationCheck(newValue)) {
        return this.afterPwCheck(
          "8~16자 하나 이상의 대문자, 소문자, 숫자 및 특수문자(@$!*?)를 넣어주세요.",
        );
      }
      this.passwordhasError = null;
    },
    repassword: function (newValue) {
      if (!validation.isPasswordValidationCheck(newValue)) {
        return this.afterRePwCheck(
          "8~16자 하나 이상의 대문자, 소문자, 숫자 및 특수문자(@$!*?)를 넣어주세요.",
        );
      }
      if (this.password !== this.repassword) {
        return this.afterRePwCheck("비밀번호 입력과 다릅니다.");
      }
      this.repasswordhasError = null;
    },
    name: function (newValue) {
      if (!validation.isNameValidationCheck(newValue)) {
        return this.afterNameCheck(
          "최대 40자, 한글과 영문 대/소문자를 사용하세요.(특수문자, 공백 불가)",
        );
      }
      this.namehasError = null;
    },
    phone: function (newValue) {
      if (!validation.isPhoneValidationCheck(newValue)) {
        return this.afterPhoneCheck(
          "최대 16자, 핸드폰 번호만 가능하며 대시(-)는 제외합니다.",
        );
      }
      this.phonehasError = null;
    },
    email: function (newValue) {
      if (!validation.isEmailValidationCheck(newValue)) {
        return this.afterEmailCheck(
          "최대 100글자, 올바른 이메일인지 확인해주세요.",
        );
      }
      this.phonehasError = null;
    },
  },
  methods: {
    beforeIdCheck() {
      this.idcheckLoading = true;
    },
    afterIdCheck(message) {
      this.idcheckLoading = false;
      if (message) {
        this.idhasError = message;
      }
    },
    afterPwCheck(message) {
      if (message) {
        this.passwordhasError = message;
      }
    },
    afterRePwCheck(message) {
      if (message) {
        this.repasswordhasError = message;
      }
    },
    afterNameCheck(message) {
      if (message) {
        this.namehasError = message;
      }
    },
    afterEmailCheck(message) {
      if (message) {
        this.emailhasError = message;
      }
    },
    afterPhoneCheck(message) {
      if (message) {
        this.phonehasError = message;
      }
    },
    createUser() {
      const data = {
        id: this.id,
        password: this.password,
        name: this.name,
        phone: this.phone,
        email: this.email,
      };
      if (
        this.namehasError ||
        this.passwordhasError ||
        this.repasswordhasError ||
        this.phonehasError ||
        this.emailhasError
      ) {
        alert("입력하신 내용을 확인해주세요.");
      }
      this.loading = true;
      http
        .post("/auth/signup", data)
        .then((result) => {
          if (result) {
            alert("회원가입 성공! 로그인 화면으로 이동합니다.");
            this.$router.push({ name: "login" });
          }
        })
        .catch((err) => {
          alert(err.response.data.errorMessage);
          this.loading = false;
        });
    },
  },
};
</script>

<style>
#signinContainer {
  display: flex;
  height: 100vh;
  background-color: #ffbf69;
}
#signinContainer .box {
  width: 100%;
  height: 100%;
}
#signinContainer .box-item {
  overflow: hidden;
  border-radius: 2rem;
  width: 450px;

  height: auto;
  padding: 3rem 1rem;
}
#signinContainer .flexible {
  display: flex;
  justify-content: center;
  align-items: center;
}

#signinContainer .center {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  flex-wrap: wrap;
}

#signinContainer .vs-input-parent,
#signinContainer .vs-input-content,
#signinContainer input {
  flex: 1 !important;
}
</style>
