<template>
  <footer class="black text-center pa-10">
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="4" class="text-center text-md-left">
          <img src="@/assets/masterCard.png" alt>
          <img src="@/assets/visa.png" alt>
        </v-col>
        <v-col cols="12" md="4">
          <div class="social">
            <a href="https://www.instagram.com/tnflava/" target="blank">
              <svg class="icon">
                <use xlink:href="@/assets/sprite.svg#instagram" />
              </svg>
            </a>
            <a href="https://vk.com/tnflava" target="blank">
              <svg class="icon">
                <use xlink:href="@/assets/sprite.svg#vk" />
              </svg>
            </a>
          </div>
          <p class="mt-10 mb-0">
            &copy; The Notorious Flava, {{ new Date().getFullYear() }}. Все права защищены
          </p>
        </v-col>
        <v-col cols="12" md="4" class="text-center text-md-right">
          <template v-if="success">
            <div class="pa-2">
              <svg class="icon">
                <use xlink:href="@/assets/sprite.svg#party" />
              </svg>
            </div>
            <p>
              Вы успешно подписались на новости!
            </p>
            <v-btn @click="success = false">OK</v-btn>
          </template>
          <template v-else>
            <v-form ref="form" lazy-validation>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                outlined
                dense
                hint="Подписывайтесь на наши новости, чтобы быть в курсе событий"
                persistent-hint
                label="email"
              >
                <template v-slot:append>
                  <v-icon @click="subscribe">
                    mdi-arrow-right
                  </v-icon>
                </template>
              </v-text-field>
            </v-form>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapMutations } from 'vuex';
import { AddSubscribe } from '@/models';
import FirebaseService from '@/services/firebase.service';
import { sendMessageToTelegram } from '@/services/api/telegram.service';

export default Vue.extend({
  name: 'FooterItem',
  data() {
    return {
      email: '',
      emailRules: [
        (v: string): boolean | string => !!v || 'Введите email',
        (v: string):boolean | string => /.+@.+\..+/.test(v) || 'Введите валидный email',
      ],
      success: false
    }
  },
  methods: {
    ...mapMutations({
      setFBError: 'firebase/setFBError',
    }),
    async subscribe(): Promise<void> {
      const valid = (this.$refs.form as Vue & { validate: () => boolean }).validate();

      if (valid) {
        try {
          await FirebaseService.add<AddSubscribe>('subscribes', {
            userEmail: this.email,
            processed: false,
          });
        } catch (error) {
          this.setFBError(error.code);
        }

        await sendMessageToTelegram(`
          У вас новая подписка
          %0AEmail: ${this.email}
        `)

        this.success = true;
        this.email = '';
      }
    },
  },
})
</script>

<style lang="scss" scoped>
@import '../styles/colors';

footer {
  form {
    width: 60%;
    margin-left: 40%;
    @media screen and (max-width: 960px) {
      width: 40%;
      margin-left: 50%;
      transform: translate(-50%);
    }
    @media screen and (max-width: 600px) {
      width: 80%
    }
  }
  p, a, span {
    font-size: 14px;
  }
  .social {
    a {
      margin: 5px;
    }
  }
  svg {
    fill: $light;
    width: 30px;
    height: 30px;
  }
  i {
    cursor: pointer;
  }
}
</style>

