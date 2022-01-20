<template>
  <v-overlay
    :value="overlay"
    @click.native="overlay = false"
  >
    <v-container fluid class="h-100">
      <v-row justify="center" align="center" class="full-height">
        <div class="slot">
          <div class="close">
            <svg class="icon">
              <use xlink:href="@/assets/sprite.svg#close" />
            </svg>
          </div>
          <slot />
        </div>
      </v-row>
    </v-container>
  </v-overlay>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'OverlayItem',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    overlay: {
      get(): boolean {
        return this.value;
      },
      set(value: boolean): void {
        this.$emit('input', value);
      },
    },
  },
})
</script>

<style lang="scss" scoped>
@import '../styles/colors';

.slot {
  position: relative;
  .close {
    position: absolute;
    top: -40px;
    right: 0;
    cursor: pointer;
    svg {
      width: 20px;
      height: 20px;
      fill: $light;
    }
  }
}
</style>
