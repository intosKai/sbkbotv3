import { Test, TestingModule } from '@nestjs/testing';
import { VkApiAdapterService } from './vk-api-adapter.service';

describe('VkApiAdapterService', () => {
  let service: VkApiAdapterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VkApiAdapterService],
    }).compile();

    service = module.get<VkApiAdapterService>(VkApiAdapterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
