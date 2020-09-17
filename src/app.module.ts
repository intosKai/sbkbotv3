import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VkApiAdapterService } from './vk-api-adapter/vk-api-adapter.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, VkApiAdapterService],
})
export class AppModule {}
