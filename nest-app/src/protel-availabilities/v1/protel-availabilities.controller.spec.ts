import { Test, TestingModule } from '@nestjs/testing'
import { ProtelAvailabilitiesController } from '../v1/protel-availabilities.controller'
import { ProtelAvailabilitiesService } from '../v1/protel-availabilities.service'

describe('ProtelAvailabilitiesController', () => {
  let controller: ProtelAvailabilitiesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProtelAvailabilitiesController],
      providers: [ProtelAvailabilitiesService],
    }).compile()

    controller = module.get<ProtelAvailabilitiesController>(
      ProtelAvailabilitiesController,
    )
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
