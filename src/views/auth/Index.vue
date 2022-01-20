<template>
  <default-layout>
    <router-view />
  </default-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

export default Vue.extend({
  name: 'AuthIndexPage',
  components: { DefaultLayout }
})
</script>
