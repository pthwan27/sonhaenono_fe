<template>
  <div id="map"></div>
</template>

<script>
import { KAKAO_MAP_API_KEY } from "@/common/constant";
export default {
  name: "MapView",
  methods: {
    initMap() {
      var mapContainer = document.getElementById("map"),
        mapOption = {
          center: new kakao.maps.LatLng(37.564343, 126.947613), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };
      /* eslint-disable */
      var map = new kakao.maps.Map(mapContainer, mapOption);
    },
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${KAKAO_MAP_API_KEY}`;
      document.head.appendChild(script);
    }
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 100vh;
}
</style>
