<template>
  <div id="sidebar">
    <!-- 선택한 곳이 있을 경우 -->
    <div v-if="getSelectedHouseInfo.selectPnu && getSelectedHouseInfo.simple">
      <detail-header
        :aptName="getSelectedHouseInfo.simple.apartmentName"
        :address="`${getSelectedHouseInfo.simple.dong} ${getSelectedHouseInfo.simple.jibun}`" />
      <detail-road-view
        :lat="getSelectedHouseInfo.simple.lat"
        :lng="getSelectedHouseInfo.simple.lng"></detail-road-view>
      <detail-chart :deal="getSelectedHouseInfo.deal" />
    </div>
    <!-- 선택한 곳이 없을 경우 -->
    <div v-else></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DetailHeader from "@/components/map/detail/DeatilHeader";
import DetailChart from "@/components/map/detail/DetailChart";
import DetailRoadView from "./detail/DetailRoadView";

export default {
  name: "MapSideBar",
  components: { DetailHeader, DetailChart, DetailRoadView },
  data() {
    return {
      selected: false,
    };
  },
  computed: {
    ...mapGetters("house", ["getSelectedHouseInfo"]),
  },
  watch: {},
};
</script>

<style scoped>
#sidebar {
  overflow-y: scroll;
  -ms-overflow-style: none;
}
#sidebar::-webkit-scrollbar {
  display: none;
}
</style>
