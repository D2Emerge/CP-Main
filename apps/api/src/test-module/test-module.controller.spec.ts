import {Test, TestingModule} from '@nestjs/testing';
import {TestModuleController} from './test-module.controller';

describe('TestModuleController', () => {
  let controller: TestModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestModuleController],
    }).compile();

    controller = module.get<TestModuleController>(TestModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
