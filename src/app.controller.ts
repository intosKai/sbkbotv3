import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { VK_CALLBACK_ANSWER } from './config';

@Controller()
export class AppController {
  constructor() {}

  @Post('vk')
  async vk(@Body() request: any): Promise<string> {
    console.log('new request', JSON.stringify(request));
    return VK_CALLBACK_ANSWER;
  }
}
