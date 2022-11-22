<template>
  <div></div>
</template>

<script>
import http from "@/api/http";

export default {
  data() {
    return {
      color: "#ffffff",
    };
  },

  name: "BoardDelete",
  created() {
    const loading = this.$vs.loading({
      background: this.color,
      color: "#fff",
    });

    setTimeout(() => {
      loading.close();
    }, 2000);
    http.delete(`/notice/${this.$route.params.no}`).then(({ data }) => {
      let msg = "삭제 처리시 문제가 발생했습니다.";
      if (data === true) {
        msg = "삭제가 완료되었습니다.";
        this.$router.push({ name: "boardlist" });
      } else {
        this.$router.push({
          name: "boardview",
          params: { no: `${this.$route.params.no}` },
        });
      }
      alert(msg);
    });
  },
};
</script>

<style></style>
