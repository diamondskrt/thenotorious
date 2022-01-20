<template>
  <v-dialog
    :value="showDialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card color="d-flex flex-column justify-center align-center black">
      <div class="close" @click="showDialog = false">
        <svg class="icon">
          <use xlink:href="@/assets/sprite.svg#close" />
        </svg>
      </div>
      <div class="text-h4 text-center mb-2">
        {{ direction }}
      </div>
      <div class="text-subtitle-1 text-center mb-12">
        Оставьте свою заявку и мы свяжемся с вами
      </div>
      <div v-if="success" class="text-center">
        <svg class="icon">
          <use xlink:href="@/assets/sprite.svg#party" />
        </svg>
        <div class="text-subtitle-1 text-center my-6">
          Ваша заявка успешно отправлена!
        </div>
        <v-btn @click="showDialog = false">OK</v-btn>
      </div>
      <Form v-else @submit="sendNote" />
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapMutations } from 'vuex';
import Form from '@/components/Form.vue';
import { Note, AddNote } from '@/models';
import FirebaseService from '@/services/firebase.service';
import { sendMessageToTelegram } from '@/services/api/telegram.service';

export default Vue.extend({
  name: 'NoteItem',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    direction: {
      type: String,
      required: true,
    },
  },
  components: {
    Form,
  },
  data() {
    return {
      success: false,
    }
  },
  computed: {
    showDialog: {
      get(): boolean {
        return this.value;
      },
      set(value: boolean): void {
        this.$emit('input', value);
      },
    },
  },
  watch: {
    showDialog(value) {
      if (!value) {
        this.success && (this.success = false);
      }
    }
  },
  methods: {
    ...mapMutations({
      setFBError: 'firebase/setFBError',
    }),
    async sendNote(data: Note): Promise<void> {
      try {
        await FirebaseService.add<AddNote>('notes', {
          userName: data.name,
          userPhone: data.phone,
          direction: this.direction,
          processed: false,
        });
      } catch (error) {
        this.setFBError(error.code);
      }

      await sendMessageToTelegram(`
        У вас новая запись
        %0A
        %0AИмя клиента: ${data.name}
        %0AТелефон: %2B7${data.phone}
        %0AВыбранное направление: ${this.direction}
      `)

      this.success = true;
    }
  },
})
</script>

<style lang="scss" scoped>
@import '../styles/colors';

.close {
  position: absolute;
  top: 0;
  right: 0;
  padding: 20px;
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
    fill: $light;
  }
}
</style>
