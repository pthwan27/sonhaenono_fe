<template>
  <div class="center examplex">
    <vs-navbar center-collapsed v-model="active">
      <template #left>
        <vs-navbar-item :active="active == 'map'" id="map">
          map
        </vs-navbar-item>
        <vs-navbar-item :active="active == 'board'" id="board">
          board
        </vs-navbar-item>
      </template>
    </vs-navbar>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
