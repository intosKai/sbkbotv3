import { VkEventSubscriber } from '../vk-events-publisher/vk-events-publisher';
import { TCallbackMessageTypingState } from '../vk-events-publisher/vk-callback.types';
import { VkEventContext } from '../vk-events-publisher/vk-event-context';

export class TypingHandler implements VkEventSubscriber<TCallbackMessageTypingState> {
  update(context: VkEventContext, event: TCallbackMessageTypingState) {
    console.log('TCallbackMessageTypingState', event);
  }
}