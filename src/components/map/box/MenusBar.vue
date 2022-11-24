<template>
  <div id="menus-bar">
    <!-- <div class="menus-item">
      <img alt="favorite" :src="iconImg.FAVORITE_IMG" />
      <span>관심지역</span>
    </div> -->
    <div
      :class="`menus-item ${coffeeOn ? 'clicked' : ''}`"
      @click="toggleCoffeeOn">
      <img alt="coffee-icon" :src="iconImg.COFFEE_IMG" /><span
        >주변 커피점</span
      >
    </div>
    <div :class="`menus-item ${foodsOn ? 'clicked' : ''}`" @click="toggleFoods">
      <img alt="food-icon" :src="iconImg.FOOD_IMG" />
      <span>주변 음식점</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import FAVORITE_IMG from "@/assets/map/favorite.png";
import COFFEE_IMG from "@/assets/map/coffee-cup.png";
import FOOD_IMG from "@/assets/map/diet.png";

export default {
  name: "MenusBar",
  data() {
    return {
      iconImg: {
        FAVORITE_IMG,
        COFFEE_IMG,
        FOOD_IMG,
      },
    };
  },
  computed: {
    ...mapState("house", ["coffeeOn", "foodsOn"]),
  },
  methods: {
    toggleFoods() {
      this.$store.commit("house/TOGGLE_FOODS_ON");
    },

    toggleCoffeeOn() {
      this.$store.commit("house/TOGGLE_COFFEE_ON");
    },
  },
};
</script>

<style>
#menus-bar {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: #fff;
  border-radius: 1rem;
  overflow: hidden;
}
.menus-item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0.5rem;

  cursor: pointer;
}
.menus-item:hover {
  background-color: salmon;
}
.clicked {
  background-color: salmon;
}
.menus-item + .menus-item {
  border-left: 1px solid;
}
.menus-item img {
  width: 24px;
  height: 24px;
}
.menus-item span {
  font-size: 0.5rem;
}
</style>
