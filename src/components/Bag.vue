<template>
  <transition name="slide-fade">
    <div
      v-if="abonements.length"
      class="bag pa-4"
    >
      <div class="item">
        <svg class="icon">
          <use xlink:href="@/assets/sprite.svg#bag" />
        </svg>
        <v-badge
          color="primary"
          :content="abonementCounter"
          size="60"
        />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import { Abonement } from '@/models';

export default Vue.extend({
  name: 'BagItem',
  computed: mapState({
    abonements: (state: any) => state.abonements,
    abonementCounter() {
      return this.abonements?.reduce((acc: number, curr: Abonement) => acc + curr.counter, 0)
    },
  }),
})
</script>

<style lang="scss" scoped>
@import '../styles/colors';

.bag {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  cursor: pointer;
  .item {
    position: relative;
    width: 60px;
    height: 60px;
    svg {
      width: 100%;
      height: 100%;
      fill: $light;
    }
    .v-badge {
      position: absolute;
      top: calc(50% + 18px);
      left: calc(50% - 10px);
      transform: translate(-50%);
    }
  }
}
</style>
