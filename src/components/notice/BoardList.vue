<template>
  <div>
    <b-container>
      <b-card-group deck v-for="article in articles" :key="article.no">
        <b-card style="max-width: 90%" class="mt-4" body-border-variant="none">
          <b-card-body>
            <b-card-title>
              {{ article.no }}.{{ article.subject }}
            </b-card-title>

            <b-card-sub-title class="mb-4 mt-1">
              <b-row>
                <b-col class="text-left">작성자 : {{ article.memberId }}</b-col>
                <b-col class="text-right">
                  작성일 :
                  {{ article.createdAt | dataFormat }}</b-col
                >
              </b-row>
            </b-card-sub-title>
          </b-card-body>

          <board-item-view :comment="article.content"></board-item-view>
        </b-card>
      </b-card-group>
    </b-container>

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
        <h3>공지사항 등록하기</h3>
      </template>
      <div class="con-content">
        <div class="centerx labelx">
          <div>
            <label for="subject">제목 : </label>
            <input id="subject" v-model="form.subject" />
          </div>
          <div>
            <label for="content">제목 : </label>
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
import BoardItemView from "@/components/notice/item/BoardItemView.vue";
export default {
  components: { BoardItemView },
  name: "BoardList",

  data() {
    return {
      articles: [BoardItemView],
      active: false,
      comment: "",
      form: {
        subject: "",
        content: "",
        errorMessage: "",
      },
    };
  },

  created() {
    http.get(`/notice`).then(({ data }) => {
      this.articles = data;
      console.log(this.articles);
    });
  },
  methods: {
    saveForm() {
      this.form.errorMessage = "";
      http
        .post("/notice", {
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
  filters: {
    dataFormat(data) {
      return new Date(Date.parse(data)).toLocaleString();
    },
  },
};
</script>

<style>
.card {
  max-width: 100%;
  border-bottom: 1px, solid, black;
  /* background-color: ; */
  border-radius: 10px;
}
.card-deck {
  display: flex;
  justify-content: center;
}
.card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.16), 0 4px 10px rgba(0, 0, 0, 0.23);
}
.div-card {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 15px;
}
.announcement__post-bullet {
  color: #074dff;
  margin: 0.25rem 0 0.25rem -2.5rem;
  max-height: 1.5rem;
  min-width: 1.875rem;

  padding-left: 0.5rem rem;
  float: left;
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
