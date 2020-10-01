import { VkEventSubscriber } from '../vk-events-publisher/vk-events-publisher';
import { TCallbackMessageNew } from '../vk-events-publisher/vk-callback.types';

export class MessageHandler implements VkEventSubscriber<TCallbackMessageNew>{
  update(context: TCallbackMessageNew) {
    console.log(`updated with message ${JSON.stringify(context)}`)
  }
}
