<template>
  <div>
    <v-div class="div-card">
      <vs-tr
        :key="i"
        v-for="(article, i) in $vs.getPage(article, page, max)"
        :data="tr">
        <v-div>
          <vs-card>
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
        </v-div>
      </vs-tr>
    </v-div>
    <vs-pagination v-model="page" :length="$vs.getLength(article, max)" />
    <div
      style="
        display: inline-flex;
        position: absolute;
        right: 1rem;
        bottom: 1rem;
      ">
      <template icon>
        <i id="addArticleBtn" class="bx bxs-plus-circle"></i>
      </template>
    </div>
  </div>
</template>

<script>
import http from "@/api/http";
export default {
  name: "BoardList",

  data() {
    return {
      search: "",
      page: 1,
      max: 6,

      article: [],
    };
  },

  created() {
    http.get(`/board`).then(({ data }) => {
      this.article = data;
    });
  },
  methods: {
    viewArticle(article) {
      this.$router.push({
        name: "boardview",
        params: { no: article.no },
      });
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
</style>
