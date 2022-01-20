<template>
  <div v-if="user">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on">
          <v-avatar color="primary" size="26">
            {{ userShortName }}
          </v-avatar>
          <v-icon right>
            mdi-chevron-down
          </v-icon>
        </v-btn>
      </template>
      <v-list flat min-width="300">
        <v-list-item-group class="py-2">
          <v-list-item>
            <v-list-item-title>{{ userName }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
        <v-divider />
        <v-list-item-group class="py-2">
          <v-list-item
            v-for="item in panelItems"
            :key="item.name"
            :disabled="item.disabled"
            :to="item.link"
          >
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
        <v-divider />
        <v-list-item-group class="py-2">
          <v-list-item @click="openDialog">
            <v-list-item-title>Выйти</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
    <Dialog
      v-model="dialog"
      :title="dialogTitle"
      :text="dialogText"
      @accept="signOut"
    />
  </div>
  <div v-else>
    <router-link to="/auth/sign-in">
      <v-btn>Войти</v-btn>
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapMutations, mapState} from 'vuex';
import { panelItems } from '@/constants/array-items.const';
import FirebaseService from '@/services/firebase.service';
import Dialog from '@/components/Dialog.vue';

export default Vue.extend({
  name: 'PanelItem',
  components: { Dialog },
  computed: mapState({
    user: (state: any) => state.firebase.user,
    userName(): string | undefined {
      return this.user?.name?.charAt(0).toUpperCase() + this.user?.name?.slice(1) || '';
    },
    userShortName(): string {
      return this.userName.length ? this.userName[0] : 'U';
    },
  }),
  data() {
    return {
      panelItems,
      dialog: false,
      dialogTitle: '',
      dialogText: '',
    }
  },
  methods: {
    ...mapMutations({
      setFBError: 'firebase/setFBError',
      clearUser: 'firebase/clearUser'
    }),
    openDialog() {
      this.dialogTitle = 'Подтверждение действия'
      this.dialogText = 'Вы действительно хотите выйти?'
      this.dialog = true
    },
    async signOut(): Promise<void> {
      try {
        await FirebaseService.signOut();
        this.clearUser()
      } catch (error) {
        this.setFBError(error.code);
      }

      this.$router.push('/')
    },
  },
})
</script>
