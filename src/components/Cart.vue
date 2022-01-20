<template>
  <div class="cart">
    <v-app-bar
      absolute
      flat
      height="80"
      color="rgb(0 0 0 / 0)"
    >
      <div class="text-subtitle-1">Моя корзина</div>
      <v-spacer />
      <div class="close" @click="$emit('close')">
        <svg class="icon">
          <use xlink:href="@/assets/sprite.svg#close" />
        </svg>
      </div>
    </v-app-bar>
    <div v-if="abonements.length" class="cart-items px-4">
      <div v-if="step === 1">
        <transition-group name="list">
          <div
          v-for="abonement in abonements"
          :key="abonement.id"
        >
          <v-divider />
          <div class="item py-4">
            <div>{{ abonement.name }}</div>
            <div>{{ abonementPrice(abonement.total) }}</div>
            <div>
              <v-icon size="16" @click="decrementAbonement(abonement)">mdi-minus</v-icon>
              <span class="mx-2">{{ abonement.counter }}</span>
              <v-icon size="16" @click="incrementAbonement(abonement)">mdi-plus</v-icon>
            </div>
            <v-icon @click="removeAbonement(abonement)">
              mdi-delete
            </v-icon>
          </div>
          </div>
        </transition-group>
        <div class="text-subtitle-1 mb-4 mt-6">
          Всего: <span v-numflip="totalPrice" /> руб.
        </div>
        <v-btn color="primary" @click="step = 2">
          Оформить заказ
        </v-btn>
      </div>
      <template v-else>
        <div v-if="success" class="text-center">
          <svg class="icon">
            <use xlink:href="@/assets/sprite.svg#party" />
          </svg>
          <div class="text-subtitle-1 text-center my-6">
            Ваша заказ принят, ожидайте звонка менеджера!
          </div>
          <v-btn @click="$emit('close')">OK</v-btn>
        </div>
        <Form v-else @submit="sendOrder">
          <v-btn text class="mr-4" @click="step = 1">
            Назад
          </v-btn>
        </Form>
      </template>
    </div>
    <div v-else class="d-flex justify-center align-center text-center px-4 h-100">
      Ваша корзина пуста
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';
import Form from '@/components/Form.vue';
import {Abonement, AddOrder, Note} from '@/models';
import FirebaseService from '@/services/firebase.service';
import { sendMessageToTelegram } from '@/services/api/telegram.service';

export default Vue.extend({
  name: 'CartItem',
  components: { Form },
  data() {
    return {
      step: 1,
      success: false,
    }
  },
  computed: mapState({
    abonements: (state: any) => state.abonements,
    totalPrice() {
      return this.abonements?.reduce((acc: number, curr: Abonement) => acc + curr.total, 0);
    },
  }),
  methods: {
    ...mapMutations({
      incrementAbonement: 'incrementAbonement',
      decrementAbonement: 'decrementAbonement',
      removeAbonement: 'removeAbonement',
      setFBError: 'firebase/setFBError',
    }),

    abonementPrice(price: number): number {
      return price;
    },

    async sendOrder(data: Note): Promise<void> {
      try {
        await FirebaseService.add<AddOrder>('orders', {
          userName: data.name,
          userPhone: data.phone,
          order: this.abonements,
          processed: false,
        });
      } catch (error) {
        this.setFBError(error.code);
      }

      await sendMessageToTelegram('Пришла заявка на абонемент')

      this.success = true;
    },
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/colors';

.cart {
  .close {
    cursor: pointer;
    svg {
      width: 15px;
      height: 15px;
      fill: $light;
    }
  }
  .cart-items {
    padding-top: 80px;
    .item {
      display: grid;
      grid-template-columns: 3fr 1fr 1fr 1fr;
      align-items: center;
      @media screen and (max-width: 600px) {
        grid-template-columns: 1fr;
        justify-items: center;
        grid-row-gap: 15px;
      }
      .v-icon {
        cursor: pointer;
        &:after {
          opacity: 0;
        }
      }
    }
    .buttons {
      span {
        cursor: pointer;
      }
    }
  }
}
</style>
