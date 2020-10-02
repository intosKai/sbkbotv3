import { CallbackType, TCallbackMessageNew, TCallbacks } from './vk-callback.types';
import { VkApiAdapterService } from '../vk-api-adapter/vk-api-adapter.service';

export class VkEventContext {
  constructor(
    private readonly group_id: number,
    private readonly event_id: string,
    private readonly type: CallbackType,
    private readonly vkApiAdapterService: VkApiAdapterService,
  ) {
  }

  public async reply(
    message: string,
    event: TCallbackMessageNew,
    replyTo: boolean = false,
    params?: {
      payload: string,
      random_id: number,
    }): Promise<any> {

    return this.vkApiAdapterService.send({
      message,
      random_id: Date.now(),
      peer_id: event.message.peer_id,
      user_ids: event.message.peer_id ? undefined : event.message.from_id.toString(),
      reply_to: replyTo ? event.message.id || undefined : undefined,
      group_id: this.group_id.toString(),
      ...params,
    });
  }

  get groupId(): number {
    return this.group_id;
  }
}