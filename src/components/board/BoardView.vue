<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글보기</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1"> </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>${article.no}.${article.subject} </h3>
          <div>
            <h6>${article.memberId}</h6>
          </div>
          <div>
            <h6>
            ${article.createdAt}
            </h6>
          </div>`"
          class="mb-2"
          border-variant="dark"
          no-body>
          <b-card-body class="text-left">
            <div v-html="message"></div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
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
    <div class="mt-3">
      <textarea style="width: 100%" v-model="comment"></textarea>
      <vs-button @click="addComment"> 작성 </vs-button>
    </div>
    <div class="mt-3">
      <b-alert show><h5>댓글 보기</h5></b-alert>
    </div>
    <div v-if="article.comments">
      <b-col
        class="commentBox"
        v-for="(comment, index) in article.comments"
        :key="comment.no">
        <div
          style="display: flex; jusitfy-content: center; align-items: center">
          <vs-avatar id="userProfileIcon" primary>
            <template #text>
              {{ comment.memberId | firstName }}
            </template>
          </vs-avatar>
          {{ comment.memberId }}
        </div>
        <p>시각: {{ comment.replyAt }}</p>
        <div>{{ index + 1 }}. {{ comment.content }}</div>
      </b-col>
    </div>
    <div v-else>댓글이 없습니다.</div>
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
  created() {
    console.log(`${this.$route.params}`);
    http.get(`/board/${this.$route.params.no}`).then(({ data }) => {
      console.log(data);
      this.article = data;
    });
  },
  methods: {
    moveModifyArticle() {
      this.$router.replace({
        name: "boardmodify",
        params: { no: this.article.no },
      });
      //   this.$router.push({ path: `/board/modify/${this.article.no}` });
    },
    deleteArticle() {
      if (confirm("정말로 삭제?")) {
        this.$router.replace({
          name: "boarddelete",
          params: { no: this.article.no },
        });
      }
    },
    moveList() {
      this.$router.push({ name: "boardlist" });
    },
    addComment() {
      let data = {
        content: this.comment,
      };
      http.post(`/board/${this.article.no}/comment`, data).then(({ data }) => {
        this.article.comments.push(data);
        this.comment = "";
      });
    },
  },
  // filters: {
  //   dateFormat(regtime) {
  //     return moment(new Date(regtime)).format("YY.MM.DD hh:mm:ss");
  //   },
  // },
};
</script>

<style>
.commentBox {
  background-color: white;
  border: 1px solid gray;
  padding: 8px;
}
</style>
