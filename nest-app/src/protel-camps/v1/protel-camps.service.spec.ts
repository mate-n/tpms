import { Test, TestingModule } from '@nestjs/testing'
import { ProtelCampsService } from './protel-camps.service'

describe('ProtelCampsService', () => {
  let service: ProtelCampsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProtelCampsService],
    }).compile()

    service = module.get<ProtelCampsService>(ProtelCampsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
