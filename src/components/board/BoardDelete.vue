<template>
  <div ref="target" id="target" class="center">
    <div :style="`background: ${color};`" class="con-input">
      <input v-model="color" type="color" />
      <i class="bx bxs-color-fill"></i>
    </div>
    <vs-button flat :color="color" @click="openLoading">Open Loading</vs-button>
  </div>
</template>

<script>
import http from "@/api/http";

export default {
  data() {
    return {
      color: "#7a76cb",
    };
  },
  methods: {
    openLoading() {
      const loading = this.$vs.loading({
        background: this.color,
        color: "#fff",
      });
      setTimeout(() => {
        loading.close();
      }, 3000);
    },
  },

  name: "BoardDelete",
  created() {
    http.delete(`/board/${this.$route.params.no}`).then(({ data }) => {
      let msg = "삭제 처리시 문제가 발생했습니다.";
      if (data === true) {
        msg = "삭제가 완료되었습니다.";
      }
      alert(msg);

      this.$router.push({ name: "boardlist" });
    });
  },
};
</script>

<style></style>
