<template>
  <b-container id="myPageContainer">
    <div>
      <vs-button
        style="float: right"
        success
        @click="$router.push({ name: 'main' })">
        메인으로 이동하기
      </vs-button>
      <h1>마이페이지</h1>
    </div>
    <vs-row :w="12">
      <vs-col>
        <vs-card>
          <template #title>
            <h3>내정보 수정하기</h3>
          </template>
          <template #text>
            <vs-row id="myinfo">
              <b-col cols="3"> 이름 </b-col>
              <b-col cols="3">
                <vs-input v-model="myinfo.name"></vs-input>
              </b-col>
              <b-col cols="3"> 전화번호 </b-col>
              <b-col cols="3">
                <vs-input v-model="myinfo.phone"></vs-input>
              </b-col>
              <b-col cols="3"> 이메일 </b-col>
              <b-col cols="3">
                <vs-input v-model="myinfo.email"></vs-input>
              </b-col>
            </vs-row>
            <vs-row>
              <vs-button flat @click="updateUserInfo" type="submit"
                >변경</vs-button
              >
            </vs-row>
          </template>
        </vs-card>
      </vs-col>
    </vs-row>
    <vs-row :w="12" style="justify-content: space-between">
      <vs-col :w="6">
        <vs-card>
          <template #title>
            <h3>관심지역 설정</h3>
          </template>
          <template #text>
            <div
              style="
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-row-gap: 0.5rem;
              ">
              <vs-radio
                v-for="fv in favoritearea"
                :val="fv.dongCode"
                :key="fv.dongCode"
                v-model="myinfo.favorite">
                {{ fv.sidoName }}
              </vs-radio>
            </div>
            <vs-button @click="saveFavorite" flat type="submit">변경</vs-button>
          </template>
        </vs-card></vs-col
      >
      <!-- 비밀번호 변경하기 -->
      <vs-col :w="5">
        <vs-card>
          <template #title>
            <h3>비밀번호 변경하기</h3>
          </template>
          <template #text>
            <div class="center content-inputs">
              <vs-input
                label="이전 비밀번호"
                v-model.trim="password.old"
                :state="password.oldhasError"
                type="password"
                :maxlength="16">
                <template #message-warn> {{ password.oldhasError }}</template>
              </vs-input>
            </div>
            <div class="center content-inputs">
              <vs-input
                label="비밀번호"
                v-model.trim="password.change"
                :state="password.chagehasError"
                type="password"
                :maxlength="16">
                <template #message-warn> {{ password.chagehasError }}</template>
              </vs-input>
            </div>
            <div class="center content-inputs">
              <vs-input
                label="비밀번호 재입력"
                v-model.lazy.trim="password.rechange"
                :state="password.rechangehasError"
                type="password"
                :maxlength="16">
                <template #message-warn>
                  {{ password.rechangehasError }}</template
                >
              </vs-input>
            </div>
            <vs-button @click="changePassword" flat type="submit"
              >변경</vs-button
            >
          </template>
        </vs-card></vs-col
      >
    </vs-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

import http from "@/api/http";
import validation from "@/common/validation";

export default {
  name: "MyPage",
  data() {
    return {
      password: {
        old: "",
        change: "",
        rechange: "",
        oldhasError: null,
        chagehasError: null,
        rechangehasError: null,
      },
      myinfo: {
        name: "",
        email: "",
        phone: "",
        favorite: null,
      },
      favoritearea: [],
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
  watch: {
    "password.old": function (newValue) {
      if (!validation.isPasswordValidationCheck(newValue)) {
        return this.afterOldCheck(
          "8~16자 하나 이상의 대문자, 소문자, 숫자 및 특수문자(@$!*?)를 넣어주세요.",
        );
      }
      this.password.oldhasError = null;
    },
    "password.change": function (newValue) {
      if (!validation.isPasswordValidationCheck(newValue)) {
        return this.afterPwCheck(
          "8~16자 하나 이상의 대문자, 소문자, 숫자 및 특수문자(@$!*?)를 넣어주세요.",
        );
      }
      this.password.chagehasError = null;
    },
    "password.rechange": function (newValue) {
      if (!validation.isPasswordValidationCheck(newValue)) {
        return this.afterRePwCheck(
          "8~16자 하나 이상의 대문자, 소문자, 숫자 및 특수문자(@$!*?)를 넣어주세요.",
        );
      }
      if (this.password.change !== this.password.rechange) {
        return this.afterRePwCheck("새로운 비밀번호 입력과 다릅니다.");
      }
      this.password.rechangehasError = null;
    },
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    afterOldCheck(message) {
      if (message) {
        this.password.oldhasError = message;
      }
    },
    afterPwCheck(message) {
      if (message) {
        this.password.chagehasError = message;
      }
    },
    afterRePwCheck(message) {
      if (message) {
        this.password.rechangehasError = message;
      }
    },
    prevRouteMove() {
      this.$router.push({ name: "main" });
    },
    saveFavorite() {
      let data = {
        regions: this.myinfo.favorite ? [this.myinfo.favorite] : [],
      };
      http
        .put("member/favorite-regions", data)
        .then(({ data }) => {
          alert("변경되었습니다.");
          console.log(data);
        })
        .catch((err) => {
          alert("잠시후에 다시 시도해주세요.");
          console.log(err);
        });
    },
    changePassword() {
      if (this.password.change === this.password.rechange) {
        http
          .put("/member/password", {
            password: this.password.old,
            new_password: this.password.change,
          })
          .then(({ data }) => {
            if (data) {
              alert("비밀번호가 변경됐습니다. 다시 로그인 해주세요.");
              this.logout();
              location.href = "/login";
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
      let info = {
        name: this.myinfo.name,
        email: this.myinfo.email,
        phone: this.myinfo.phone,
      };
      http
        .put("/member/info", info)
        .then(({ data }) => {
          if (data) {
            this.$store.dispatch("auth/getInfo");
            alert("유저정보를 변경했습니다.");
          }
        })
        .catch((err) => {
          console.debug(err.response);
          alert("유저정보 변경에 실패했습니다.");
        });
    },
  },
  created() {
    this.myinfo.email = this.user.email;
    this.myinfo.phone = this.user.phone;
    this.myinfo.name = this.user.name;

    http.get("/dongcode?type=sido").then(({ data }) => {
      this.favoritearea = data;
    });
    http.get("/member/favorite-regions").then(({ data }) => {
      this.myinfo.favorite = data[0];
    });
  },
};
</script>

<style>
body {
  background-color: #fefefe;
}
#myPageContainer h1 {
  margin: 2rem 0;
}

#myPageContainer .content-inputs {
  margin: 2rem 1rem 0 1rem;
}
#myPageContainer .vs-card {
  max-width: none;
}
#myPageContainer .vs-card__title > h3 {
  font-size: 1.5rem;
  font-weight: 900;
  margin-bottom: 1rem;
}
#myPageContainer .vs-card-content {
  margin-bottom: 1rem;
}
#myPageContainer #myinfo > .col-3 {
  margin-bottom: 0.5rem;
}
</style>
