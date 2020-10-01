import { VkEventSubscriber } from '../vk-events-publisher/vk-events-publisher';
import { TCallbackWallPostNewEvent } from '../vk-events-publisher/vk-callback.types';
import { VkEventContext } from '../vk-events-publisher/vk-event-context';

export class NewpostHandler implements VkEventSubscriber<TCallbackWallPostNewEvent> {
  update(context: VkEventContext, event: TCallbackWallPostNewEvent) {
    console.log('TCallbackWallPostNewEvent', event)
  }
}