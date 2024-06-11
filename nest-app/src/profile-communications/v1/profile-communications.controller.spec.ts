import { Test, TestingModule } from '@nestjs/testing'
import { ProfileCommunicationsController } from './profile-communications.controller'

describe('ProfileCommunicationsController', () => {
  let controller: ProfileCommunicationsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileCommunicationsController],
    }).compile()

    controller = module.get<ProfileCommunicationsController>(
      ProfileCommunicationsController,
    )
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
