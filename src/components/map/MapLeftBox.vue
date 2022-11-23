<template>
  <div id="map-left_box" style="">
    <b-button
      v-b-tooltip.hover.right="'내위치'"
      variant="light"
      @click="whereAmI"
      ><i class="bx bx-current-location"></i>
    </b-button>
  </div>
</template>

<script>
export default {
  name: "MapLeftBox",
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
