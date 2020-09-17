import { Body, Controller, Headers, Post, Res } from '@nestjs/common';
import { Response } from 'express'
import { VK_CALLBACK_ANSWER, VK_SECRET } from './config';

type VkCallbackRequest = {
  type: string;
  group_id: number;
  secret: string;
}

@Controller()
export class AppController {
  constructor() {}

  @Post('vk')
  async vk(@Body() request: VkCallbackRequest, @Res() response: Response) {
    console.log('new request', JSON.stringify(request));

    if (request.secret !== VK_SECRET) {
      response.status(400).end()
    }

    response.statusCode = 200

    if (request.type === 'confirmation') {
      response.end(VK_CALLBACK_ANSWER)
    }

    response.end('ok')
  }
}
