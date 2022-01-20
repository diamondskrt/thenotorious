<template>
  <main-layout>
    <section class="main d-flex justify-center align-center">
      <video
        loop="loop"
        autoplay="autoplay"
        muted="muted"
        poster
      >
        <source src="@/assets/media/breaking.mp4" type="video/mp4">
      </video>
      <div class="item text-center pa-2">
        <div class="text-h3 mb-4">
          The Notorious Flava
        </div>
        <div class="text-h6">
          Студия танцев
        </div>
      </div>
    </section>
    <div class="bg-gradient d-flex flex-column align-center pa-4">
      <div class="text-subtitle-1 font-weight-regular mb-2">
        Скидка 15% на первый абонемент *
      </div>
      <v-btn @click="onOpenNote()">Получить</v-btn>
    </div>

    <section class="about px-2 px-sm-8 py-12">
      <div class="text-h4 text-center mb-8">
        Танцуй,
        <span>вдохновляй</span>,
        создавай
      </div>
      <p>
        Наша программа обучения создана для разных возрастных групп, с учетом их
        индивидуального развития. Мы регулярно организовываем мастер-классы от мировых звезд,
        фестивали, кэмпы и многое другое, а также и сами принимаем
        участие во всевозможных мероприятиях. Наши залы оборудованы специальным покрытием,
        системами контроля температуры, бесплатным wifi -
        созданы все условия для вашего комфорта.
      </p>
      <p class="text-center">Выберите подходящее направление:</p>
      <v-container fluid>
        <v-row>
          <v-col
            v-for="item in directionItems"
            :key="item.title"
            cols="12"
            md="4"
          >
            <v-card class="full-height">
              <v-card-title>
                {{ item.title }}
              </v-card-title>
              <v-card-subtitle class="primary--text">
                Возрастная категория: {{ item.ageCategory }}
              </v-card-subtitle>
              <v-card-text class="pb-12">
                {{ item.desc }}
              </v-card-text>
              <v-card-actions>
                <v-btn
                  text
                  small
                  color="primary"
                  @click="onOpenNote(item.title)"
                >
                  Записаться
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="abonements px-2 px-sm-8 py-12">
      <div class="text-h4 text-center mb-8">
        Абонементы
      </div>
      <div class="d-flex">
        <div class="box"></div>
        <div class="abonement-items">
          <carousel
            :paginationEnabled="false"
            :perPage="1"
            :perPageCustom="[[600, 2], [1264, 3]]"
          >
            <slide>
              <div class="item d-flex justify-center align-center">
                <div class="desc text-center">
                  <div class="text-subtitle-1 font-weight-regular px-8">Пробное занятие</div>
                  <div class="my-8">
                    <div class="text-h6 text-decoration-line-through font-weight-regular">400 ₽</div>
                    <div class="font-weight-regular">
                      <div class="bg-gradient rounded d-inline-flex align-center pa-2">
                        <small class="text-uppercase px-2">Бесплатно !</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </slide>
            <slide
              v-for="item in abonementItems"
              :key="item.id"
              class="slide"
            >
              <div class="item d-flex justify-center align-center">
                <div class="desc text-center">
                  <div class="text-subtitle-1 font-weight-regular px-8">{{ item.name }}</div>
                  <div class="my-6">
                    <div class="text-h6 font-weight-regular">{{ setSeparator(item.price) }} ₽</div>
                    <div v-if="showPrice(item.price)" class="font-weight-regular">
                      <div class="bg-gradient rounded d-inline-flex align-center pa-2">
                        <span class="px-2 bg-light black--text rounded">{{ setSeparator(getPerсent(item.price)) }} ₽</span>
                        <small class="ml-2">В первый месяц</small>
                      </div>
                    </div>
                  </div>
                  <v-btn class="rounded" color="primary" @click="addAbonement(item)">
                    В корзину
                  </v-btn>
                </div>
              </div>
            </slide>
          </carousel>
        </div>
      </div>
    </section>

    <section class="shedule px-2 px-sm-8 py-12">
      <div class="text-h4 text-center mb-8">
        Расписание
      </div>
      <v-text-field
        v-model="searchDirection"
        append-icon="mdi-magnify"
        label="Поиск"
      />
      <v-data-table
        :headers="sheduleTable.headers"
        :items="sheduleTable.days"
        :search="searchDirection"
        disable-sort
        hide-default-footer
        mobile-breakpoint="0"
      >
        <template v-slot:[`item.mon`]="{ item }">
          <v-chip v-if="item.mon" color="primary">
            {{ item.mon }}
          </v-chip>
        </template>
        <template v-slot:[`item.wed`]="{ item }">
          <v-chip v-if="item.wed" color="primary">
            {{ item.wed }}
          </v-chip>
        </template>
        <template v-slot:[`item.fri`]="{ item }">
          <v-chip v-if="item.fri" color="primary">
            {{ item.fri }}
          </v-chip>
        </template>
      </v-data-table>
    </section>

    <section class="trainers px-2 px-sm-8 py-12">
      <div class="text-h4 text-center mb-8">
        Тренерский состав
      </div>
      <v-container fluid>
        <v-row>
          <v-col
            v-for="item in trainerItems"
            :key="item.name"
            cols="12"
            md="6"
          >
            <v-card
              class="d-flex flex-column flex-sm-row px-md-6 px-4 py-md-12 py-4 full-height"
            >
              <div class="avatar">
                <v-avatar rounded size="120">
                  <v-img
                    :lazy-src="require(`@/assets/${item.photo}`)"
                    :src="require(`@/assets/${item.photo}`)"
                  />
                </v-avatar>
              </div>
              <div class="ml-0 ml-sm-4 mt-4 mt-sm-0">
                <v-list-item-title class="headline">
                  {{ item.name }}
                </v-list-item-title>
                <p>
                  {{ item.directions }}
                </p>
                <p class="mb-0">
                  {{ item.desc }}
                </p>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="contacts px-2 px-sm-8 py-12">
      <div class="text-h4 text-center mb-8">
        Контакты
      </div>
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="7">
            <v-img
              :height="$vuetify.breakpoint.mdAndUp ? '450px' : '300px'"
              lazy-src="@/assets/hall.jpg"
              src="@/assets/hall.jpg"
            />
          </v-col>
          <v-col>
            <div
              class="desc d-flex flex-column align-center justify-center full-height"
            >
              <div class="text-h6 mb-4 font-weight-medium">
                Зал в самом центре города
              </div>
              <p>
                Телефон:
                <a href="tel:+79373323635" target="blank">
                  +7 (937) 332-36-35
                </a>
              </p>
              <p class="mb-0">
                Адрес: ул. Мажита Гафури, 27
              </p>
              <p>
                <a href="https://clck.ru/U6TG9" target="blank">
                  смотреть на карте
                </a>
              </p>
              <v-btn @click="onOpenNote()">
                Записаться
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="gallery px-2 px-sm-8 py-12">
      <div class="text-h4 text-center mb-8">
        Медиа
      </div>
      <v-container fluid>
        <v-row>
          <v-col sm="6" cols="12">
            <div
              class="video d-flex justify-center align-center full-height"
            >
              <div class="item" @click="overlay = true">
                <v-icon color="primary" size="80">
                  mdi-play-outline
                </v-icon>
              </div>
              <Overlay v-model="overlay">
                <iframe
                  src="https://player.vimeo.com/video/676566536?autoplay=1&amp;loop=1&amp;autopause=0"
                  frameborder="0"
                  allow="autoplay;fullscreen"
                  allowfullscreen
                  samesite
                />
              </Overlay>>
            </div>
          </v-col>
          <v-col sm="6" cols="12">
            <div class="gallery-items">
              <div class="soundcloud">
                <iframe
                  width="100%"
                  scrolling="no"
                  frameborder="no"
                  allow="autoplay"
                  samesite
                  src="https://clck.ru/U6Tu6"
                  class="full-height"
                />
              </div>
              <div class="instagram item-1"></div>
              <div class="instagram item-2"></div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <aside>
      <Note v-model="openNote" :direction="direction"/>
      <Bag @click.native="drawer = true" />
      <v-navigation-drawer
        v-model="drawer"
        fixed
        right
        floating
        temporary
        :width="$vuetify.breakpoint.mdAndUp ? '35%' : '100%'"
      >
        <Cart @close="closeDrawer" />
      </v-navigation-drawer>
    </aside>
  </main-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapMutations, mapState } from 'vuex';
import MainLayout from '@/layouts/MainLayout.vue';
import Note from '@/components/Note.vue';
import Bag from '@/components/Bag.vue';
import Cart from '@/components/Cart.vue';
import {
  directionItems,
  abonementItems,
  trainerItems,
  sheduleTable
} from '@/constants/array-items.const';
import Overlay from '@/components/Overlay.vue';

export default Vue.extend({
  name: 'HomePage',
  components: {
    Overlay,
    MainLayout,
    Note,
    Bag,
    Cart
  },
  data() {
    return {
      directionItems,
      abonementItems,
      searchDirection: '',
      sheduleTable,
      trainerItems,
      direction: '',
      openNote: false,
      overlay: false,
      drawer: false,
    }
  },
  computed: {
    ...mapState({
      abonements: (state: any) => state.abonements
    }),
  },
  methods: {
    ...mapMutations({
      addAbonement: 'addAbonement',
      clearAbonements: 'clearAbonements',
    }),

    onOpenNote(direction?: string): void {
      direction ? (this.direction = direction) : this.direction = 'Танцы';
      this.openNote = true;
    },

    closeDrawer() {
      this.drawer = false
      if (this.abonements.length) {
        this.clearAbonements();
      }
    },

    showPrice(price: number) {
      return price > 2000
    },

    setSeparator(price: number) {
      return price?.toLocaleString()
    },

    getPerсent(price: number) {
      return price - (price * 15 / 100) || 0
    }
  },
});
</script>

<style lang="scss" scoped>
@import '../styles/colors';

.main {
  position: relative;
  height: 100vh;
  overflow: hidden;
  background: url('../assets/thelegits.jpg') center / cover;
  &:after {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.2);
  }
  .item {
    position: absolute;
    z-index: 1;
  }
}

.about {
  span {
    color: $primary;
  }
  .v-card {
    .v-card__actions {
      position: absolute;
      bottom: 0;
    }
  }
}

.abonements {
  position: relative;
  .box {
    width: 35%;
    background: url('../assets/dragon.jpg') center / cover;
    box-shadow: 7px 0 7px 0px rgba(255, 255, 255, 0.2);
    z-index: 1;
    @media screen and (max-width: 600px) {
      display: none;
    }
  }
  .abonement-items {
    width: 70%;
    margin-left: -2%;
    cursor: grab;
    @media screen and (max-width: 600px) {
      width: 100%;
      margin-left: 0;
    }
    .item {
      position: relative;
      height: 500px;
      margin: 0 5px;
      background: url('../assets/abonements.jpg') center / cover;
      user-select: none;
      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: $dark;
        opacity: .6;
      }
      .desc {
        z-index: 1;
      }
    }
  }
}

.gallery {
  .video {
    background: url('../assets/hongten.jpg') center / cover;
    cursor: pointer;
    @media screen and (max-width: 600px) {
      height: 200px;
    }
    iframe {
      width: calc(1920px / 2);
      height: calc(1080px / 2);
      @media screen and (max-width: 680px) {
        width: calc(1920px / 4);
        height: calc(1080px / 4);
      }
      @media screen and (max-width: 480px) {
        width: calc(1920px / 6);
        height: calc(1080px / 6);
      }
    }
  }
  .gallery-items {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 200px 300px;
    grid-template-areas: 'A A' 'B C';
    grid-gap: 10px;
    @media screen and (max-width: 600px) {
      grid-template-columns: 1fr;
      grid-template-areas: 'A' 'B' 'C';
      grid-template-rows: 200px 200px 200px;
      grid-gap: 20px;
    }
    .soundcloud {
      grid-area: A;
    }
    .instagram {
      &.item-1 {
        background: url('../assets/kinjaz.jpg') center / cover;
        grid-area: B;
      }
      &.item-2 {
        background: url('../assets/dragon.jpg') center / cover;
        grid-area: C;
      }
    }
  }
}
</style>
