import { Test, TestingModule } from '@nestjs/testing'
import { ProtelRegionsController } from './protel-regions.controller'
import { ProtelRegionsService } from '../protel-regions.service'

describe('ProtelRegionsController', () => {
  let controller: ProtelRegionsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProtelRegionsController],
      providers: [ProtelRegionsService],
    }).compile()

    controller = module.get<ProtelRegionsController>(ProtelRegionsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
