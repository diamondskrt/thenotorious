<template>
  <v-dialog
    :value="dialog"
    :width="$vuetify.breakpoint.mdAndUp ? '600' : '100%'"
    persistent
  >
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>{{ text }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">
          {{ btnCancel }}
        </v-btn>
        <v-btn
          text
          class="primary--text"
          @click="$emit('accept')"
        >
          {{ btnAccept }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DialogItem',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    btnCancel: {
      type: String,
      default: 'Отмена',
    },
    btnAccept: {
      type: String,
      default: 'Да',
    },
  },
  computed: {
    dialog: {
      get(): boolean {
        return this.value;
      },
      set(value: boolean): void {
        this.$emit('input', value)
      }
    }
  },
})
</script>
