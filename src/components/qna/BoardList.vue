<template>
  <div>
    <div class="div-card">
      <vs-tr
        :key="i"
        v-for="(article, i) in $vs.getPage(article, page, max)"
        :data="tr">
        <div>
          <vs-card type="1" @click="viewArticle(article)">
            <template #title>
              <h3 v-text="`${article.no}.${article.subject}`"></h3>
            </template>
            <template #img>
              <img src="@/assets/logo.png" alt="" />
            </template>
            <template #text
              ><div class="div-content">{{ article.content }}</div></template
            >

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

    <vs-dialog
      class="dialog-modal"
      scroll
      overflow-hidden
      prevent-close
      v-model="active">
      <template #header>
        <h3 class="mt-2" style="font-weight: bold">Q&A 등록하기</h3>
      </template>
      <div class="center content-inputs mt-3">
        <vs-input label-placeholder="제목" v-model="form.subject" />
      </div>
      <div class="center content-inputs mt-2">
        <textarea
          class="noresize textarea-modal"
          rows="13"
          cols="47"
          v-model="form.content" />
      </div>
      <div>
        <vs-button class="float-right mb-2" @click="saveForm"> 저장 </vs-button>
      </div>
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
          subject: this.form.subject,
          content: this.form.content,
          type: "QNA",
        })
        .then(({ data }) => {
          if (data) {
            this.closeModal();
            window.location.reload(true);
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
        type: "",
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
.div-content {
  word-wrap: break-word;
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

.dialog-modal {
  padding: 2px;
}
.vs-dialog__header {
  height: 100%;
}
.vs-dialog__content {
  min-height: 470px;
}
.noresize {
  resize: none;
}
.textarea-modal {
  overflow: hidden;
  border-radius: 8px;
  border: none;
  background-color: #f4f7f8;
  padding: 10px 10px 10px 10px;
}
</style>
