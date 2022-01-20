<template>
  <v-container class="h-100">
    <v-app-bar
      absolute
      flat
      height="80"
      color="rgb(0 0 0 / 0)"
    >
      <router-link to="/">
        <div class="logo">
          <img src="@/assets/logo.png" alt="" class="full-height">
        </div>
      </router-link>
    </v-app-bar>
    <v-row justify="center" align="center" class="full-height">
      <slot />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DefaultLayout',
})
</script>

<style lang="scss" scoped>
.v-app-bar {
  .logo {
    height: 60px;
  }
}
</style>

