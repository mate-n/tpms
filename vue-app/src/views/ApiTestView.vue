<script setup lang="ts">
import { ProfileAddressFaker } from '@/faker/ProfileAddressFaker'
import { ProfileCommunicationFaker } from '@/faker/ProfileCommunicationFaker'
import { ProfileDocumentFaker } from '@/faker/ProfileDocumentFaker'
import { ProfilesFaker } from '@/faker/ProfilesFaker'
import { PropertyAvailabilityFaker } from '@/faker/PropertyAvailabilityFaker'
import { RoomTypeFaker } from '@/faker/RoomTypeFaker'

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

const profileDocumentFaker = new ProfileDocumentFaker()
const profileDocumentFake1 = profileDocumentFaker.create()
const profileDocumentFake2 = profileDocumentFaker.create()
const profileDocumentFake3 = profileDocumentFaker.create()
console.log(profileDocumentFake1)
console.log([profileDocumentFake1, profileDocumentFake2, profileDocumentFake3])

const propertyAvailabilityFaker = new PropertyAvailabilityFaker()
const propertyAvailabilityFake1 = propertyAvailabilityFaker.create()
const propertyAvailabilityFake2 = propertyAvailabilityFaker.create()
const propertyAvailabilityFake3 = propertyAvailabilityFaker.create()
console.log(propertyAvailabilityFake1)
console.log([propertyAvailabilityFake1, propertyAvailabilityFake2, propertyAvailabilityFake3])

const roomTypeFaker = new RoomTypeFaker()
const roomTypeFake1 = roomTypeFaker.create()
const roomTypeFake2 = roomTypeFaker.create()
const roomTypeFake3 = roomTypeFaker.create()
const roomTypeFake4 = roomTypeFaker.create()
console.log(roomTypeFake1)
console.log([roomTypeFake1, roomTypeFake2, roomTypeFake3, roomTypeFake4])
</script>
