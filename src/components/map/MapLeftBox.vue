<template>
  <div id="map-left_box" style="">
    <menus-bar :mapDetail="mapDetail"></menus-bar>
    <b-button
      class="mt-2"
      v-b-tooltip.hover.right="'내위치'"
      variant="light"
      @click="whereAmI"
      ><i class="bx bx-current-location"></i>
    </b-button>
  </div>
</template>

<script>
import MenusBar from "./box/MenusBar";

export default {
  name: "MapLeftBox",
  props: {
    mapDetail: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    MenusBar,
  },
  methods: {
    whereAmI() {
      this.$emit("whereAmI");
    },
  },
};
</script>

<style scoped>
#map-left_box {
  position: absolute;
  z-index: 1001;
  top: 10px;
  left: 10px;
}
</style>
