<template>
  <div>
    <b-card-group deck v-for="article in paginatedArticles" :key="article.no">
      <b-card
        style="max-width: 90%"
        class="mt-2 mb-2"
        body-border-variant="none">
        <b-card-body>
          <b-card-title>
            {{ article.subject }}
          </b-card-title>

          <b-card-sub-title class="mb-2 mt-1">
            <b-row>
              <b-col class="text-left">작성자 : {{ article.memberId }}</b-col>
              <b-col class="text-right">
                작성일 : {{ article.createdAt | dataFormat }}
              </b-col>
            </b-row>
          </b-card-sub-title>
        </b-card-body>
        <board-item-view :comment="article.content"></board-item-view>
      </b-card>
    </b-card-group>

    <b-pagination
      class="mt-2"
      style="justify-content: center"
      v-model="currentPage"
      :per-page="perPage"
      :total-rows="this.articles.length"
      first-number
      last-number>
    </b-pagination>

    <!-- 추가버튼 -->
    <div
      v-if="isAdmin"
      style="display: inline-flex; position: fixed; right: 1rem; bottom: 1rem">
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
        <h3 class="mt-2" style="font-weight: bold">공지사항 등록하기</h3>
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
import BoardItemView from "@/components/notice/item/BoardItemView.vue";
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
  components: { BoardItemView },
  name: "BoardList",

  data() {
    return {
      articles: [],
      active: false,
      comment: "",
      form: {
        subject: "",
        content: "",
        errorMessage: "",
      },

      currentPage: 1,
      perPage: 3,
    };
  },

  computed: {
    ...mapState("auth", ["user", "isAuthenticated"]),
    ...mapGetters("auth", ["isAdmin"]),

    paginatedArticles() {
      const { currentPage, perPage } = this;
      const start = (currentPage - 1) * perPage;
      const end = currentPage * perPage;

      return this.articles.slice(start, end);
    },
  },
  created() {
    http.get(`/notice`).then(({ data }) => {
      this.articles = data;
      console.log(this.articles);
    });
  },
  filters: {
    dataFormat(data) {
      return new Date(Date.parse(data)).toLocaleString();
    },
  },
  methods: {
    saveForm() {
      this.form.errorMessage = "";
      http
        .post("/notice", {
          subject: this.form.subject,
          content: this.form.content,
          type: "NOTICE",
        })
        .then(({ data }) => {
          if (data) {
            this.closeModal();
            window.location.reload(true);
          }
        })
        .catch(({ response }) => {
          console.log(this.form);
          this.form.errorMessage = response.data.errorMessage;
          alert(this.form.errorMessage);
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
.card {
  max-width: 100%;
  border-bottom: 1px, solid, black;
  /* background-color: ; */
  border-radius: 10px;
}
.card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.16), 0 4px 10px rgba(0, 0, 0, 0.23);
}
.card-deck {
  display: flex;
  justify-content: center;
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
.card-deck {
  display: flex;
  justify-content: center;
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
