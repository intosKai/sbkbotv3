import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should ---', async () => {
      const r = await appController.vk({
        event_id: '', group_id: 0, object: undefined, secret: '', type: ''
      }, undefined)
      console.log(r)
    })
  });
});
