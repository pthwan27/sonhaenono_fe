<template>
  <div id="sideview">
    <div id="router-box">
      <slot name="routerBoxContainer"></slot>
    </div>
    <div id="router-view">
      <slot name="routerViewContainer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideView",
};
</script>

<style>
#sideview {
  width: 100%;
  height: 100vh;

  padding: 1rem;
  position: relative;

  display: flex;
  flex-direction: column;
}

#router-box {
  display: flex;
  margin-bottom: 1rem;
}
#router-view {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
