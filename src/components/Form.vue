<template>
  <div class="d-flex justify-center w-100">
    <v-form ref="form" lazy-validation>
      <template v-if="formType === 'signIn'">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="Введите email"
          @keyup.enter="$refs.password.focus()"
        />
        <v-text-field
          v-model="password"
          ref="password"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          label="Введите пароль"
          @click:append="showPassword = !showPassword"
          @keyup.enter="submitForm"
        />
      </template>

      <template v-else>
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Ваше имя"
          @keyup.enter="$refs.phone.focus()"
        />
        <v-text-field
          v-model="phone"
          ref="phone"
          :rules="phoneRules"
          prefix="+7"
          type="tel"
          label="Телефон"
          class="mt-4"
          v-mask="phoneMask"
          single-line
          @keyup.enter="submitForm"
        />
      </template>
      <div class="buttons d-flex mt-6">
        <slot />
        <v-btn color="primary" @click="submitForm">
          {{ btnText }}
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'FormItem',
  props: {
    formType: {
      type: String,
      default: 'note'
    },
    btnText: {
      type: String,
      default: 'Отправить',
    },
  },
  data() {
    return {
      name: '',
      nameRules: [
        (v: string): boolean | string => !!v || 'Введите имя',
      ],
      phoneMask: '(###) ###-##-##',
      phone: '',
      phoneRules: [
        (v: string): boolean | string => !!v || 'Введите номер телефона',
        (v: string): boolean | string => (v && v.length > 14) || 'Введите корректный номер телефона',
      ],
      email: '',
      emailRules: [
        (v: string): boolean | string => !!v || 'Введите email',
        (v: string):boolean | string => /.+@.+\..+/.test(v) || 'Введите валидный email',
      ],
      password: '',
      passwordRules: [
        (v: string): boolean | string => !!v || 'Введите пароль',
        (v: string): boolean | string => (v && v.length >= 6) || 'Пароль должен содержать не менее 6 символов',
      ],
      showPassword: false,
    }
  },
  methods: {
    submitForm(): void {
      const valid = (this.$refs.form as Vue & { validate: () => boolean }).validate();

      if (valid) {
        if (this.formType === 'signIn') {
          this.$emit('submit', { email: this.email, password: this.password });
        } else {
          this.$emit('submit', { name: this.name, phone: this.replacePhoneNumber(this.phone) });
        }
      }
    },
    replacePhoneNumber(phone: string) {
      return phone ? phone.replace(/\D/g, '') : '';
    },
  },
})
</script>

<style lang="scss">
@import '../styles/colors';

.v-text-field__prefix {
  color: $light;
}
</style>
