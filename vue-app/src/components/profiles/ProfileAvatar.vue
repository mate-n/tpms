<script setup lang="ts">
import { CrudOperations } from '@/enums/CrudOperations'
import { ProfileTypes } from '@/enums/ProfileTypes'
import { EnumHelper } from '@/helpers/enumHelper'
import type { IProfile } from '@/interfaces/profiles/IProfile'
defineProps({
  crudOperation: { type: Number, required: true }
})
const enumHelper = new EnumHelper()
const profileToBeEdited = defineModel({ required: true, type: Object as () => IProfile })
const profileTypes: string[] = enumHelper.getEnumValues(ProfileTypes)
</script>

<template>
  <div class="my-2">
    <template v-if="crudOperation === CrudOperations.Update">
      <div class="d-flex justify-start" v-if="!profileToBeEdited.isPasserby">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-icon v-bind="props" class="ms-2">mdi-dots-vertical</v-icon>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title @click="profileToBeEdited.isPasserby = true">
                Set as passerby profile</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </template>

    <div class="d-flex justify-center">
      <div>
        <div class="bg-lightgray px-2 py-1 ma-1 text-uppercase" v-if="profileToBeEdited.isPasserby">
          <span class="text-primary"><v-icon>mdi-walk</v-icon></span>
          Passerby
        </div>

        <div class="d-flex justify-center">
          <div>
            <div class="color-avatar-tertiary text-white">
              {{ profileToBeEdited.firstName.charAt(0) }}{{ profileToBeEdited.lastName.charAt(0) }}
            </div>
          </div>
        </div>
        <div class="text-center">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn class="text-center mt-3 px-2" v-bind="props">
                {{ profileToBeEdited.profileType }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in profileTypes" :key="index" :value="index">
                <!-- prettier-ignore -->
                <v-list-item-title @click="profileToBeEdited.profileType = item">{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </div>
  </div>
</template>
