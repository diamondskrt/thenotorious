<template>
  <div>
    <aside v-if="loader" class="d-flex justify-center align-center h-100">
      <div class="progress">
        <div class="text-subtitle-1 text-center mb-8">
          Идет загрузка данных...
        </div>
        <v-progress-linear
          indeterminate
          color="primary"
        ></v-progress-linear>
      </div>
    </aside>
    <template v-else>
      <section class="main d-flex justify-center align-center">
        <div class="item text-center pa-2">
          <div class="text-h3 mb-4">
            The Notorious Flava
          </div>
          <div class="text-h6">
            Студия танцев
          </div>
        </div>
      </section>
      <section class="notes px-2 px-sm-8 py-12">
        <div class="text-subtitle-1 text-center mb-8">
          Записи по направлениям
        </div>
        <v-expansion-panels v-if="notes.length">
          <v-expansion-panel
            v-for="(note, i) in notes"
            :key="i"
          >
            <v-expansion-panel-header>
              <div>
                <v-badge :color="note.info.processed ? 'success' : 'error'" dot inline left>
                  <div class="ml-2">{{ note.info.userName }}</div>
                </v-badge>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <p>Телефон: +7{{ note.info.userPhone }}</p>
              <p>Выбранное направление: {{ note.info.direction }}</p>
              <v-divider />
              <div class="buttons mt-6">
                <v-btn
                  v-if="!note.info.processed"
                  text
                  small
                  class="mr-4"
                  @click="onComplete('notes', note.id)"
                >
                  Завершить
                </v-btn>
                <v-btn
                  text
                  small
                  color="error"
                  @click="onOpenDialog('notes', note.id)">
                  Удалить
                </v-btn>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <div v-else class="text-center">
          Записей нет
        </div>
      </section>
      <section class="abonements px-2 px-sm-8 py-12">
        <div class="text-subtitle-1 text-center mb-8">
          Абонементы
        </div>
        <v-expansion-panels v-if="abonements.length">
          <v-expansion-panel
            v-for="(abonement, i) in abonements"
            :key="i"
          >
            <v-expansion-panel-header>
              <div>
                <v-badge :color="abonement.info.processed ? 'success' : 'error'" dot inline left>
                  <div class="ml-2">{{ abonement.info.userName }}</div>
                </v-badge>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <p>Телефон: +7{{ abonement.info.userPhone }}</p>
              <div v-for="(item, i) in abonement.info.order" :key="i">
                <v-divider />
                <div class="py-4">
                  <p>{{ item.name }}</p>
                  <p>Кол-во: {{ item.counter }}</p>
                  <p class="mb-0">Всего: {{ item.total }}</p>
                </div>
              </div>
              <v-divider />
              <div class="buttons mt-6">
                <v-btn
                  v-if="!abonement.info.processed"
                  text
                  small
                  class="mr-4"
                  @click="onComplete('orders', abonement.id)"
                >
                  Завершить
                </v-btn>
                <v-btn
                  text
                  small
                  color="error"
                  @click="onOpenDialog('orders', abonement.id)"
                >
                  Удалить
                </v-btn>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <div v-else class="text-center">
          Абонементов нет
        </div>
      </section>
      <section class="subscribes px-2 px-sm-8 py-12">
        <div class="text-subtitle-1 text-center mb-8">
          Подписки
        </div>
        <v-expansion-panels v-if="subscribes.length">
          <v-expansion-panel
            v-for="(subscribe, i) in subscribes"
            :key="i"
          >
            <v-expansion-panel-header>
              <div>
                <v-badge :color="subscribe.info.processed ? 'success' : 'error'" dot inline left>
                  <div class="ml-2">{{ subscribe.info.userEmail }}</div>
                </v-badge>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-divider />
              <div class="buttons mt-6">
                <v-btn
                  v-if="!subscribe.info.processed"
                  text
                  small
                  class="mr-4"
                  @click="onComplete('subscribes', subscribe.id)">
                  Завершить
                </v-btn>
                <v-btn
                  text
                  small
                  color="error"
                  @click="onOpenDialog('subscribes', subscribe.id)">
                  Удалить
                </v-btn>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <div v-else class="text-center">
          Подписок нет
        </div>
      </section>
      <aside>
        <BottomSheet
          v-model="sheet"
          :success="success"
          :message="bottomSheetMessage"
          @accept="onCloseSheet"
        />
        <Dialog
          v-model="dialog"
          :title="dialogTitle"
          :text="dialogText"
          @accept="onRemove"
        />
      </aside>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapMutations } from 'vuex';
import firebase from 'firebase/compat/app';
import BottomSheet from '@/components/BottomSheet.vue';
import Dialog from '@/components/Dialog.vue';
import FirebaseService from '@/services/firebase.service';
import { RemovedItems } from '@/models'
import { removedItemMap } from '@/constants/removedItem.const';

export default Vue.extend({
  name: 'NotifyPage',
  components: {
    BottomSheet,
    Dialog,
  },
  data() {
    return {
      loader: false,
      notes: null,
      abonements: null,
      subscribes: null,
      sheet: false,
      success: false,
      bottomSheetMessage: '',
      dialog: false,
      dialogTitle: '',
      dialogText: '',
      removedItem: {
        id: '',
        name: ''
      },
    }
  },
  async beforeMount() {
    this.loader = true;
    await this.loadData();
    this.loader = false;
  },
  methods: {
    ...mapMutations({
      setFBError: 'firebase/setFBError',
    }),
    async loadData() {
      try {
        await Promise.all([this.loadNotes(), this.loadAbonements(), this.loadSubscribes()]);
      } catch(error) {
        this.setFBError(error.code)
      }
    },
    async loadNotes() {
      try {
        this.notes = await this.getData('notes');
      } catch(error) {
        this.setFBError(error.code)
      }
    },
    async loadAbonements() {
      try {
        this.abonements = await this.getData('orders');
      } catch(error) {
        this.setFBError(error.code)
      }
    },
    async loadSubscribes() {
      try {
        this.subscribes = await this.getData('subscribes');
      } catch(error) {
        this.setFBError(error.code)
      }
    },
    // Promise<null>, eslint error with Promise<FirebaseData>
    async getData(name: string): Promise<null> {
      const arr: any = [];

      try {
        const data = await FirebaseService.get(name);
        // другие методы, например "map", не работают с полученными данными
        data.forEach((el: firebase.firestore.QueryDocumentSnapshot) => {
          arr.push({
            id: el.id,
            info: el.data()
          })
        })
      } catch (error) {
        this.setFBError(error.code)
      }

      return arr;
    },
    async onComplete(name: string, id: string): Promise<void> {
      try {
        await FirebaseService.set(name, id, { processed: true }, { merge: true })
      } catch(error) {
        this.setFBError(error.code)
      }

      await this.loadData();

      this.success = true
      this.bottomSheetMessage = 'Операция успешно выполнена'
      this.sheet = true
    },
    async onRemove() {
      try {
        await FirebaseService.remove(this.removedItem)
      } catch(error) {
        this.setFBError(error.code)
      }

      await this.loadData();

      this.success = true
      this.bottomSheetMessage = 'Запись успешно удалена'
      this.sheet = true

      this.removedItem.name = '';
      this.removedItem.id = '';
      this.dialogTitle = ''
      this.dialogText = ''
      this.dialog = false
    },
    async onOpenDialog(name: RemovedItems, id: string) {
      this.removedItem.name = name;
      this.removedItem.id = id;
      this.dialogTitle = 'Подтверждение действия'
      this.dialogText = `Вы действительно хотите удалить ${removedItemMap.get(name)}?`
      this.dialog = true
    },
    onCloseSheet() {
      this.sheet = false
      this.success = false
      this.bottomSheetMessage = ''
    }
  },
})
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  height: 60vh;
  overflow: hidden;
  background: url('../../assets/thelegits.jpg') center / cover;
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
</style>
