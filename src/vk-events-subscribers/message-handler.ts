import { VkEventSubscriber } from '../vk-events-publisher/vk-events-publisher';
import { TCallbackMessageNew } from '../vk-events-publisher/vk-callback.types';
import { VkEventContext } from '../vk-events-publisher/vk-event-context';

export class MessageHandler implements VkEventSubscriber<TCallbackMessageNew>{
  constructor(
  ) {
  }

  async update(context: VkEventContext, event: TCallbackMessageNew) {
    const rand = Math.floor(Math.random() * 50);
    // const rand = 25;
    if (rand === 5) {
      const r = await context.reply('I AM ALIVE', event, true);
      console.log(r)
    } else if (rand === 10) {
      const r = await context.reply('пососи', event, true);
      console.log(r)
    } else if (rand === 20) {
      const r = await context.reply('я король а ты гавно', event, true);
      console.log(r)
    } else if (rand === 30) {
      const r = await context.reply('не пиши сюда, от тебя гавной воняет', event, true);
      console.log(r)
    }
  }
}
