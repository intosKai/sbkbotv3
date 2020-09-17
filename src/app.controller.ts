import { Body, Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { VK_CALLBACK_ANSWER } from './config';

@Controller()
export class AppController {
  constructor() {}

  @Get('vk')
  async vk(@Body() request: any): Promise<string> {
    console.log('new request', JSON.stringify(request));
    return VK_CALLBACK_ANSWER;
  }
}
