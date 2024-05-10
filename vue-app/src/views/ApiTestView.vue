<script setup lang="ts">
import { ProfileAddressFaker } from '@/shared/faker/ProfileAddressFaker'
import { ProfileCommunicationFaker } from '@/shared/faker/ProfileCommunicationFaker'
import { ProfilesFaker } from '@/shared/faker/ProfilesFaker'
import { PropertyAvailabilityFaker } from '@/shared/faker/PropertyAvailabilityFaker'
import { RoomFaker } from '@/shared/faker/RoomFaker'

const profileFaker = new ProfilesFaker()
const profileFake1 = profileFaker.create()
const profileFake2 = profileFaker.create()
const profileFake3 = profileFaker.create()
console.log(profileFake1)
console.log([profileFake1, profileFake2, profileFake3])

const profileAddressFaker = new ProfileAddressFaker()
const profileAddressFake1 = profileAddressFaker.create()
const profileAddressFake2 = profileAddressFaker.create()
const profileAddressFake3 = profileAddressFaker.create()
console.log(profileAddressFake1)
console.log([profileAddressFake1, profileAddressFake2, profileAddressFake3])

const profileCommunicationFaker = new ProfileCommunicationFaker()
const profileCommunicationFake1 = profileCommunicationFaker.create()
const profileCommunicationFake2 = profileCommunicationFaker.create()
const profileCommunicationFake3 = profileCommunicationFaker.create()
console.log(profileCommunicationFake1)
console.log([profileCommunicationFake1, profileCommunicationFake2, profileCommunicationFake3])

const propertyAvailabilityFaker = new PropertyAvailabilityFaker()
const propertyAvailabilityFake1 = propertyAvailabilityFaker.create()
const propertyAvailabilityFake2 = propertyAvailabilityFaker.create()
const propertyAvailabilityFake3 = propertyAvailabilityFaker.create()
console.log(propertyAvailabilityFake1)
console.log([propertyAvailabilityFake1, propertyAvailabilityFake2, propertyAvailabilityFake3])

const roomFaker = new RoomFaker()
const roomFake1 = roomFaker.create()
const roomFake2 = roomFaker.create()
const roomFake3 = roomFaker.create()
const roomFake4 = roomFaker.create()
console.log(roomFake1)
console.log([roomFake1, roomFake2, roomFake3, roomFake4])
</script>
