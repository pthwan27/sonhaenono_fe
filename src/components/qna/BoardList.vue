<template>
  <div>
    <div class="div-card">
      <vs-tr
        :key="i"
        v-for="(article, i) in $vs.getPage(article, page, max)"
        :data="tr">
        <div>
          <vs-card type="2">
            <template #title>
              <h3
                v-html="`${article.no}.${article.subject}`"
                @click="viewArticle(article)"></h3>
            </template>
            <template #img>
              <img
                src="@/assets/temp.png"
                alt=""
                @click="viewArticle(article)" />
            </template>
            <template #text>
              <p
                v-html="`${article.content}`"
                @click="viewArticle(article)"></p>
            </template>
            <template #interactions>
              <vs-button danger icon>
                <i class="bx bx-heart"></i>
                <span class="span"> 54 </span>
              </vs-button>

              <!-- 댓글 개수 icon -->
              <!-- <vs-button class="btn-chat" shadow primary>
                <i class="bx bx-chat"></i>
                <span class="span"> 54 </span>
              </vs-button> -->
            </template>
          </vs-card>
        </div>
      </vs-tr>
    </div>
    <vs-pagination v-model="page" :length="$vs.getLength(article, max)" />
    <div
      style="
        display: inline-flex;
        position: absolute;
        right: 1rem;
        bottom: 1rem;
      ">
      <template icon>
        <i
          id="addArticleBtn"
          class="bx bxs-plus-circle"
          @click="active = !active"></i>
      </template>
    </div>

    <vs-dialog scroll overflow-hidden prevent-close auto-width v-model="active">
      <template #header>
        <h3>Q&A 등록하기</h3>
      </template>
      <div class="con-content">
        <div class="centerx labelx">
          <div>
            <label for="subject">제목 : </label>
            <input id="subject" v-model="form.subject" />
          </div>
          <div>
            <label for="content">내용 : </label>
            <textarea id="content" v-model="form.content"></textarea>
          </div>
          <div>{{ form.errorMessage }}</div>
        </div>
      </div>
      <template #footer>
        <vs-button gradient @click="saveForm"> 저장 </vs-button>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import http from "@/api/http";
import { mapState } from "vuex";
export default {
  name: "BoardList",

  data() {
    return {
      search: "",
      page: 1,
      max: 6,
      article: [],
      active: false,
      form: {
        subject: "",
        content: "",
        errorMessage: "",
      },
    };
  },

  created() {
    http.get(`/qna`).then(({ data }) => {
      this.article = data;
    });
  },
  computed: {
    ...mapState("auth", ["user", "isAuthenticated"]),
  },
  methods: {
    viewArticle(article) {
      console.log(this.isAuthenticated);
      console.log(this.user);
      if (this.isAuthenticated == true && this.user != null) {
        this.$router.push({
          path: `/qna`,
          name: "qnaView",
          params: { no: article.no },
        });
      } else {
        alert("로그인한 회원만 볼 수 있습니다");
        return;
      }
    },
    saveForm() {
      this.form.errorMessage = "";
      http
        .post("/qna", {
          subject: this.subject,
          content: this.content,
        })
        .then(({ data }) => {
          if (data) {
            this.closeModal();
          }
        })
        .catch(({ response }) => {
          this.form.errorMessage = response.data.errorMessage;
        });
    },
    closeModal() {
      this.form = {
        subject: "",
        content: "",
      };
      this.active = false;
    },
  },
};
</script>

<style>
a:link {
  color: black;
}
a:visited {
  color: black;
}
a:hover {
  color: rgba(3, 3, 3, 0.788);
}
a {
  text-decoration: none;
}

.div-card {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 15px;
}

#addArticleBtn {
  color: #ffbf69;
  font-size: 64px;
  cursor: pointer;
}
#addArticleBtn:hover {
  color: #ff9f1c;
}
.labelx .vs-input {
  margin: 10px;
}
</style>
