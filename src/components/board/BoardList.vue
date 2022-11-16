<template>
  <vs-table>
    <template #thead>
      <vs-tr>
        <vs-th
          id="th-no"
          sort
          @click="article = $vs.sortData($event, article, 'no')">
          글번호
        </vs-th>
        <vs-th
          id="th-subject"
          sort
          @click="article = $vs.sortData($event, article, 'subject')">
          제목
        </vs-th>
        <vs-th
          id="th-memberId"
          sort
          @click="article = $vs.sortData($event, article, 'memberId')">
          작성자
        </vs-th>
        <vs-th
          id="th-createdAt"
          sort
          @click="article = $vs.sortData($event, article, 'createdAt')">
          작성일
        </vs-th>
        <vs-th
          id="th-hit"
          sort
          @click="article = $vs.sortData($event, article, 'hit')">
          조회수
        </vs-th>
      </vs-tr>
    </template>
    <template #tbody>
      <vs-tr
        :key="i"
        v-for="(tr, i) in $vs.getPage(article, page, max)"
        :data="tr">
        <vs-td>
          {{ tr.no }}
        </vs-td>
        <vs-td>
          <router-link
            :to="{ name: 'boardview', params: { articleno: tr.no } }">
            {{ tr.subject }}
          </router-link>
        </vs-td>
        <vs-td>
          {{ tr.memberId }}
        </vs-td>
        <vs-td>
          {{ tr.createdAt }}
        </vs-td>
        <vs-td>
          {{ tr.hit }}
        </vs-td>
      </vs-tr>
    </template>
    <template #footer>
      <vs-pagination v-model="page" :length="$vs.getLength(article, max)" />
    </template>
  </vs-table>
</template>

<script>
import http from "@/api/http";
export default {
  name: "BoardList",

  data() {
    return {
      search: "",
      page: 1,
      max: 5,

      article: [],
    };
  },

  created() {
    http.get(`/board`).then(({ data }) => {
      this.article = data;
    });
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
  color: rgba(255, 185, 93, 0.699);
}
a {
  text-decoration: none;
}

#th-no {
  width: 40px;
}
#th-subject {
  width: 160px;
}
#th-memberId {
  width: 40px;
}
#th-createdAt {
  width: 120px;
}
#th-hit {
  width: 40px;
}
</style>
