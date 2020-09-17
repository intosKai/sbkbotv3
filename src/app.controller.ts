import { Body, Controller, Get, Headers, Inject, Post, Res } from '@nestjs/common';
import { Response } from 'express'
import { VK_CALLBACK_ANSWER } from './config';

@Controller()
export class AppController {
  constructor() {}

  @Post('vk')
  async vk(@Body() request: any, @Res() response: Response) {
    console.log('new request', JSON.stringify(request));
    // response.removeHeader('X-Powered-By')
    // response.removeHeader('Date')
    // response.removeHeader('Connection')
    // response.removeHeader('Content-Length')
    // response.removeHeader('HTTP/1.1')
    // response.removeHeader('Content-Type')
    // response.removeHeader('ETag')
    // response.removeHeader('Transfer-Encoding')
    return response.writeHead(200, VK_CALLBACK_ANSWER).end()
  }
}
