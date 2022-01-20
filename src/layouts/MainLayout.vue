<template>
  <section>
    <Header />
    <v-main>
      <slot />
    </v-main>
    <Footer />
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default Vue.extend({
  name: 'MainLayout',
  components: {
    Header,
    Footer,
  },
})
</script>
