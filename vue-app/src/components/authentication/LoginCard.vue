<script setup lang="ts">
import { AuthenticationHelper } from '@/authentication/AuthenticationHelper'
import router from '@/router'
import AuthenticationService from '@/services/AuthenticationService'
import type { IAccessToken } from '@/shared/interfaces/IAccessToken'
import type { AxiosStatic } from 'axios'
import { inject, ref } from 'vue'
const authenticationHelper = new AuthenticationHelper()
const axios2: AxiosStatic | undefined = inject('axios2')
const authentificationService = new AuthenticationService(axios2)
const clickOnLogin = async () => {
  authentificationService.login(login.value, password.value).then((response: IAccessToken) => {
    console.log('response ' + response)
    console.log('response.jwt ' + response.jwt)
    authenticationHelper.setAccessToken(response.jwt)
    if (axios2) {
      axios2.defaults.headers.common['Authorization'] = `Bearer ${response.jwt}`
      router.push('/')
    }
  })
}

const login = ref('')
const password = ref('')
</script>
<template>
  <v-card data-cy="login_card">
    <v-card-text>
      <v-text-field
        label="Login"
        v-model="login"
        variant="underlined"
        data-cy="username_field"
      ></v-text-field>
      <v-text-field
        label="Password"
        v-model="password"
        variant="underlined"
        type="Password"
        data-cy="password_field"
      ></v-text-field>
      <v-btn @click="clickOnLogin()" data-cy="login_button">Login</v-btn>
    </v-card-text>
  </v-card>
</template>
