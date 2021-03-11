import { Inject, Injectable } from '@nestjs/common';
import { VkEventsPublisher } from './vk-events-publisher/vk-events-publisher';
import { CallbackType, VkCallbackRequest } from './vk-events-publisher/vk-callback.types';
import { MessageHandler } from './vk-events-subscribers/message-handler';
import { VkApiAdapterService } from './vk-api-adapter/vk-api-adapter.service';
import { TypingHandler } from './vk-events-subscribers/typing-handler';
import { DvachApi } from './apis/dvach';
import { ImgflipApi } from './apis/imgflip';
import { IMGFLIP_PASSWORD, IMGFLIP_USERNAME, VK_API_TOKEN } from './config';
import { ConsoleLogger, VKApi } from 'node-vk-sdk';

@Injectable()
export class AppService {
  private readonly eventPublisher: VkEventsPublisher;

  constructor(
    @Inject(VkApiAdapterService)
    private readonly vkApiAdapterService: VkApiAdapterService,
  ) {
    const vkApi = new VKApi({
      logger: new ConsoleLogger(),
      token: VK_API_TOKEN,
    });

    this.eventPublisher = new VkEventsPublisher(vkApiAdapterService);
    this.eventPublisher.subscribe(
      new MessageHandler(
        new DvachApi(),
        new ImgflipApi(IMGFLIP_USERNAME, IMGFLIP_PASSWORD),
        vkApi
      ),
      CallbackType.MESSAGE_NEW,
    );
    this.eventPublisher.subscribe(new TypingHandler(), CallbackType.MESSAGE_TYPING_STATE);
  }

  public process(req: VkCallbackRequest) {
    this.eventPublisher.notify(req);
  }

}
