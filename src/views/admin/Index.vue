<template>
  <main-layout>
    <router-view />
  </main-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import MainLayout from '@/layouts/MainLayout.vue';

export default Vue.extend({
  name: 'AdminIndexPage',
  components: { MainLayout }
})
</script>
