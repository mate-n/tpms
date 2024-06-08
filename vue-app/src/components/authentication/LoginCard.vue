<script setup lang="ts">
import { AuthenticationHelper } from '@/authentication/AuthenticationHelper'
import router from '@/router'
import AuthenticationService from '@/services/AuthenticationService'
import type { IAccessToken } from '@/shared/interfaces/IAccessToken'
import type { AxiosStatic } from 'axios'
import { inject, ref } from 'vue'
const authenticationHelper = new AuthenticationHelper()
const axios: AxiosStatic | undefined = inject('axios')
const authentificationService = new AuthenticationService(axios)
const clickOnLogin = async () => {
  authentificationService.login(login.value, password.value).then((response: IAccessToken) => {
    authenticationHelper.setAccessToken(response.access_token)
    if (axios) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.access_token}`
      router.push('/')
    }
  })
}

const login = ref('')
const password = ref('')
</script>
<template>
  <v-card>
    <v-card-text>
      <v-text-field label="Login" v-model="login" variant="underlined"></v-text-field>
      <v-text-field
        label="Password"
        v-model="password"
        variant="underlined"
        type="Password"
      ></v-text-field>
      <v-btn @click="clickOnLogin()">Login</v-btn>
    </v-card-text>
  </v-card>
</template>
