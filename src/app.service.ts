import { Inject, Injectable } from '@nestjs/common';
import { VkEventsPublisher } from './vk-events-publisher/vk-events-publisher';
import { CallbackType, VkCallbackRequest } from './vk-events-publisher/vk-callback.types';
import { MessageHandler } from './vk-events-subscribers/message-handler';
import { VkApiAdapterService } from './vk-api-adapter/vk-api-adapter.service';

@Injectable()
export class AppService {
  private readonly eventPublisher: VkEventsPublisher;

  constructor(
    @Inject(VkApiAdapterService)
    private readonly vkApiAdapterService: VkApiAdapterService,
  ) {
    this.eventPublisher = new VkEventsPublisher()
    this.eventPublisher.subscribe(new MessageHandler(
      this.vkApiAdapterService,
    ), CallbackType.MESSAGE_NEW)
  }

  public process(req: VkCallbackRequest) {
    this.eventPublisher.notify(req)
  }

}
