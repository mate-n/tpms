import { Test, TestingModule } from '@nestjs/testing'
import { StationeriesController } from './stationeries.controller'
import { StationeriesService } from './stationeries.service'

describe('StationeriesController', () => {
  let controller: StationeriesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StationeriesController],
      providers: [StationeriesService],
    }).compile()

    controller = module.get<StationeriesController>(StationeriesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
