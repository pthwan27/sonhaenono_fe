<template>
  <div class="center examplex">
    <vs-navbar center-collapsed v-model="active">
      <template #left>
        <router-link :to="{ name: 'main' }">
          <vs-navbar-item :active="active == 'map'" id="map">
            map
          </vs-navbar-item>
        </router-link>

        <router-link :to="{ name: 'board' }">
          <vs-navbar-item :active="active == 'board'" id="board">
            board
          </vs-navbar-item>
        </router-link>
      </template>
    </vs-navbar>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
