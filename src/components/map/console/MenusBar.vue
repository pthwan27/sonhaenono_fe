<template>
  <div id="menus-bar">
    <div class="menus-item">
      <img alt="favorite" :src="iconImg.FAVORITE_IMG" />
      <span>관심지역</span>
    </div>
    <div class="menus-item">
      <img alt="favorite" :src="iconImg.COFFEE_IMG" /><span>주변 커피점</span>
    </div>
    <div class="menus-item">
      <img alt="favorite" :src="iconImg.FOOD_IMG" />
      <span>주변 음식점</span>
    </div>
  </div>
</template>

<script>
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
};
</script>

<style>
#menus-bar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.menus-item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;

  cursor: pointer;
}
.menus-item:hover {
  background-color: salmon;
}

.menus-item + .menus-item {
  border-left: 1px solid;
}
.menus-item img {
  width: 48px;
  height: 48px;
}
.menus-item span {
  font-size: 0.5rem;
}
</style>
