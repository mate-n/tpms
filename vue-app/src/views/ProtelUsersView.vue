<script setup lang="ts">
import { ProtelUserService } from '@/services/backend-middleware/ProtelUserService'
import { ProtelUser } from '@/shared/classes/ProtelUser'
import type { IProtelUser } from '@/shared/interfaces/IProtelUser'
import type { AxiosStatic } from 'axios'
import { inject, onMounted, ref, type Ref } from 'vue'

const axios2: AxiosStatic | undefined = inject('axios2')
const protelUserService = new ProtelUserService(axios2)
const protelUsers: Ref<IProtelUser[]> = ref([])

const protelUsersTextArea = ref('')

const wipeAndCreateMany = () => {
  const lines = protelUsersTextArea.value.split(/\n/)
  const newProtelUsers: IProtelUser[] = []

  for (const line of lines) {
    const [email, allowedCampIDs] = line.split(/\t/)
    const newProtelUser = new ProtelUser()
    newProtelUser.email = email.trim()
    newProtelUser.allowedCampIDs = allowedCampIDs
    newProtelUsers.push(newProtelUser)
  }

  protelUserService.wipeAndCreateMany(newProtelUsers).then((users) => {
    protelUsers.value = users
  })
}

onMounted(() => {
  protelUserService.findAll().then((users) => {
    protelUsers.value = users
  })
})
</script>
<template>
  <v-container>
    <v-card title="Protel Users" style="margin-bottom: 2rem">
      <v-card-text>
        <div v-for="protelUser of protelUsers" :key="protelUser.id">
          <v-row>
            <v-col>{{ protelUser.email }}:</v-col>
            <v-col> {{ protelUser.allowedCampIDs }} </v-col>
          </v-row>
        </div>
      </v-card-text></v-card
    >
    <v-textarea label="Protel Users Text Area" v-model="protelUsersTextArea"></v-textarea>
    <v-btn @click="wipeAndCreateMany()">Replace Users</v-btn>
  </v-container>
</template>
