<script setup lang="ts">
import { DateFormatter } from '@/helpers/DateFormatter'
import { Profile } from '@/shared/classes/Profile'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import { ref, watch } from 'vue'
import EditProfile from './EditProfile.vue'
const dateFormatter = new DateFormatter()
const profileToBeEdited = ref<IProfile>(new Profile())

const props = defineProps({
  profiles: { type: Object as () => IProfile[], required: true },
  showSelectButton: { type: Boolean, default: true }
})
const changeColumnsDialog = ref(false)

const availableTableDataHeaders = ref([
  { key: 'avatar', title: '', selected: true },
  { key: 'surname', title: 'LAST NAME', selected: true },
  { key: 'name', title: 'FIRST NAME', selected: true },
  { key: 'company', title: 'COMPANY', selected: true },
  { key: 'dateofbirth', title: 'BIRTHDAY', selected: true },
  { key: 'country', title: 'COUNTRY', selected: true },
  { key: 'language', title: 'LANGUAGE', selected: false },
  { key: 'select', title: 'SELECT', selected: true },
  { key: 'menu', title: '', selected: true }
])

const editProfileDialog = ref(false)
const emit = defineEmits(['profileSelected', 'profileUpdated'])
const selectProfile = (profile: IProfile) => {
  emit('profileSelected', profile)
}

const profileUpdate = () => {
  emit('profileUpdated')
  editProfileDialog.value = false
}

const editProfile = (profile: IProfile) => {
  let newProfileToBeEdited = new Profile()
  newProfileToBeEdited = Object.assign(newProfileToBeEdited, profile)
  profileToBeEdited.value = newProfileToBeEdited
  editProfileDialog.value = true
}

watch(
  () => props.showSelectButton,
  (newInput: boolean) => {
    availableTableDataHeaders.value.find((h) => h.key === 'select')!.selected = newInput
  },
  { deep: true, immediate: true }
)
</script>

<style scoped>
.v-data-table :deep(.v-data-table__th) {
  background-color: #f8f8f8 !important;
}
</style>

<template>
  <v-container fluid v-if="profiles.length > 0" class="bg-white px-0">
    <v-data-table :headers="availableTableDataHeaders.filter((h) => h.selected)" :items="profiles">
      <template v-slot:[`header.avatar`]="{ column }">
        {{ column.title }}
        <v-icon>mdi-sort-variant </v-icon>
      </template>
      <template v-slot:[`header.menu`]="{ column }">
        {{ column.title }}
        <v-btn icon variant="text">
          <v-icon @click="changeColumnsDialog = true">mdi-cog-outline</v-icon>
        </v-btn>
      </template>
      <template v-slot:item="row">
        <tr>
          <td
            v-for="header in availableTableDataHeaders.filter((h) => h.selected)"
            :key="header.key"
          >
            <div v-if="row.item.hasOwnProperty(header.key)">
              <template v-if="header.key === 'dateofbirth' && row.item['dateofbirth']">
                {{ dateFormatter.dddotmmdotyyyy(row.item['dateofbirth']) }}
              </template>

              <template v-if="header.key !== 'dateofbirth'">
                {{ row.item[header.key as keyof IProfile] }}
              </template>
            </div>

            <div v-if="header.key === 'avatar'">
              <div class="color-avatar-tertiary-10 text-white">
                {{ row.item.name.charAt(0) }}{{ row.item.surname.charAt(0) }}
              </div>
            </div>

            <div v-if="header.key === 'select'">
              <v-btn class="primary-button" size="small" @click="selectProfile(row.item)"
                >Select</v-btn
              >
            </div>

            <div v-if="header.key === 'menu'">
              <v-btn icon variant="text">
                <v-icon @click="editProfile(row.item)">mdi-dots-vertical</v-icon>
              </v-btn>
            </div>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>

  <v-dialog v-model="editProfileDialog" fullscreen scrollable>
    <v-card>
      <EditProfile
        :profile-input="profileToBeEdited"
        @update="() => profileUpdate()"
        @close="editProfileDialog = false"
      ></EditProfile>
    </v-card>
  </v-dialog>

  <v-dialog v-model="changeColumnsDialog" max-width="500" scrollable>
    <v-card>
      <v-toolbar class="bg-white elevation-3">
        <v-toolbar-title>Columns</v-toolbar-title>
        <div class="border-s h-100 d-flex px-5 align-center" @click="changeColumnsDialog = false">
          <v-btn><v-icon>mdi-close</v-icon></v-btn>
        </div>
      </v-toolbar>
      <v-container>
        <div style="height: 3rem" v-for="header in availableTableDataHeaders" :key="header.key">
          <v-checkbox :label="header.key" v-model="header.selected"></v-checkbox>
        </div>
      </v-container>
    </v-card>
  </v-dialog>
</template>
