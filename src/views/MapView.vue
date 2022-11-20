<template>
  <div>
    <b-button id="btn-displayMarker" @click="displayMarker(markerPositions1)">
      좌표찍어보기
    </b-button>
    <div id="map"></div>
  </div>
</template>

<script>
import { KAKAO_MAP_API_KEY } from "@/common/constant";
export default {
  name: "MapView",
  data() {
    return {
      map: null,
      markerPositions1: [
        [37.564343, 126.947613],
        [37.564343, 126.937611],
      ],
      markers: [],

      // 지도 위치 움직일 때 값이 저장되도록 하기 위해
      level: 0,
      lat: 0,
      lng: 0,
    };
  },
  methods: {
    initMap() {
      var mapContainer = document.getElementById("map"),
        mapOption = {
          center: new kakao.maps.LatLng(37.564343, 126.947613), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };

      /* eslint-disable */
      this.map = new window.kakao.maps.Map(mapContainer, mapOption);

      /* 오른쪽 위 버튼 2개 */
      // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤
      var mapTypeControl = new kakao.maps.MapTypeControl();
      this.map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

      // 지도 확대 축소를 제어할 수 있는  줌 컨트롤
      var zoomControl = new kakao.maps.ZoomControl();
      this.map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      //버튼을 만들면 메소드로 빼면 될듯??한데~?
      if (navigator.geolocation) {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function (position) {
          var lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도

          var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
            message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다
          console.log(locPosition, message);
        });
      } else {
        // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

        var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
          message = "geolocation을 사용할수 없어요..";

        console.log(locPosition, message);
      }

      // why 안 돼 ? !
      // // 지도가 이동, 확대, 축소로 인해 중심좌표가 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
      // kakao.maps.event.addListener(this.map, "center_changed", function () {
      //   latlng = map.getCenter();
      //   // 지도의 중심좌표를 얻어옵니다
      //   this.lat = latlng.getLat();
      //   this.lng = latlng.getlng();
      // });
    },

    displayMarker(markerPositions) {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }

      const positions = markerPositions.map(
        (position) => new kakao.maps.LatLng(...position),
      );

      if (positions.length > 0) {
        this.markers = positions.map(
          (position) =>
            new kakao.maps.Marker({
              map: this.map,
              position,
            }),
        );

        //다시 중앙으로 오게하는 ?? 것
        const bounds = positions.reduce(
          (bounds, latlng) => bounds.extend(latlng),
          new kakao.maps.LatLngBounds(),
        );

        this.map.setBounds(bounds);
      }
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
