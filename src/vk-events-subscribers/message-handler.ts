import { VkEventSubscriber } from '../vk-events-publisher/vk-events-publisher';
import { TCallbackMessageNew } from '../vk-events-publisher/vk-callback.types';
import { VkApiAdapterService } from '../vk-api-adapter/vk-api-adapter.service';
import { VK_GROUP_ID } from '../config';

export class MessageHandler implements VkEventSubscriber<TCallbackMessageNew>{
  constructor(
    private readonly vkApiAdapterService: VkApiAdapterService,
  ) {
  }

  async update(context: TCallbackMessageNew) {
    console.log('received new message')
    const rand = Math.floor(Math.random() * 50);
    // const rand = 25;
    if (rand === 5) {
      const r = await this.vkApiAdapterService.send({
        user_id: context.message.from_id,
        random_id: Date.now(),
        peer_id: context.message.peer_id,
        message: 'I AM ALIVE',
        reply_to: context.message.id,
        group_id: VK_GROUP_ID,
        payload: '',
        chat_id: context.message.peer_id - 2000000000,
      })
      console.log(r)
    }
    if (rand === 10) {
      const r = await this.vkApiAdapterService.send({
        random_id: Date.now(),
        peer_id: context.message.peer_id,
        message: 'Пососи',
        reply_to: context.message.id,
        group_id: VK_GROUP_ID,
        payload: '',
        chat_id: context.message.peer_id - 2000000000,
      })
      console.log(r)
    }
    if (rand === 20) {
      const r = await this.vkApiAdapterService.send({
        random_id: Date.now(),
        peer_id: context.message.peer_id,
        message: 'а ты гавно',
        reply_to: context.message.id,
        group_id: VK_GROUP_ID,
        payload: '',
        chat_id: context.message.peer_id - 2000000000,
      })
      console.log(r)
    }
    if (rand === 30) {
      const r = await this.vkApiAdapterService.send({
        user_id: context.message.from_id,
        random_id: Date.now(),
        peer_id: context.message.peer_id,
        message: 'не пиши сюда, от тебя гавной воняет',
        reply_to: context.message.id,
        group_id: VK_GROUP_ID,
        payload: '',
        chat_id: context.message.peer_id - 2000000000,
      })
      console.log(r)
    }
  }
}
