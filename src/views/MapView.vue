<template>
  <b-container fluid class="m-0 p-0 d-flex">
    <!-- <b-button id="btn-displayMarker" @click="displayMarker(markerPositions1)">
      좌표찍어보기
    </b-button>

    <b-button id="btn-cur" @click="curPos()"> 현재좌표 </b-button>
    <div>
      {{ markerPositions1 }}
    </div> -->

    <div id="sidebar"></div>
    <div id="map"></div>
  </b-container>
</template>

<script>
import { debounce } from "lodash";
import { KAKAO_MAP_API_KEY } from "@/common/constant";
import { mapState } from "vuex";
import { mapActions } from "vuex";

let map = null;
const houseStore = "houseStore";

export default {
  name: "MapView",

  data() {
    return {
      map,

      markerPositions1: [
        [37.564343, 126.947613],
        [37.564343, 126.937611],
      ],
      markers: [],
      positions: [],
      // 지도 위치 움직일 때 값이 저장되도록 하기 위해
      level: 0,
      lat: 0,
      lng: 0,

      //남서쪽 북동쪽
      swLat: 0,
      swLng: 0,
      neLat: 0,
      neLng: 0,
    };
  },
  methods: {
    ...mapActions("houseStore", ["getMarkerList"]),

    initMap() {
      var mapContainer = document.getElementById("map"),
        mapOption = {
          center: new kakao.maps.LatLng(37.564343, 126.947613), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };
      /* eslint-disable */
      map = new window.kakao.maps.Map(mapContainer, mapOption);

      /* 오른쪽 위 버튼 2개 */
      // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤
      var mapTypeControl = new kakao.maps.MapTypeControl();
      map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

      // 지도 확대 축소를 제어할 수 있는  줌 컨트롤
      var zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      // 지도가 이동, 확대, 축소로 인해 중심좌표가 변경될 때
      kakao.maps.event.addListener(
        map,
        "bounds_changed",
        debounce(() => {
          // 지도 영역정보를 얻어옵니다
          var bounds = map.getBounds();

          // 영역정보의 남서쪽 정보
          var swLatlng = bounds.getSouthWest();
          // 영역정보의 북동쪽 정보
          var neLatlng = bounds.getNorthEast();

          this.swLat = swLatlng.getLat();
          this.swLng = swLatlng.getLng();
          this.neLat = neLatlng.getLat();
          this.neLng = neLatlng.getLng();

          this.getMarkerList({
            swLat: this.swLat,
            swLng: this.swLng,
            neLat: this.neLat,
            neLng: this.neLng,
          });
        }, 200),
      );

      // 클릭 이벤트
      kakao.maps.event.addListener(map, "mousedown", (mouseEvent) => {
        console.log(mouseEvent.latLng.getLat());
      });
    },

    curPos() {
      if (navigator.geolocation) {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function (position) {
          var lat = position.coords.latitude; // 위도
          var lon = position.coords.longitude; // 경도

          var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          var message = "<b-label>현재위치<b-label>"; // 인포윈도우에 표시될 내용입니다

          var marker = new kakao.maps.Marker({
            position: locPosition,
            map: map,
          });

          var iwContent = message,
            iwRemoveable = true;

          var infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
            removable: iwRemoveable,
          });

          infowindow.open(map, marker);
          map.setCenter(locPosition);
        });
      } else {
        // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
        var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
          message = "geolocation을 사용할수 없어요..";

        var marker = new kakao.maps.Marker({
          position: locPosition,
          map: map,
        });

        var iwContent = message,
          iwRemoveable = true;

        var infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
          removable: iwRemoveable,
        });

        infowindow.open(map, marker);
        map.setCenter(locPosition);
      }
    },

    displayMarker(markerPositions) {
      if (positions.length > 0) {
        this.markers = positions.map(
          (position) =>
            new kakao.maps.Marker({
              map: map,
              position,
            }),
        );

        //다시 중앙으로 오게하는 ?? 것
        const bounds = positions.reduce(
          (bounds, latlng) => bounds.extend(latlng),
          new kakao.maps.LatLngBounds(),
        );

        map.setBounds(bounds);
      }
    },
    flushMarker(markers = []) {
      markers.forEach((marker) => marker.setMap(null));
    },
    createMarker(positions = []) {
      this.markers = positions.map((ps) => {
        let marker = new kakao.maps.Marker({
          map: map,
          position: ps.latlng,
          title: ps.title,
        });
        return marker;
      });
    },
  },

  computed: {
    ...mapState(houseStore, ["aptList"]),
  },
  watch: {
    aptList: function (newValue) {
      this.positions = newValue.map((val) => ({
        title: val.apartmentName,
        latlng: new kakao.maps.LatLng(parseFloat(val.lat), parseFloat(val.lng)),
      }));
    },
    positions: function (newValue) {
      this.flushMarker(this.markers);
      this.createMarker(newValue);
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
#sidebar {
  max-width: 375px;
  width: 100%;
  height: 100vh;
}
#map {
  width: 100%;
  height: 100vh;
}

#btn-cur {
  position: absolute;
  z-index: 2;
}
</style>
