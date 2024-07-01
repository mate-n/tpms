import { Test, TestingModule } from '@nestjs/testing'
import { ProtelProfilesService } from './protel-profiles.service'

describe('ProtelProfilesService', () => {
  let service: ProtelProfilesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProtelProfilesService],
    }).compile()

    service = module.get<ProtelProfilesService>(ProtelProfilesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
