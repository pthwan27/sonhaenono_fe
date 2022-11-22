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
import { mapState, mapGetters, mapActions } from "vuex";
import {
  KAKAO_MAP_API_KEY,
  MAP_INITIAL_SPOT,
  MAP_INITIAL_LEVEL,
  _BUILD_TYPE,
} from "@/common/constant";
import { getMapInfo } from "@/common/map";
import { getMySpot } from "@/common/navigator";

import APT_IMG from "@/assets/map/apartment.svg";
import APT_MY_HOUSE from "@/assets/map/house.svg";

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
    ...mapState("house", ["aptList"]),
    ...mapGetters("house", ["getSelectedHouseInfo"]),
  },
  watch: {
    aptList: function (newValue) {
      this.positions = newValue.map((val) => ({
        title: val.apartmentName,
        pnu: val.pnu,
        latlng: new kakao.maps.LatLng(parseFloat(val.lat), parseFloat(val.lng)),
      }));
    },
    mapDetail: {
      deep: true,
      handler(value) {
        this.getMarkerList(value);
      },
    },
    markers: function (newValue, oldValue) {
      this.flushMarker(oldValue);
      this.showMarker(newValue);
    },
    positions: function (newValue) {
      this.createMarker(newValue);
    },
    me: function (newValue) {
      if (!newValue) {
        return;
      }
      this.gotoMySpot(newValue);
    },
  },
  methods: {
    ...mapActions("house", ["getMarkerList", "getHouseByPnu"]),
    openNotification({ message, color = "primary" }) {
      this.$vs.notification({
        flat: true,
        position: "bottom-right",
        text: message,
        color,
      });
    },
    whereAmI: async function () {
      try {
        this.openNotification({
          message: "내 위치를 가져오는 중...",
          color: "primary",
        });
        let where = await getMySpot();
        this.me = where;
      } catch (err) {
        this.openNotification({
          message:
            "위치를 가져오는 도중 문제가 발생했습니다.<br/>권한을 확인해주세요.",
          color: "danger",
        });
      }
    },
    gotoMySpot({ lat, lng }) {
      let latLng = new kakao.maps.LatLng(lat, lng);
      // 지도 중심을 이동 시킵니다
      map.setCenter(latLng);

      let imageSrc = APT_MY_HOUSE, // 마커이미지의 주소입니다
        imageSize = new kakao.maps.Size(40, 40), // 마커이미지의 크기입니다
        imageOption = { offset: new kakao.maps.Point(20, 20) };
      let markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption,
      );
      let marker = new kakao.maps.Marker({
        position: latLng,
        image: markerImage, // 마커이미지 설정
      });
      this.showMarker([marker]);
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

      this.updateMapInfo();
      // 지도가 이동, 확대, 축소로 인해 중심좌표가 변경될 때
      kakao.maps.event.addListener(map, "bounds_changed", this.updateMapInfo);
    },
    flushMarker(markers = []) {
      markers.forEach((marker) => marker.setMap(null));
    },
    showMarker(markers = []) {
      markers.forEach((marker) => marker.setMap(map));
    },
    createMarkerClickEvent(marker, event) {
      kakao.maps.event.addListener(marker, "click", event);
    },
    createMarker(positions = [], image) {
      let imageSrc = APT_IMG;
      let imageSize = new kakao.maps.Size(40, 40);
      let imageOption = { offset: new kakao.maps.Point(20, 40) };

      let markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption,
      );

      this.markers = positions.map((ps) => {
        let marker = new kakao.maps.Marker({
          position: ps.latlng,
          image: markerImage,
        });

        this.createMarkerClickEvent(marker, this.clickEventAPT(ps));
        return marker;
      });
    },
    clickEventAPT(apt) {
      return () => {
        this.getHouseByPnu(apt.pnu);
      };
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
