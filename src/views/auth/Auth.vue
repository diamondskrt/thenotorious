<template>
  <default-layout>
    <Form formType="signIn" btnText="Войти" @submit="signIn" />
    <aside>
      <BottomSheet
        v-model="sheet"
        :success="success"
        :message="bottomSheetMessage"
        @accept="onCloseSheet"
      />
    </aside>
  </default-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import Form from '@/components/Form.vue'
import BottomSheet from '@/components/BottomSheet.vue';
import { fbErrorMessageMap } from '@/constants/fb-error.const';
import { AddUser } from '@/models';
import FirebaseService from '@/services/firebase.service';

export default Vue.extend({
  name: 'AuthPage',
  components: {
    DefaultLayout,
    Form,
    BottomSheet,
  },
  data() {
    return {
      sheet: false,
      success: false,
      bottomSheetMessage: '',
    }
  },
  computed: {
    ...mapState({
      fbError: (state: any) => state.firebase.fbError
    }),
  },
  watch: {
    fbError: {
      handler: function(error) {
        if (error) {
          this.sheet = true
          const message = fbErrorMessageMap.get(error)
          message
            ? this.bottomSheetMessage = message
            : this.bottomSheetMessage = 'Произошла неизвестная ошибка'
        }
      },
      deep: true,
    },
  },
  methods: {
    ...mapMutations({
      setFBError: 'firebase/setFBError',
      clearFBError: 'firebase/clearFBError',
      setUser: 'firebase/setUser',
    }),
    async signIn(user: AddUser) {
      try {
        const data = await FirebaseService.signIn(user?.email, user?.password);

        if (data.user) {
          const user = await FirebaseService.get('users', data?.user?.uid);

          this.setUser({
            name: user?.data().name,
            role: user?.data().role
          });

          this.$router.push('/');
        }
      } catch (error) {
        this.setFBError(error?.code);
      }
    },
    onCloseSheet() {
      this.sheet = false
      this.success = false
      this.bottomSheetMessage = ''
      if (this.fbError) {
        this.clearFBError()
      }
    },
  },
});
</script>
