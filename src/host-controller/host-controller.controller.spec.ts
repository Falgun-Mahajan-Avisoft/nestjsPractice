import { Test, TestingModule } from '@nestjs/testing';
import { HostControllerController } from './host-controller.controller';

describe('HostControllerController', () => {
  let controller: HostControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HostControllerController],
    }).compile();

    controller = module.get<HostControllerController>(HostControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
