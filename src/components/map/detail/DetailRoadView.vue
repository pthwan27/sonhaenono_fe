<template>
  <div id="detail_road_view">
    <div
      id="roadview"
      v-show="isReady"
      style="width: 100%; height: 200px"></div>
  </div>
</template>

<script>
let roadviewContainer = null;
let roadviewClient = null;
let roadview = null;
let position = null;

export default {
  name: "DetailRoadView",
  props: {
    lat: String,
    lng: String,
  },
  data() {
    return {
      isReady: true,
    };
  },
  mounted() {
    this.initMap();
  },
  computed: {
    latLng: function () {
      return {
        lat: Number.parseFloat(this.lat),
        lng: Number.parseFloat(this.lng),
      };
    },
  },
  watch: {
    latLng: function (newValue) {
      position = new kakao.maps.LatLng(newValue.lat, newValue.lng);
      this.isReady = true;
      this.goToPosition();
    },
  },
  methods: {
    goToPosition() {
      roadviewClient = new kakao.maps.RoadviewClient();

      roadviewClient.getNearestPanoId(position, 50, (panoId) => {
        if (panoId) {
          roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
        } else {
          this.isReady = false;
        }
      });
    },
    initMap() {
      position = new kakao.maps.LatLng(this.lat, this.lng);
      roadviewContainer = document.getElementById("roadview");
      roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
      this.goToPosition();
    },
  },
};
</script>

<style></style>
