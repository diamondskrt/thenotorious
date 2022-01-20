<template>
  <v-app-bar
    fixed
    flat
    hide-on-scroll
    height="80"
    color="rgb(0 0 0 / 0)"
  >
    <router-link to="/">
      <div class="logo">
        <img src="@/assets/logo.png" alt="" class="full-height">
      </div>
    </router-link>
    <v-spacer />
    <template v-if="$vuetify.breakpoint.mdAndUp">
      <template v-if="!$route.path.includes('admin')">
        <div
          v-for="item in menuItems"
          :key="item.name"
          class="text-subtitle-1 pa-2"
          v-scrollTo="item.scrollTo"
        >
          <div class="menu-item">{{ item.name }}</div>
        </div>
      </template>
      <v-spacer />
      <Panel />
    </template>
    <template v-else>
      <Panel v-if="$route.path.includes('admin')" />
      <template v-else>
        <v-btn text @click="drawer = !drawer">
          <div class="burger">
            <div class="line-top" />
            <div class="line-bottom" />
          </div>
        </v-btn>
        <v-navigation-drawer
          v-model="drawer"
          absolute
          right
          floating
          height="100vh"
          width="70%"
        >
          <v-row align="center" justify="center" class="h-100">
            <div class="text-center">
              <Panel class="mb-6" />
              <div
                v-for="item in menuItems"
                :key="item.name"
                class="text-subtitle-1 pa-2"
                v-scrollTo="item.scrollTo"
                @click="drawer = false"
              >
                {{ item.name }}
              </div>
            </div>
          </v-row>
        </v-navigation-drawer>
      </template>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import { menuItems } from '@/constants/array-items.const'
import Panel from '@/components/Panel.vue'

export default Vue.extend({
  name: 'HeaderItem',
  components: {
    Panel,
  },
  data() {
    return {
      menuItems,
      drawer: false,
    }
  },
});
</script>

<style lang="scss" scoped>
@import '../styles/colors';

.v-app-bar--is-scrolled {
  background: $dark !important;
}

.v-app-bar {
  .logo {
    height: 60px;
  }

  .menu-item {
    cursor: pointer;
  }

  .burger {
    .line-top, .line-bottom {
      width: 24px;
      height: 2px;
      background: $light;
    }
    .line-top {
      margin-bottom: 6px;
    }
    .line-bottom {
      margin-top: 6px;
    }
  }
}
</style>
