import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { Response } from 'express'
import { VK_CALLBACK_ANSWER, VK_SECRET } from './config';
import { VkCallbackRequest } from './vk-events-publisher/vk-callback.types';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(
    @Inject(AppService)
    private readonly appService: AppService,
  ) {}

  @Post('vk')
  async vk(@Body() request: VkCallbackRequest, @Res() response: Response) {
    try {
      if (request.secret !== VK_SECRET) {
        console.error(`wrong vk secret passed ${request.secret}`)
        response.status(400).end()
        return
      }

      response.statusCode = 200

      if (request.type === 'confirmation') {
        response.end(VK_CALLBACK_ANSWER)
        return
      }

      this.appService.process(request)

      response.end('ok')
    } catch (e) {
      console.error(e);
      response.status(400).end()
    }
  }
}
