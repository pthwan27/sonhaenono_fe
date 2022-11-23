<template>
  <b-container class="bv-example-row mb-5">
    <b-card>
      <b-row>
        <b-col class="text-left">
          <b-button variant="outline-primary" @click="moveList">목록</b-button>
        </b-col>
        <b-col class="text-right">
          <b-button
            variant="outline-info"
            size="sm"
            @click="moveModifyArticle"
            class="mr-2"
            >글수정</b-button
          >
          <b-button variant="outline-danger" size="sm" @click="deleteArticle"
            >글삭제</b-button
          >
        </b-col>
      </b-row>
      <hr />

      <b-card-title>
        <h3>{{ `${article.no}. ${article.subject}` }}</h3>
      </b-card-title>
      <b-card-subTitle>
        <b-row>
          <b-col class="text-left">
            <h6>{{ article.memberId }}</h6>
          </b-col>
          <b-col class="text-right">
            <h6>
              {{ article.createdAt | dataFormat }}
            </h6>
          </b-col>
        </b-row>
      </b-card-subTitle>

      <b-card-text class="text-left">
        <p></p>
        <div v-text="message"></div>
      </b-card-text>
    </b-card>
    <hr class="mt-5 hr-div" />

    <div class="mt-3">
      <b-alert show><h8>댓글 5</h8></b-alert>

      <div v-if="article.comments">
        <div
          class="commentBox mt-2"
          v-for="(comment, index) in article.comments"
          :key="comment.no">
          <div style="jusitfy-content: center; align-items: center">
            <vs-avatar circle id="userProfileIcon" primary>
              <template #text>
                {{ comment.memberId | firstName }}
              </template>
            </vs-avatar>
            {{ comment.memberId }}
          </div>

          <p>작성시간: {{ comment.replyAt | dataFormat }}</p>

          <div>{{ index + 1 }}. {{ comment.content }}</div>
        </div>
      </div>
      <b-row v-else>댓글이 없습니다.</b-row>
    </div>
    <div class="mt-3">
      <b-input-group class="mt-3">
        <b-form-input
          v-model="comment"
          placeholder="댓글을 입력해주세요"></b-form-input>
        <b-input-group-append>
          <b-button variant="info" @click="addComment"> 등록</b-button>
        </b-input-group-append>
      </b-input-group>
    </div>
  </b-container>
</template>

<script>
// import moment from "moment";
import http from "@/api/http";

export default {
  name: "BoardDetail",
  data() {
    return {
      article: {},
      comment: "",
    };
  },
  computed: {
    message() {
      if (this.article.content)
        return this.article.content.split("\n").join("<br>");
      return "";
    },
  },

  filters: {
    dataFormat(data) {
      return new Date(Date.parse(data)).toLocaleString();
    },
  },

  created() {
    console.log(`${this.$route.params}`);
    http.get(`/qna/${this.$route.params.no}`).then(({ data }) => {
      console.log(data);
      this.article = data;
    });
  },
  // filters: {
  //   dateFormat(createAt) {
  //     return moment(new Date(createAt)).format("YY.MM.DD");
  //   },
  // },
  methods: {
    moveModifyArticle() {
      this.$router.replace({
        name: "qnamodify",
        params: { no: this.article.no },
      });
      //   this.$router.push({ path: `/board/modify/${this.article.no}` });
    },
    deleteArticle() {
      if (confirm("정말로 삭제?")) {
        this.$router.replace({
          name: "qnadelete",
          params: { no: this.article.no },
        });
      }
    },
    moveList() {
      this.$router.push({ name: "qnalist" });
    },
    addComment() {
      if (this.comment.length == 0) {
        return false;
      }
      let data = {
        content: this.comment,
      };
      http.post(`/qna/${this.article.no}/comment`, data).then(({ data }) => {
        this.article.comments.push(data);
        this.comment = "";
      });
    },
  },
};
</script>

<style>
.commentBox {
  width: calc(100% - 3.2rem);
  margin: 0 auto;
  padding: 1.2rem 1.6rem 0.9rem;
  box-shadow: 0 0 11.9px 2.9px rgb(0 0 0 / 10%);
}
.alert-info {
  padding: 10px;
  background: none;
  border: none;
}
.hr-div {
  border-width: 2px;
}
</style>
