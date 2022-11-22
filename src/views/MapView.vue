<template>
  <b-container fluid class="m-0 p-0 d-flex">
    <div id="sidebar"></div>
    <div id="map-wrapper">
      <div
        id="map-left_box"
        style="position: absolute; z-index: 1001; top: 10px; left: 10px">
        <b-button
          v-b-tooltip.hover.right="'내위치'"
          variant="light"
          @click="whereAmI"
          ><i class="bx bx-current-location"></i>
        </b-button>
      </div>
      <div id="map"></div>
    </div>
  </b-container>
</template>

<script>
import { debounce } from "lodash";
import { mapState } from "vuex";
import { mapActions } from "vuex";
import {
  KAKAO_MAP_API_KEY,
  MAP_INITIAL_SPOT,
  MAP_INITIAL_LEVEL,
} from "@/common/constant";
import { getMapInfo } from "@/common/map";
import { getMySpot } from "@/common/navigator";
window.getMySpot = getMySpot;

let map = null;

export default {
  name: "MapView",
  data() {
    return {
      markers: [],
      positions: [],

      //남서쪽 북동쪽
      // 지도 위치 움직일 때 값이 저장되도록 하기 위해
      mapDetail: {
        level: 0,
        cLat: 0,
        cLng: 0,
        swLat: 0,
        swLng: 0,
        neLat: 0,
        neLng: 0,
      },
      me: null,
    };
  },
  computed: {
    ...mapState("houseStore", ["aptList"]),
  },
  watch: {
    aptList: function (newValue) {
      this.positions = newValue.map((val) => ({
        title: val.apartmentName,
        latlng: new kakao.maps.LatLng(parseFloat(val.lat), parseFloat(val.lng)),
      }));
    },
    mapDetail: {
      deep: true,
      handler(value) {
        this.getMarkerList(value);
      },
    },
    positions: function (newValue) {
      this.flushMarker(this.markers);
      this.createMarker(newValue);
    },
    me: function ({ lat, lng }) {
      var moveLatLon = new kakao.maps.LatLng(lat, lng);
      // 지도 중심을 이동 시킵니다
      map.setCenter(moveLatLon);
    },
  },
  methods: {
    ...mapActions("houseStore", ["getMarkerList"]),
    whereAmI: async function () {
      let where = await getMySpot();
      this.me = where;
    },
    updateMapInfo: debounce(function () {
      this.mapDetail = getMapInfo(map);
    }, 500),
    initMap() {
      var mapContainer = document.getElementById("map"),
        mapOption = {
          center: new kakao.maps.LatLng(
            MAP_INITIAL_SPOT[0],
            MAP_INITIAL_SPOT[1],
          ), // 지도의 중심좌표
          level: MAP_INITIAL_LEVEL, // 지도의 확대 레벨
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
      kakao.maps.event.addListener(map, "bounds_changed", this.updateMapInfo);
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
i {
  font-size: 16px;
}
#sidebar {
  max-width: 375px;
  width: 100%;
  height: 100vh;
}
#map {
  width: 100%;
  height: 100vh;
}

#map-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 100%;
}
</style>
