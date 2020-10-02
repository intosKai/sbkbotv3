import { Inject, Injectable } from '@nestjs/common';
import { VkEventsPublisher } from './vk-events-publisher/vk-events-publisher';
import { CallbackType, VkCallbackRequest } from './vk-events-publisher/vk-callback.types';
import { MessageHandler } from './vk-events-subscribers/message-handler';
import { VkApiAdapterService } from './vk-api-adapter/vk-api-adapter.service';
import { TypingHandler } from './vk-events-subscribers/typing-handler';
import { DvachApi } from './apis/dvach';

@Injectable()
export class AppService {
  private readonly eventPublisher: VkEventsPublisher;

  constructor(
    @Inject(VkApiAdapterService)
    private readonly vkApiAdapterService: VkApiAdapterService,
  ) {
    this.eventPublisher = new VkEventsPublisher(vkApiAdapterService)
    this.eventPublisher.subscribe(new MessageHandler(new DvachApi()), CallbackType.MESSAGE_NEW)
    this.eventPublisher.subscribe(new TypingHandler(), CallbackType.MESSAGE_TYPING_STATE)
  }

  public process(req: VkCallbackRequest) {
    this.eventPublisher.notify(req)
  }

}
