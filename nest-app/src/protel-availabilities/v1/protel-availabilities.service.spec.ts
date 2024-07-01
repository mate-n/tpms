import { Test, TestingModule } from '@nestjs/testing'
import { ProtelAvailabilitiesService } from './protel-availabilities.service'

describe('ProtelAvailabilitiesService', () => {
  let service: ProtelAvailabilitiesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProtelAvailabilitiesService],
    }).compile()

    service = module.get<ProtelAvailabilitiesService>(
      ProtelAvailabilitiesService,
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
