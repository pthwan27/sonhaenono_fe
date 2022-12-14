<template>
  <b-container fluid class="h-100 w-100 m-0 p-0 d-flex">
    <map-side-bar></map-side-bar>
    <div id="map-wrapper">
      <map-left-box @whereAmI="whereAmI" :mapDetail="mapDetail"></map-left-box>
      <div id="map"></div>
    </div>
  </b-container>
</template>

<script>
import { debounce } from "lodash";
import { mapState, mapActions } from "vuex";
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
import COFFEE_IMG from "@/assets/map/coffee-spot.svg";
import DISH_IMG from "@/assets/map/dish.svg";

import MapSideBar from "@/components/map/MapSideBar.vue";
import MapLeftBox from "@/components/map/MapLeftBox.vue";

let map = null;
let clusterer = null;

export default {
  name: "MapView",
  components: { MapSideBar, MapLeftBox },
  data() {
    return {
      markers: [],
      positions: [],
      coffeeMarkers: [],
      coffeePositions: [],
      foodsMarkers: [],
      foodsPositions: [],
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
    ...mapState("house", [
      "aptList",
      "selected_apt",
      "near_coffee",
      "near_foods",
      "coffeeOn",
      "foodsOn",
    ]),
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
    selected_apt: function (newValue) {
      if (!newValue) {
        return;
      }
      let latLng = this.createKakaoLatLng(newValue);
      this.moveCenter(latLng);
    },
    foodsOn: function (value) {
      if (value) {
        this.searchNearFoods(this.mapDetail);
      }
    },
    coffeeOn: function (value) {
      if (value) {
        this.searchNearCoffee(this.mapDetail);
      }
    },
    near_coffee: function (newValue) {
      this.coffeePositions = newValue.map((val) => ({
        title: val.bizesNm,
        pnu: val.pnu,
        latlng: new kakao.maps.LatLng(parseFloat(val.lat), parseFloat(val.lng)),
      }));
    },
    coffeePositions: function (newValue) {
      this.createCoffeeMarker(newValue);
    },
    coffeeMarkers: function (newValue, oldValue) {
      this.flushMarker(oldValue);
      this.showCommercialMarker(newValue);
    },
    near_foods: function (newValue) {
      this.foodsPositions = newValue.map((val) => ({
        title: val.bizesNm,
        pnu: val.pnu,
        latlng: new kakao.maps.LatLng(parseFloat(val.lat), parseFloat(val.lng)),
      }));
    },
    foodsPositions: function (newValue) {
      this.createFoodsMarker(newValue);
    },
    foodsMarkers: function (newValue, oldValue) {
      this.flushMarker(oldValue);
      this.showCommercialMarker(newValue);
    },
  },
  methods: {
    ...mapActions("house", [
      "getMarkerList",
      "selectHouse",
      "searchNearCoffee",
      "searchNearFoods",
    ]),

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
    createKakaoLatLng({ lat, lng }) {
      let latLng = new kakao.maps.LatLng(lat, lng);
      return latLng;
    },
    moveCenter(latLng) {
      map.setCenter(latLng);
    },
    gotoMySpot(spot) {
      let latLng = this.createKakaoLatLng(spot);
      // 지도 중심을 이동 시킵니다
      this.moveCenter(latLng);

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
    showCommercialMarker(markers = []) {
      if (this.mapDetail.level < 5) {
        markers.forEach((marker) => marker.setMap(map));
      } else {
        this.flushMarker(markers);
      }
    },
    showMarker(markers = []) {
      //  if (this.mapDetail.level >= 5) {
      if (clusterer) {
        clusterer.clear();
      } else {
        clusterer = new kakao.maps.MarkerClusterer({
          map,
          averageCenter: true,
          minLevel: this.mapDetail.level,
        });
      }
      clusterer.addMarkers(markers);
      return;
      //  }
      // markers.forEach((marker) => marker.setMap(map));
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
    createCoffeeMarker(positions = []) {
      let imageSrc = COFFEE_IMG;
      let imageSize = new kakao.maps.Size(30, 30);
      let imageOption = { offset: new kakao.maps.Point(15, 20) };

      let markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption,
      );

      this.coffeeMarkers = positions.map((ps) => {
        let marker = new kakao.maps.Marker({
          map,
          position: ps.latlng,
          image: markerImage,
        });
        return marker;
      });
    },
    createFoodsMarker(positions = []) {
      let imageSrc = DISH_IMG;
      let imageSize = new kakao.maps.Size(30, 30);
      let imageOption = { offset: new kakao.maps.Point(15, 20) };

      let markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption,
      );

      this.foodsMarkers = positions.map((ps) => {
        let marker = new kakao.maps.Marker({
          map,
          position: ps.latlng,
          image: markerImage,
        });
        return marker;
      });
    },
    clickEventAPT(apt) {
      return () => {
        this.selectHouse(apt.pnu);
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

      script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${KAKAO_MAP_API_KEY}&libraries=clusterer`;

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
  position: relative;
  max-width: 375px;
  width: 100%;
  height: 100%;
}
#map {
  position: relative;
  width: 100%;
  height: 100%;
}

#map-wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  overflow: hidden;
}
</style>
