<template>
  <v-bottom-sheet :value="sheet" persistent>
    <v-sheet
      class="d-flex flex-column justify-center align-center"
      height="200px"
    >
      <div v-if="message" :class="success ? 'green--text text--lighten-2' : 'red--text'">
        {{ message }}
      </div>
      <div class="buttons mt-4">
        <slot />
        <v-btn
          @click="$emit('accept')"
        >
          {{ btnText }}
        </v-btn>
      </div>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BottomSheet',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    success: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      required: true,
    },
    btnText: {
      type: String,
      default: 'OK',
    },
  },
  computed: {
    sheet() {
      return this.value;
    }
  },
})
</script>
