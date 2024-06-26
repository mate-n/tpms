<script setup lang="ts">
import { AvailabilityGroupHelper } from '@/helpers/AvailabilityGroupHelper'
import { DateFormatter } from '@/helpers/DateFormatter'
import { PriceFormatter } from '@/helpers/PriceFormatter'
import { RatesHelper } from '@/helpers/RatesHelper'
import { GuestsPerRoom } from '@/shared/classes/GuestsPerRoom'
import type { IProtelAvailabilityGroup } from '@/shared/interfaces/protel/IProtelAvailabilityGroup'
import { computed, onBeforeMount } from 'vue'
const priceFormatter = new PriceFormatter()
const emit = defineEmits(['remove'])
const dateFormatter = new DateFormatter()
const ratesHelper = new RatesHelper()
const availabilityGroupHelper = new AvailabilityGroupHelper()
const props = defineProps({
  availabilityGroup: { type: Object as () => IProtelAvailabilityGroup, required: true },
  guestsPerRoom: { type: Object as () => GuestsPerRoom, required: true }
})
onBeforeMount(() => {
  availabilityGroupHelper.sortByDate(props.availabilityGroup)
})

const arrivalDate = computed(() => {
  return availabilityGroupHelper.getArrivalDate(props.availabilityGroup)
})

const departureDate = computed(() => {
  return availabilityGroupHelper.getDepartureDate(props.availabilityGroup)
})
</script>

<template>
  <v-card min-width="350" class="mb-2">
    <v-card-text class="pt-0 px-2">
      <div class="d-flex justify-end">
        <v-btn variant="text" size="x-small" icon @click="emit('remove')"
          ><v-icon size="medium">mdi-close</v-icon></v-btn
        >
      </div>
      <div class="mb-1">
        <v-icon>mdi-chevron-double-right</v-icon
        ><strong>{{ availabilityGroup.availabilities[0].property_name }}</strong>
      </div>
      <v-row class="pb-0">
        <v-col class="text-gray"> {{ availabilityGroup.roomTypeCode }} </v-col>
        <v-col class="d-flex justify-end"
          ><v-icon>mdi-arrow-right </v-icon>{{ dateFormatter.dddotmmdotyyyy(arrivalDate) }}
        </v-col>
      </v-row>
      <v-row class="mt-0 pb-0">
        <v-col class="text-gray">Base Rate | Low Season</v-col>
        <v-col class="d-flex justify-end"
          ><v-icon>mdi-arrow-left </v-icon>{{ dateFormatter.dddotmmdotyyyy(departureDate) }}
        </v-col>
      </v-row>
      <v-divider class="mt-1"></v-divider>
      <v-row class="mt-0 pb-0">
        <v-col></v-col>
        <v-col class="">
          <div class="mb-1 text-end" v-if="availabilityGroup">
            {{ availabilityGroup.availabilities.length }} x
            {{
              priceFormatter.formatPrice(
                ratesHelper.calculateActualRate(
                  availabilityGroup.availabilities[0].rates_data[0],
                  guestsPerRoom
                )
              )
            }}
          </div>
          <v-divider></v-divider>
          <div class="text-end mt-1">
            Total:
            <strong
              >{{
                priceFormatter.formatPrice(
                  availabilityGroupHelper.calculateTotalRate(availabilityGroup, guestsPerRoom)
                )
              }}
            </strong>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
