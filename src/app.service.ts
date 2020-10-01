import { Injectable } from '@nestjs/common';
import { VkEventsPublisher } from './vk-events-publisher/vk-events-publisher';
import { CallbackType, VkCallbackRequest } from './vk-events-publisher/vk-callback.types';
import { MessageHandler } from './vk-events-subscribers/message-handler';

@Injectable()
export class AppService {
  private readonly eventPublisher: VkEventsPublisher;

  constructor() {
    this.eventPublisher = new VkEventsPublisher()
    this.eventPublisher.subscribe(new MessageHandler(), CallbackType.MESSAGE_NEW)
  }

  public process(req: VkCallbackRequest) {
    this.eventPublisher.notify(req)
  }

}
